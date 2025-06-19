'use client'

import React, { useState, useEffect } from 'react';
import styles from './IiLoCorporateSite.module.css';
import Header from './Header';

interface HeroSectionProps {
  particleAnimationComplete: boolean;
  onHeaderAnimationComplete: (completed: boolean) => void;
  onHeroAnimationComplete: (completed: boolean) => void;
}

const HeroSection = ({ 
  particleAnimationComplete, 
  onHeaderAnimationComplete, 
  onHeroAnimationComplete 
}: HeroSectionProps) => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [heroTextVisible, setHeroTextVisible] = useState(false);

  useEffect(() => {
    if (particleAnimationComplete) {
      // パーティクル完了100ms後にヘッダー表示
      const headerTimer = setTimeout(() => {
        setHeaderVisible(true);
        
        // ヘッダーアニメーション完了300ms後にヒーローテキスト表示
        const heroTimer = setTimeout(() => {
          setHeroTextVisible(true);
          
          // ヒーローテキストアニメーション完了1秒後にスクロール可能
          const scrollTimer = setTimeout(() => {
            onHeroAnimationComplete(true);
          }, 1000);
          
          return () => clearTimeout(scrollTimer);
        }, 300);
        
        onHeaderAnimationComplete(true);
        return () => clearTimeout(heroTimer);
      }, 100);
      
      return () => clearTimeout(headerTimer);
    }
  }, [particleAnimationComplete, onHeaderAnimationComplete, onHeroAnimationComplete]);

  return (
    <>
      <Header isVisible={headerVisible} />
      <section className={styles.heroSection}>
        <div>
          <p className={`${styles.heroText} ${heroTextVisible ? styles.heroTextAnimated : ''}`}>
            <span className={`${styles.heroLine1} ${heroTextVisible ? styles.heroLine1Animated : ''}`}>
              あなたの現場に、
            </span>
            <br />
            <span className={`${styles.heroLine2} ${heroTextVisible ? styles.heroLine2Animated : ''}`}>
              もうひとつの頭脳を。
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;