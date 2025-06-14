'use client'

import React from 'react';
import styles from './IiLoCorporateSite.module.css';

const NewsSection = () => {
  return (
    <section id="news" className={styles.blackSection}>
      <div className={styles.container1024}>
        <h2 className={styles.serviceSectionTitle}>
          News
        </h2>
        
        <div className={styles.newsContainer}>
          <div className={styles.newsItem}>
            <div className={styles.newsDate}>日付</div>
            <div className={styles.newsTitle}>タイトル</div>
          </div>
          <div className={styles.newsItem}>
            <div className={styles.newsDate}>日付</div>
            <div className={styles.newsTitle}>タイトル</div>
          </div>
          <div className={styles.newsItem}>
            <div className={styles.newsDate}>日付</div>
            <div className={styles.newsTitle}>タイトル</div>
          </div>
        </div>
        
        <div className={styles.newsButton}>
          <button className={styles.buttonWhite}>
            ニュース一覧
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;