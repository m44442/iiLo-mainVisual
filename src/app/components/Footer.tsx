'use client'

import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topLine}></div>
      <div className={styles.footerContainer}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Image
            src="/images/IILo-DIILo_logo_IILo_logo-b.png"
            alt="IILO Logo"
            width={80}
            height={37.5}
            className={styles.footerLogo}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          ©2025 - IILO
        </div>

        {/* Navigation Links - Individual positioning */}
        <a href="#mission" className={styles.missionLink} onClick={handleMenuClick}>
          Mission
        </a>
        <a href="#service" className={styles.serviceLink} onClick={handleMenuClick}>
          Service
        </a>
        <a href="#recruit" className={styles.recruitLink} onClick={handleMenuClick}>
          Recruit
        </a>
        <a href="#contact" className={styles.contactLink} onClick={handleMenuClick}>
          Contact
        </a>
        <a href="#news" className={styles.newsLink} onClick={handleMenuClick}>
          News
        </a>

        {/* Social Links - Individual positioning */}
        <a href="#" className={styles.xLink}>X</a>
        <a href="#" className={styles.instagramLink}>Instagram</a>
        <a href="#" className={styles.lineLink}>LINE</a>

        {/* Page Top Button */}
        <button 
          type="button"
          className={styles.pageTopButton}
          onClick={handleScrollToTop}
        >
          Pagetop
        </button>
      </div>
    </footer>
  );
};

export default Footer;