"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js のルーター機能を追加
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter(); // ルーターを初期化

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    
    // ページロード時のアニメーション（ParticleSystemの完了後に開始）
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1800); // 1.8秒 - ParticleSystemと同時終了

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true);
    setShouldRender(true);
    setIsClosing(false);
  };

  const closeMenu = () => {
    console.log("Closing menu"); // デバッグ用
    setIsClosing(true);
    setTimeout(() => {
      console.log("Menu closed"); // デバッグ用
      setIsMenuOpen(false);
      setShouldRender(false);
      setIsClosing(false);
    }, 100); // アニメーション時間を短縮
  };

  // ロゴクリック時のハンドラーを修正
  const handleLogoClick = () => {
    router.push("/"); // ホームページに遷移
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    closeMenu();
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerContent}>
        <div
          className={`${styles.logo} ${isLoaded ? styles.logoAnimated : ''}`}
          onClick={handleLogoClick} // 修正されたハンドラーを使用
          style={{ cursor: "pointer" }}
        >
          IILo
        </div>

        {/* Desktop Navigation */}
        <nav className={`${styles.desktopNav} ${isLoaded ? styles.navAnimated : ''}`}>
          <a href="/mission" className={`${styles.navItem} ${isLoaded ? styles.navItem1 : ''}`} data-text="Mission">
            <span>Mission</span>
          </a>
          <a
            href="#service"
            className={`${styles.navItem} ${isLoaded ? styles.navItem2 : ''}`}
            data-text="Service"
            onClick={handleMenuClick}
          >
            <span>Service</span>
          </a>
          <a
            href="#recruit"
            className={`${styles.navItem} ${isLoaded ? styles.navItem3 : ''}`}
            data-text="Recruit"
            onClick={handleMenuClick}
          >
            <span>Recruit</span>
          </a>
          <a
            href="#contact"
            className={`${styles.navItem} ${isLoaded ? styles.navItem4 : ''}`}
            data-text="Contact"
            onClick={handleMenuClick}
          >
            <span>Contact</span>
          </a>
          <a
            href="#news"
            className={`${styles.navItem} ${isLoaded ? styles.navItem5 : ''}`}
            data-text="News"
            onClick={handleMenuClick}
          >
            <span>News</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`${styles.menuButton} ${isMenuOpen ? styles.open : ""} ${isMenuOpen ? styles.menuOpen : ""} ${isClosing ? styles.closing : ""} ${isLoaded ? styles.menuButtonAnimated : ""}`}
          onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
          aria-label="Toggle menu"
        >
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {shouldRender && (
        <nav
          className={`${styles.mobileMenu} ${isClosing ? styles.closing : ""}`}
        >
          <div className={styles.mobileMenuContent}>
            {/* Left Side - Office Info & Social Links */}
            <div className={styles.mobileMenuLeft}>
              <div className={styles.officeInfo}>
                <h3 className={styles.officeTitle}>Office</h3>
                <div className={styles.officeAddress}>
                  東京都千代田区永田町
                  <br />
                  一丁目1番1号
                </div>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialLink}>
                    X
                  </a>
                  <a href="#" className={styles.socialLink}>
                    Instagram
                  </a>
                  <a href="#" className={styles.socialLink}>
                    Line
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Navigation Menu */}
            <div className={styles.mobileMenuRight}>
              <a href="/mission" className={styles.menuItem}>
                Mission
              </a>
              <a
                href="#service"
                className={styles.menuItem}
                onClick={handleMenuClick}
              >
                Service
              </a>
              <a
                href="#recruit"
                className={styles.menuItem}
                onClick={handleMenuClick}
              >
                Recruit
              </a>
              <a
                href="#contact"
                className={styles.menuItem}
                onClick={handleMenuClick}
              >
                Contact
              </a>
              <a
                href="#news"
                className={styles.menuItem}
                onClick={handleMenuClick}
              >
                News
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
