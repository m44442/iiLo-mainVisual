'use client'

import React, { useState, useEffect } from 'react';
import styles from './IiLoCorporateSite.module.css';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ParticleSystemの完了後に開始
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2200); // 2.2秒後に開始

    return () => clearTimeout(timer);
  }, []);

  // スクロール制御（既存コードに影響しない独立したuseEffect）
  useEffect(() => {
    // より強力なスクロール禁止（複数要素に適用）
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    // スクロールイベント自体をブロック
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    
    // ヒーローアニメーション完了後にスクロール許可
    const scrollTimer = setTimeout(() => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
      
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    }, 4000); // 3秒（テキスト表示） + 1秒（アニメーション完了）のマージン

    return () => {
      clearTimeout(scrollTimer);
      // クリーンアップで確実に復元
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
      
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  return (
    <section className={styles.heroSection}>
      <div>
        <p className={`${styles.heroText} ${isVisible ? styles.heroTextAnimated : ''}`}>
          <span className={`${styles.heroLine1} ${isVisible ? styles.heroLine1Animated : ''}`}>
            あなたの現場に、
          </span>
          <br />
          <span className={`${styles.heroLine2} ${isVisible ? styles.heroLine2Animated : ''}`}>
            もうひとつの頭脳を。
          </span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;