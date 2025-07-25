"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./ArchTextAnimationTest.module.css";

const text = "Products";

export default function ArchTextAnimationTest() {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(false);
            setTimeout(() => {
              setIsActive(true);
            }, 100);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={styles.scrollContent}>
        <h1>スクロールして下の文字を見てください</h1>
        <p>下にスクロールするとアニメーションが発火します...</p>
      </div>
      <div className={styles.container} ref={containerRef}>
        <h2
          className={`${styles.archTextTitle} ${styles.title} ${isActive ? styles.active : ""}`}
          aria-label={text}
        >
          {text.split("").map((char, i) => (
            <span
              className={`${styles.char} ${styles[`char${i + 1}`]}`}
              aria-hidden="true"
              key={i}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>
      <div className={styles.bottomSpace}></div>
    </>
  );
}
