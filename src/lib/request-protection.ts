import { NextResponse, type NextRequest } from "next/server";
import { restaurant } from "@/lib/restaurant";

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitBuckets = new Map<string, RateLimitBucket>();
let lastRateLimitPruneAt = 0;
const spamTrapFields = [
  "company",
  "companyUrl",
  "homepage",
  "nickname",
  "url",
  "website",
  "_gotcha",
];

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function normaliseOrigin(value: string) {
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}

function getAllowedOrigins(request: NextRequest) {
  const configuredOrigins = [
    request.nextUrl.origin,
    process.env.NEXT_PUBLIC_SITE_URL,
    restaurant.siteUrl,
  ]
    .filter(Boolean)
    .map((value) => normaliseOrigin(value as string))
    .filter(Boolean);

  if (process.env.NODE_ENV !== "production") {
    configuredOrigins.push("http://localhost:3000", "http://127.0.0.1:3000");
  }

  return new Set(configuredOrigins);
}

export function jsonResponse(body: unknown, status = 200) {
  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "no-store",
    },
    status,
  });
}

export function rejectDisallowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return null;
  }

  if (!getAllowedOrigins(request).has(normaliseOrigin(origin))) {
    return jsonResponse({ error: "Request origin is not allowed." }, 403);
  }

  return null;
}

export function rateLimitRequest(
  request: NextRequest,
  { key, limit, windowMs }: RateLimitOptions,
) {
  const now = Date.now();

  if (now - lastRateLimitPruneAt > 60_000) {
    lastRateLimitPruneAt = now;

    for (const [bucketKey, bucket] of rateLimitBuckets) {
      if (bucket.resetAt <= now) {
        rateLimitBuckets.delete(bucketKey);
      }
    }
  }

  const bucketKey = `${key}:${getClientIp(request)}`;
  const currentBucket = rateLimitBuckets.get(bucketKey);

  if (!currentBucket || currentBucket.resetAt <= now) {
    rateLimitBuckets.set(bucketKey, {
      count: 1,
      resetAt: now + windowMs,
    });
    return null;
  }

  currentBucket.count += 1;

  if (currentBucket.count <= limit) {
    return null;
  }

  return NextResponse.json(
    { error: "Too many requests. Please wait a few minutes and try again." },
    {
      headers: {
        "Cache-Control": "no-store",
        "Retry-After": Math.ceil((currentBucket.resetAt - now) / 1000).toString(),
      },
      status: 429,
    },
  );
}

export function rejectSpamSubmission(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;
  const hasFilledTrap = spamTrapFields.some((field) => {
    const fieldValue = record[field];

    return typeof fieldValue === "string" && fieldValue.trim().length > 0;
  });

  return hasFilledTrap
    ? jsonResponse({ error: "Request could not be accepted." }, 400)
    : null;
}
