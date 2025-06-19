'use client'

import React from 'react';
import styles from './ContactSection.module.css';

const ContactSection = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.contactContainer}>
          <div className={styles.contactSectionHeader}>
            <div className={styles.contactDot}></div>
            <h2 className={styles.contactTitle}>Contact</h2>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactContent}>
              <h4 className={styles.contactCardTitle}>ご質問・お問い合わせ</h4>
              <p className={styles.contactDescription}>
                お気軽にお問い合わせください。
              </p>
              <button className={styles.contactButton}>more</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;