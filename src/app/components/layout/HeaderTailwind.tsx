"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useScrollLock } from "../../hooks/useScrollLock";

interface HeaderTailwindProps {
  onMissionClick?: () => void;
}

const HeaderTailwind = ({ onMissionClick }: HeaderTailwindProps = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInParticleSection, setIsInParticleSection] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
      
      // ParticleSystemセクション（最初のセクション）の判定
      const missionSection = document.querySelector('#mission');
      const isInParticle = !missionSection || missionSection.getBoundingClientRect().top > 0;
      setIsInParticleSection(isInParticle);
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

  // モバイルメニュー時の背景スクロール無効化
  useScrollLock(isMenuOpen);

  const openMenu = () => {
    setShouldRender(true);
    setIsClosing(false);
    // DOM要素が作成された後にアニメーションを開始
    setTimeout(() => {
      setIsMenuOpen(true);
    }, 10);
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setShouldRender(false);
      setIsClosing(false);
    }, 100);
  };

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
    <>
      {/* ヘッダー全体 */}
      <header
        className={`
        fixed top-0 left-0 w-full h-[60px] z-50 px-6 py-2
        transition-all duration-300 ease-in-out
        md:px-6 md:py-8 lg:px-8 lg:py-10
        max-[767px]:h-[50px] max-[767px]:px-6 max-[767px]:py-2
        max-[480px]:w-full max-[480px]:h-[50px] max-[480px]:p-0 max-[480px]:bg-white/[0.01]
        ${!isInParticleSection ? '[mix-blend-mode:difference]' : ''}
        ${
          isScrolled
            ? "backdrop-blur-md border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            : "bg-transparent"
        }
      `}
      >
        <div className="relative w-full h-full max-w-[1200px] mx-auto pt-2 max-[480px]:pt-0 max-[480px]:max-w-none">
          {/* ロゴ */}
          <div
            className={`
            absolute cursor-pointer z-[51] 
            left-[30px] top-[-26px]
            max-[767px]:top-[-8px]
            max-[480px]:left-[6.13%] max-[480px]:top-4 max-[480px]:m-0
            transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }
          `}
            onClick={handleLogoClick}
          >
            {(isMenuOpen || (isInParticleSection ? false : false)) ? (
              <Image
                src="/images/IILo-DIILo_logo_IILo_logo-w.png"
                alt="IILo"
                width={80}
                height={28}
                className="max-[767px]:w-[64px] max-[767px]:h-[22px] max-[480px]:w-[56px] max-[480px]:h-auto"
              />
            ) : (
              <Image
                src={isInParticleSection ? "/images/IILo-DIILo_logo_IILo_logo-b.png" : "/images/IILo-DIILo_logo_IILo_logo-w.png"}
                alt="IILo"
                width={80}
                height={28}
                className="max-[767px]:w-[64px] max-[767px]:h-[22px] max-[480px]:w-[56px] max-[480px]:h-auto"
              />
            )}
          </div>

          {/* デスクトップナビゲーション */}
             <nav className={`max-md:hidden lg:flex items-start gap-8 absolute right-[133px] top-[-7px] ${!isInParticleSection ? '[mix-blend-mode:difference]' : ''}`}>
            {[
              { href: "/mission", text: "Mission" },
              { href: "#service", text: "Service" },
              { href: "#recruit", text: "Recruit" },
              { href: "#contact", text: "Contact" },
              { href: "#news", text: "News" },
            ].map((item, index) => (
              <a
                key={item.text}
                href={item.href}
                data-text={item.text}
                className={`
                  relative inline-block h-5 mr-[30px] text-sm font-semibold 
                  cursor-pointer overflow-hidden transition-all duration-300 group
                  ${isInParticleSection ? '!text-black' : '!text-white'}
                  ${
                    isLoaded
                      ? `opacity-100 translate-y-0 animate-[slideInDown_0.6s_cubic-bezier(0.25,0.46,0.45,0.94)_${0.1 + index * 0.1}s_forwards]`
                      : "opacity-0 -translate-y-5"
                  }
                `}
                onClick={(e) => {
                  if (item.text === "Mission") {
                    e.preventDefault();
                    const missionElement = document.querySelector('#mission');
                    if (missionElement) {
                      missionElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  } else if (item.href.startsWith("#")) {
                    handleMenuClick(e);
                  }
                }}
              >
                <span className="block transition-all duration-300 origin-left group-hover:rotate-[-60deg] group-hover:opacity-0">
                  {item.text}
                </span>
                <span className="absolute top-full left-0 rotate-[60deg] opacity-0 transition-all duration-300 origin-left group-hover:translate-y-[-100%] group-hover:rotate-0 group-hover:opacity-100">
                  {item.text}
                </span>
              </a>
            ))}
          </nav>

          {/* ハンバーガーメニューボタン */}
          <button
            type="button"
            className={`
              absolute bg-transparent border-none cursor-pointer
              z-[51] w-10 h-10 right-[20px] top-[-15px]
              max-[767px]:top-0
              max-[480px]:right-[-30px] max-[480px]:top-[5px] max-[480px]:w-[70px] max-[480px]:h-[50px]
              transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              hover:scale-110
              ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }
            `}
            onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
            aria-label="Toggle menu"
          >
            {/* ハンバーガーライン */}
            <div className="flex flex-col gap-1.5 w-8 h-6 justify-center">
              <div
                className={`h-0.5 w-full transition-all duration-300 ease-out origin-center ${
                  isMenuOpen 
                    ? "rotate-45 translate-y-1 bg-white" 
                    : `rotate-0 ${isInParticleSection ? '!bg-black' : 'bg-white'}`
                }`}
              />
              <div
                className={`h-0.5 w-full transition-all duration-300 ease-out origin-center ${
                  isMenuOpen 
                    ? "-rotate-45 -translate-y-1 bg-white" 
                    : `rotate-0 ${isInParticleSection ? '!bg-black' : 'bg-white'}`
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* モバイルメニュー */}
      {shouldRender && (
        <div
          className={`
          fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-[49]
          bg-black/95 backdrop-blur-[15px]
          ${isMenuOpen && !isClosing ? "animate-expandFromCenter" : "opacity-0"}
          ${isClosing ? "animate-contractToCenter" : ""}
        `}
        >
          {/* 480px以下専用の黒背景 */}
          <div className="hidden max-[480px]:block absolute left-0 right-0 top-0 bottom-0 bg-black"></div>

          <div className="p-[80px_60px_40px_60px] flex justify-between items-start h-full gap-10 md:p-[120px_80px_60px_80px] lg:p-[140px_120px_80px_120px] max-[480px]:p-0 max-[480px]:h-full max-[480px]:block max-[480px]:relative max-[480px]:w-full relative z-20 text-white">
            {/* 左側 - オフィス情報 */}
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 flex-1 relative z-10 lg:mt-20 ml-8 md:ml-12 lg:ml-16 max-[480px]:absolute max-[480px]:left-[23px] max-[480px]:bottom-[100px] max-[480px]:flex-none max-[480px]:ml-0">
              <div className="space-y-6 md:space-y-8 lg:space-y-10 max-[480px]:space-y-0">
                <div className="max-[480px]:hidden">
                  <h3 className="text-gray-400 text-lg md:text-xl lg:text-2xl md:font-bold lg:font-light md:mb-6 lg:mb-3 tracking-wide md:tracking-wider lg:tracking-widest">
                    Office
                  </h3>
                  <div className="text-white/80 md:text-white/85 lg:text-white/90 text-sm md:text-base lg:text-lg leading-relaxed md:leading-loose lg:leading-loose mb-6 md:mb-8 lg:mb-10">
                    東京都千代田区永田町
                    <br />
                    一丁目1番1号
                  </div>
                  {/* PC版SNSリンク */}
                  <div className="text-gray-400 flex flex-col gap-3 md:gap-4 lg:gap-5 lg:mt-20">
                    {['X', 'Instagram', 'LINE'].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="lg:ease-in-out hover:opacity-70 md:hover:opacity-60 lg:hover:opacity-50 lg:hover:translate-x-1 transition-opacity duration-300 md:duration-400 lg:duration-300 text-white no-underline text-sm md:text-base lg:text-lg"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 右側 - ナビゲーション */}
            <div className="flex flex-col gap-2 flex-1 relative z-30 text-white max-[480px]:absolute max-[480px]:left-[23px] max-[480px]:top-[117px] max-[480px]:block max-[480px]:flex-none lg:mt-15 lg:mr-20">
              {[
                { href: "/mission", text: "Mission" },
                { href: "#service", text: "Service" },
                { href: "#recruit", text: "Recruit" },
                { href: "#contact", text: "Contact" },
                { href: "#news", text: "News" },
              ].map((item, index) => (
                <a
                  key={item.text}
                  href={item.href}
                  className={`block py-4 px-0 cursor-pointer text-white no-underline
                           transition-all duration-300 ease-in-out border-none bg-transparent text-left
                           hover:opacity-70 hover:translate-x-2 relative z-40
                           text-[36px] font-light lg:font-medium md:text-[42px] md:py-5 lg:text-[48px] lg:py-2
                           max-[480px]:text-[23px] max-[480px]:font-medium max-[480px]:leading-[22px] max-[480px]:p-0 max-[480px]:mb-[55px] max-[480px]:block max-[480px]:absolute max-[480px]:font-['General_Sans_Variable','General_Sans',sans-serif]
                           ${index === 0 ? "max-[480px]:top-0" : ""}
                           ${index === 1 ? "max-[480px]:top-[55px]" : ""}
                           ${index === 2 ? "max-[480px]:top-[110px]" : ""}
                           ${index === 3 ? "max-[480px]:top-[165px]" : ""}
                           ${index === 4 ? "max-[480px]:top-[220px]" : ""}
                           `}
                  onClick={(e) => {
                    if (item.text === "Mission") {
                      e.preventDefault();
                      const missionElement = document.querySelector('#mission');
                      if (missionElement) {
                        missionElement.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                      closeMenu();
                    } else if (item.href.startsWith("#")) {
                      handleMenuClick(e);
                    }
                  }}
                >
                  {item.text}
                </a>
              ))}
              {/* スマホ版SNSリンク（Newsの下に表示・さらに200px下に） */}
              <div className="hidden max-[480px]:flex max-[480px]:flex-col max-[480px]:gap-[10px] max-[480px]:mt-[340px] max-[480px]:mb-0 max-[480px]:block">
                {['X', 'Instagram', 'LINE'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="hover:opacity-70 transition-opacity duration-300 text-white no-underline text-sm max-[480px]:text-[13px] max-[480px]:font-medium max-[480px]:leading-[22px] max-[480px]:font-['General_Sans_Variable','General_Sans',sans-serif] max-[480px]:block max-[480px]:mb-2"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderTailwind;
