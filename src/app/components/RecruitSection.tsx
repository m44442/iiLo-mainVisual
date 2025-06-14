'use client'

import React from 'react';
import styles from './IiLoCorporateSite.module.css';

const RecruitSection = () => {
  return (
    <section id="recruit" className={styles.section}>
      <div className={styles.container1024}>
        <h2 className={styles.sectionTitleWhiteBg}>
          Recruit
        </h2>
        
        <div className={styles.recruitDescription}>
          私たちは、現場で本当に使われるプロダクトにこだわり、人々のキャリアの可能性を広げています。<br />
          一緒に働く仲間を募集中です。
        </div>
        
        <div className={styles.recruitGrid}>
          <div className={styles.recruitCard}>
            <h3 className={styles.recruitTitle}>
             正社員・インターン採用
            </h3>
            <p className={styles.recruitCardDescription}>
              エンジニア
            </p>
            <button className={styles.recruitButton}>
              more
            </button>
          </div>
          
          <div className={styles.recruitCard}>
            <h3 className={styles.recruitTitle}>
              アルバイト採用
            </h3>
            <p className={styles.recruitCardDescription}>
              DIILOスタッフ
            </p>
            <button className={styles.recruitButton}>
              more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitSection;