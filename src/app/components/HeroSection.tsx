'use client'

import React, { useState, useEffect } from 'react';
import styles from './IiLoCorporateSite.module.css';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ParticleSystemの完了後に開始
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // 2.5秒 + 0.5秒のマージン

    return () => clearTimeout(timer);
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