'use client'

import React from 'react';
import styles from './IiLoCorporateSite.module.css';

const CompanySection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container1024}>
        <h2 className={styles.sectionTitleWhiteBg}>
          Company
        </h2>
        
        <div className={styles.companyTable}>
          <div className={styles.companyRow}>
            <div className={styles.companyLabel}>会社名</div>
            <div className={styles.companyValue}>株式会社IILo</div>
          </div>
          <div className={styles.companyRow}>
            <div className={styles.companyLabel}>代表</div>
            <div className={styles.companyValue}>名前</div>
          </div>
          <div className={styles.companyRow}>
            <div className={styles.companyLabel}>設立</div>
            <div className={styles.companyValue}>設立年</div>
          </div>
          <div className={styles.companyRow}>
            <div className={styles.companyLabel}>住所</div>
            <div className={styles.companyValue}>住所</div>
          </div>
          <div className={styles.companyRow}>
            <div className={styles.companyLabel}>電話</div>
            <div className={styles.companyValue}>電話番号</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;