"use client";
import React, { useEffect, useState } from "react";
import styles from "./GradientTextAnimation.module.css";

interface GradientTextAnimationProps {
  children: React.ReactNode;
  delay?: number;
  trigger?: boolean;
  className?: string;
}

export default function GradientTextAnimation({
  children,
  delay = 0,
  trigger = false,
  className = "",
}: GradientTextAnimationProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        setIsActive(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [trigger, delay]);

  return (
    <span
      className={`${styles.gradientText} ${isActive ? styles.active : ""} ${className}`}
    >
      {children}
    </span>
  );
}