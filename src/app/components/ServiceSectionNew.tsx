'use client'

import React from 'react';
import styles from './IiLoCorporateSite.module.css';

const ServiceSectionNew = () => {
  return (
    <section id="service" className={styles.serviceBlackSection}>
      <div className={styles.container1024}>
        {/* Service Title */}
        <h2 className={styles.serviceNewSectionTitle}>
          Service
        </h2>
        
        {/* Description */}
        <div className={styles.serviceNewIntroduction}>
          <p className={styles.serviceNewIntroText}>
            IILoが展開する事業をご紹介します。
          </p>
          
          {/* Horizontal Line */}
          <div className={styles.serviceNewIntroLine}></div>
        </div>
        
        {/* Service Cards Container */}
        <div className={styles.serviceNewCardsContainer}>
          {/* Card 1 */}
          <div className={styles.serviceNewCardWrapper}>
            <div className={styles.serviceNewCard}>
              {/* カード内は空 */}
            </div>
            <div className={styles.serviceNewCardDescription}>
              <p>説明文</p>
              <p>説明文</p>
            </div>
            <div className={styles.serviceNewCardButtonWrapper}>
              <button className={styles.serviceNewCardButton}>
                More
              </button>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className={styles.serviceNewCardWrapper}>
            <div className={styles.serviceNewCard}>
              {/* カード内は空 */}
            </div>
            <div className={styles.serviceNewCardDescription}>
              <p>説明文</p>
              <p>説明文</p>
            </div>
            <div className={styles.serviceNewCardButtonWrapper}>
              <button className={styles.serviceNewCardButton}>
                More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSectionNew;
