"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 100, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

export function ImageZoom({ children, className }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`overflow-hidden rounded-2xl ${className ?? ""}`}>
      <motion.div
        whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
