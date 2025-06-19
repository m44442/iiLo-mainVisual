'use client'

import React from 'react';
import styles from './IiLoCorporateSite.module.css';

const NewsSectionNew = () => {
  return (
    <section id="news" className={`${styles.newsSection} ${styles.newsBlackSection}`}>
      <div className={styles.newsSectionHeader}>
        <div className={styles.newsDot}></div>
        <h2 className={styles.newsTitle}>News</h2>
      </div>
      
      <div className={styles.newsContainer}>
        <div className={styles.newsItem}>
          <div className={styles.newsDate}>YYYY.MM.DD</div>
          <div className={styles.newsContent}>
            最新情報タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイ…
          </div>
        </div>
        <div className={styles.newsLine}></div>
        
        <div className={styles.newsItem}>
          <div className={styles.newsDate}>YYYY.MM.DD</div>
          <div className={styles.newsContent}>
            最新情報タイトル
          </div>
        </div>
        <div className={styles.newsLine}></div>
        
        <div className={styles.newsItem}>
          <div className={styles.newsDate}>YYYY.MM.DD</div>
          <div className={styles.newsContent}>
            最新情報タイトル
          </div>
        </div>
        <div className={styles.newsLine}></div>
      </div>
      
      <div className={styles.newsButtonContainer}>
        <button className={styles.newsButton}>More</button>
      </div>
    </section>
  );
};

export default NewsSectionNew;