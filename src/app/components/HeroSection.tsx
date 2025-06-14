'use client'

import React from 'react';
import styles from './IiLoCorporateSite.module.css';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div>
        <p className={styles.heroText}>
          あなたの現場に、<br />
          もうひとつの頭脳を。
        </p>
      </div>
    </section>
  );
};

export default HeroSection;