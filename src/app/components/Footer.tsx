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
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {/* Left Section */}
          <div className={styles.footerLeft}>
            <Image
              src="/images/IILo-DIILo_logo_IILo_logo-b.png"
              alt="IILO Logo"
              width={80}
              height={40}
              className={styles.footerLogo}
            />
            <div className={styles.copyright}>
              ©2025 - IILO
            </div>
          </div>

          {/* Center Section */}
          <div className={styles.footerCenter}>
            <div className={styles.footerNavLeft}>
              <ul className={styles.footerList}>
                <li>
                  <a href="#mission" className={styles.footerLink} onClick={handleMenuClick}>
                    Mission
                  </a>
                </li>
                <li>
                  <a href="#service" className={styles.footerLink} onClick={handleMenuClick}>
                    Service
                  </a>
                </li>
                <li>
                  <a href="#recruit" className={styles.footerLink} onClick={handleMenuClick}>
                    Recruit
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.footerNavRight}>
              <ul className={styles.footerList}>
                <li>
                  <a href="#contact" className={styles.footerLink} onClick={handleMenuClick}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#news" className={styles.footerLink} onClick={handleMenuClick}>
                    News
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className={styles.footerRight}>
            <div className={styles.footerRightTop}>
              <ul className={styles.socialList}>
                <li>
                  <a href="#" className={styles.socialLink}>
                    X
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.socialLink}>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.socialLink}>
                    Line
                  </a>
                </li>
              </ul>
              <button 
                type="button"
                className={styles.pageTopButton}
                onClick={handleScrollToTop}
              >
                Pagetop
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;