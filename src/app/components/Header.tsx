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
          <a href="#mission" className={styles.navItem} onClick={handleMenuClick}>Mission</a>
          <a href="#service" className={styles.navItem} onClick={handleMenuClick}>Service</a>
          <a href="#recruit" className={styles.navItem} onClick={handleMenuClick}>Recruit</a>
          <a href="#contact" className={styles.navItem} onClick={handleMenuClick}>Contact</a>
          <a href="#news" className={styles.navItem} onClick={handleMenuClick}>News</a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            <a href="#mission" className={styles.menuItem} onClick={handleMenuClick}>Mission</a>
            <a href="#service" className={styles.menuItem} onClick={handleMenuClick}>Service</a>
            <a href="#recruit" className={styles.menuItem} onClick={handleMenuClick}>Recruit</a>
            <a href="#contact" className={styles.menuItem} onClick={handleMenuClick}>Contact</a>
            <a href="#news" className={styles.menuItem} onClick={handleMenuClick}>News</a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;