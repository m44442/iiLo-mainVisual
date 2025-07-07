"use client";

import React, { useState, useEffect } from "react";
// import styles from './IiLoCorporateSite.module.css'; // Replaced with Tailwind classes

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ParticleSystemの完了後に開始
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2200); // 2.2秒後に開始

    return () => clearTimeout(timer);
  }, []);

  // スクロール制御
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    // スクロールイベント自体をブロック
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });

    // ヒーローアニメーション完了後にスクロール許可
    const scrollTimer = setTimeout(() => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";

      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    }, 2900); // 3秒（テキスト表示） + 1秒（アニメーション完了）のマージン

    return () => {
      clearTimeout(scrollTimer);
      // クリーンアップで確実に復元
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";

      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  return (
    <section className="relative h-screen w-full bg-transparent">
      <div className="absolute top-[40vh] left-[288px] px-6 lg:left-[200px] md:left-[100px] max-md:bottom-[220px] max-md:top-auto max-md:left-[23px] max-md:px-0">
        <p className="tw text-[32px] font-[550] leading-[1.8] max-w-[400px] lg:text-[32px] md:text-[28px] max-md:text-[23px] max-md:font-semibold max-md:leading-[30px]">
          <span
            className={`tw inline-block transition-opacity duration-[600ms] ease-in-out ${isVisible ? "opacity-100 delay-[200ms]" : "opacity-0"}`}
          >
            あなたの現場に、
          </span>
          <br />
          <span
            className={`tw inline-block transition-opacity duration-[600ms] ease-in-out ${isVisible ? "opacity-100 delay-[400ms]" : "opacity-0"}`}
          >
            もうひとつの頭脳を。
          </span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
