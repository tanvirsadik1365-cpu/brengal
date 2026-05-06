import { NextResponse } from "next/server";
import { getPublicStoreStatus } from "@/lib/store-status";

export const runtime = "nodejs";

export async function GET() {
  const storeStatus = await getPublicStoreStatus();

  return NextResponse.json({ storeStatus });
}
