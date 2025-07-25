"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./DiiLoTextAnimation.module.css";

interface DiiLoTextAnimationProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function DiiLoTextAnimation({
  text,
  className = "",
  style = {},
  delay = 0,
}: DiiLoTextAnimationProps) {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("DiiLoTextAnimation mounted, delay:", delay);
    const timer = setTimeout(() => {
      console.log("DiiLoTextAnimation activated");
      setIsActive(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);


  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={style}
    >
{text.split("").map((char, i) => (
        <span
          className={`${styles.textTitle} ${styles[`char${i + 1}`] || ""} ${isActive ? styles.active : ""}`}
          aria-hidden="true"
          key={i}
          style={{
            display: char === " " ? "inline" : "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}