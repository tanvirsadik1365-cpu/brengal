"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Phone, ShoppingBag } from "lucide-react";

type MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionReveal({
  children,
  className = "",
  delay = 0,
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({ children, className = "" }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.11,
            delayChildren: 0.08,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className = "" }: MotionProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className: string;
  ariaLabel?: string;
};

export function MagneticLink({
  href,
  children,
  className,
  ariaLabel,
}: MagneticLinkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 190, damping: 18, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 190, damping: 18, mass: 0.45 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
  }

  function resetPosition() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      onBlur={resetPosition}
      whileTap={{ scale: 0.985 }}
      className="inline-flex"
    >
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    </motion.div>
  );
}

export function MobileStickyCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 420);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.nav
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Quick ordering actions"
          className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/12 bg-[#0E0B09]/92 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-16px_40px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:hidden"
        >
          <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] gap-2">
            <Link
              href="/menu"
              className="inline-flex h-[52px] min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#D7A542] px-5 text-sm font-black text-[#140C08] shadow-[0_12px_30px_rgba(215,165,66,0.26)]"
            >
              <ShoppingBag size={18} aria-hidden="true" />
              Order online
            </Link>
            <a
              href="tel:+441865554905"
              aria-label="Call Jamal's"
              className="inline-flex h-[52px] min-h-[52px] w-14 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white"
            >
              <Phone size={18} aria-hidden="true" />
            </a>
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
