'use client'

import React from 'react';
import styles from './IiLoCorporateSite.module.css';

const ContactSection = () => {
  return (
    <section id="contact" className={styles.blackSection}>
      <div className={styles.container1024}>
        <h2 className={styles.serviceSectionTitle}>
          Contact
        </h2>
        
        <div style={{ textAlign: 'center' }}>
          <p className={styles.newsDescription}>
            ご質問・お問い合わせ
          </p>
          
          <button className={styles.buttonWhite}>
            お問い合わせ
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;