'use client'

import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          IILo
        </div>
        
        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <a href="#mission" className={styles.navItem} data-text="Mission" onClick={handleMenuClick}>
            <span>Mission</span>
          </a>
          <a href="#service" className={styles.navItem} data-text="Service" onClick={handleMenuClick}>
            <span>Service</span>
          </a>
          <a href="#recruit" className={styles.navItem} data-text="Recruit" onClick={handleMenuClick}>
            <span>Recruit</span>
          </a>
          <a href="#contact" className={styles.navItem} data-text="Contact" onClick={handleMenuClick}>
            <span>Contact</span>
          </a>
          <a href="#news" className={styles.navItem} data-text="News" onClick={handleMenuClick}>
            <span>News</span>
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          type="button"
          className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''} ${isMenuOpen ? styles.menuOpen : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            {/* Left Side - Office Info & Social Links */}
            <div className={styles.mobileMenuLeft}>
              <div className={styles.officeInfo}>
                <h3 className={styles.officeTitle}>Office</h3>
                <div className={styles.officeAddress}>
                  東京都千代田区永田町<br />
                  一丁目1番1号
                </div>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialLink}>X</a>
                  <a href="#" className={styles.socialLink}>Instagram</a>
                  <a href="#" className={styles.socialLink}>Line</a>
                </div>
              </div>
            </div>
            
            {/* Right Side - Navigation Menu */}
            <div className={styles.mobileMenuRight}>
              <a href="#mission" className={styles.menuItem} onClick={handleMenuClick}>Mission</a>
              <a href="#service" className={styles.menuItem} onClick={handleMenuClick}>Service</a>
              <a href="#recruit" className={styles.menuItem} onClick={handleMenuClick}>Recruit</a>
              <a href="#contact" className={styles.menuItem} onClick={handleMenuClick}>Contact</a>
              <a href="#news" className={styles.menuItem} onClick={handleMenuClick}>News</a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;