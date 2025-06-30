"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
  textColor?: "white" | "black";
  animationType?: "scroll" | "once";
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  children,
  className = "",
  textColor = "black",
  animationType = "once",
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!titleRef.current) return;

    if (animationType === "once") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated && !isAnimating) {
              setHasAnimated(true);
              setIsAnimating(true);
              
              // 0から120%まで0.5秒でアニメーション（3倍速 + 通り過ぎる）
              let progress = 0;
              const duration = 500; // 0.5秒（3倍速）
              const startTime = Date.now();
              
              const animate = () => {
                const elapsed = Date.now() - startTime;
                progress = Math.min(elapsed / duration, 1.2); // 120%まで（通り過ぎる）
                setScrollProgress(progress);
                
                if (progress < 1.2) {
                  requestAnimationFrame(animate);
                } else {
                  setIsAnimating(false);
                }
              };
              
              requestAnimationFrame(animate);
            }
          });
        },
        {
          threshold: 0.5,
        }
      );

      observer.observe(titleRef.current);

      return () => {
        if (titleRef.current) {
          observer.unobserve(titleRef.current);
        }
      };
    } else {
      // scrollベースの処理（既存のコード）
      const handleScroll = () => {
        if (!titleRef.current) return;

        const element = titleRef.current;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          const distance = Math.abs(elementCenter - viewportCenter);
          const maxDistance = windowHeight / 2 + rect.height / 2;
          
          const progress = Math.max(0, Math.min(1, 1 - distance / maxDistance));
          setScrollProgress(progress);
        } else {
          setScrollProgress(0);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [animationType, hasAnimated, isAnimating]);

  // 手動トリガー用の関数（テスト用）
  const triggerAnimation = () => {
    if (hasAnimated || isAnimating) return;
    
    setIsAnimating(true);
    let progress = 0;
    const duration = 500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(elapsed / duration, 1.2);
      setScrollProgress(progress);
      
      if (progress < 1.2) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const baseColor = textColor === "white" ? "#ffffff" : "#000000";
  const waveColor = textColor === "white" ? "#000000" : "#ffffff";

  // スクロール進行度に基づいてグラデーション位置を計算
  const gradientPosition = scrollProgress * 100;

  return (
    <div className="relative inline-block">
      {/* ベースのテキスト */}
      <h2
        ref={titleRef}
        className={`${className} relative`}
        style={{
          color: baseColor,
        }}
        onClick={animationType !== "scroll" ? triggerAnimation : undefined}
      >
        {children}
      </h2>
      
      {/* オーバーレイで色が横切る部分 */}
      {scrollProgress > 0 && (
        <h2
          className={`${className} absolute top-0 left-0 pointer-events-none`}
          style={{
            color: waveColor,
            clipPath: `polygon(${Math.max(0, gradientPosition - 20)}% 0%, ${Math.min(100, gradientPosition + 20)}% 0%, ${Math.min(100, gradientPosition + 20)}% 100%, ${Math.max(0, gradientPosition - 20)}% 100%)`,
          }}
        >
          {children}
        </h2>
      )}
      
    </div>
  );
};

export default AnimatedTitle;