'use client'

import React from 'react';
import styles from './IiLoCorporateSite.module.css';

const CompanySectionNew = () => {
  return (
    <section className={styles.companySection}>
      <div className={styles.companySectionHeader}>
        <div className={styles.companyDot}></div>
        <h2 className={styles.companyTitle}>Company</h2>
      </div>
      
      <div className={styles.companyTable}>
        <div className={styles.companyRow}>
          <div className={styles.companyLabel}>
            <span>会社名</span>
          </div>
          <div className={styles.companyValue}>合同会社IILo</div>
        </div>
        <div className={styles.companyRow}>
          <div className={styles.companyLabel}>
            <span>代表</span>
          </div>
          <div className={styles.companyValue}>名前 名前</div>
        </div>
        <div className={styles.companyRow}>
          <div className={styles.companyLabel}>
            <span>設立</span>
          </div>
          <div className={styles.companyValue}>2025年◯月</div>
        </div>
        <div className={styles.companyRow}>
          <div className={styles.companyLabel}>
            <span>住所</span>
          </div>
          <div className={styles.companyValue}>〒000-0000　住所住所住所住所住所住所</div>
        </div>
        <div className={styles.companyRow}>
          <div className={styles.companyLabel}>
            <span>電話</span>
          </div>
          <div className={styles.companyValue}>00-0000-0000</div>
        </div>
      </div>
    </section>
  );
};

export default CompanySectionNew;