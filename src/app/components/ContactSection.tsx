'use client'

import React from 'react';
import styles from './ContactSection.module.css';

const ContactSection = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h3 className={styles.contactTitle}>Contact</h3>
        <div className={styles.contactCard}>
          <div className={styles.contactContent}>
            <h4 className={styles.contactCardTitle}>ご質問・お問い合わせ</h4>
            <p className={styles.contactDescription}>
              お気軽にお問い合わせください。
            </p>
            <button className={styles.contactButton}>お問い合わせ</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;