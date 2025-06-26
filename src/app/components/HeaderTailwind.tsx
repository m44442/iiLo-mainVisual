"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const HeaderTailwind = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

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
    console.log("Opening menu");
    setShouldRender(true);
    setIsClosing(false);
    // DOM要素が作成された後にアニメーションを開始
    setTimeout(() => {
      setIsMenuOpen(true);
    }, 10);
  };

  const closeMenu = () => {
    console.log("Closing menu");
    setIsClosing(true);
    setTimeout(() => {
      console.log("Menu closed");
      setIsMenuOpen(false);
      setShouldRender(false);
      setIsClosing(false);
    }, 100);
  };

  const handleLogoClick = () => {
    router.push("/");
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
        max-[480px]:w-[375px] max-[480px]:h-[50px] max-[480px]:p-0 max-[480px]:bg-white/[0.01]
        ${
          isScrolled
            ? "bg-white/[0.01] backdrop-blur-sm border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            : "bg-transparent"
        }
      `}
      >
        <div className="relative w-full h-full max-w-[1200px] mx-auto pt-2 max-[480px]:pt-0 max-[480px]:max-w-none">
          {/* ロゴ */}
          <div
            className={`
            absolute cursor-pointer text-black z-[51] 
            text-[40px] font-normal left-[30px] top-[-26px]
            md:text-[40px] lg:text-[40px]
            max-[767px]:text-[32px] max-[767px]:top-[-8px]
            max-[480px]:text-[28px] max-[480px]:h-[17.5px] max-[480px]:left-[6.13%] max-[480px]:top-4 max-[480px]:m-0
            transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }
          `}
            onClick={handleLogoClick}
          >
            IILo
          </div>

          {/* デスクトップナビゲーション */}
             <nav className="max-md:hidden lg:flex items-start gap-8 absolute right-[133px] top-[-7px]">
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
                  relative inline-block h-5 mr-[30px] text-black text-sm font-semibold 
                  cursor-pointer overflow-hidden transition-all duration-300 group
                  ${
                    isLoaded
                      ? `opacity-100 translate-y-0 animate-[slideInDown_0.6s_cubic-bezier(0.25,0.46,0.45,0.94)_${0.1 + index * 0.1}s_forwards]`
                      : "opacity-0 -translate-y-5"
                  }
                `}
                onClick={
                  item.href.startsWith("#") ? handleMenuClick : undefined
                }
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
                className={`h-0.5 w-full bg-black transition-all duration-300 ease-out origin-center ${
                  isMenuOpen ? "rotate-45 translate-y-1 bg-white" : "rotate-0"
                }`}
              />
              <div
                className={`h-0.5 w-full bg-black transition-all duration-300 ease-out origin-center ${
                  isMenuOpen ? "-rotate-45 -translate-y-1 bg-white" : "rotate-0"
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
            <div className="flex flex-col gap-6 flex-1 relative z-10 max-[480px]:absolute max-[480px]:left-[23px] max-[480px]:bottom-[100px] max-[480px]:flex-none">
              <div className="space-y-6 max-[480px]:space-y-0">
                <div className="max-[480px]:hidden">
                  <h3 className="text-white text-lg font-semibold mb-4 tracking-wide">
                    Office
                  </h3>
                  <div className="text-white/80 text-sm leading-relaxed">
                    東京都千代田区永田町
                    <br />
                    一丁目1番1号
                  </div>
                </div>

                <div className="flex flex-col gap-3 max-[480px]:gap-[10px] relative">
                  {["X", "Instagram", "Line"].map((social, index) => (
                    <a
                      key={social}
                      href="#"
                      className={`hover:opacity-70 transition-opacity duration-300 relative z-30 text-white no-underline
                      text-sm max-[480px]:text-[13px] max-[480px]:font-medium max-[480px]:leading-[22px] max-[480px]:font-['General_Sans_Variable']
                      max-[480px]:absolute
                      ${index === 0 ? "max-[480px]:top-0" : ""}
                      ${index === 1 ? "max-[480px]:top-[32px]" : ""}
                      ${index === 2 ? "max-[480px]:top-[64px]" : ""}
                      `}
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 右側 - ナビゲーション */}
            <div className="flex flex-col gap-2 flex-1 relative z-30 text-white max-[480px]:absolute max-[480px]:left-[23px] max-[480px]:top-[117px] max-[480px]:block max-[480px]:flex-none">
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
                           text-[36px] font-light md:text-[42px] md:py-5 lg:text-[48px] lg:py-6
                           max-[480px]:text-[23px] max-[480px]:font-medium max-[480px]:leading-[22px] max-[480px]:p-0 max-[480px]:mb-[55px] max-[480px]:block max-[480px]:absolute max-[480px]:font-['General_Sans_Variable']
                           ${index === 0 ? "max-[480px]:top-0" : ""}
                           ${index === 1 ? "max-[480px]:top-[55px]" : ""}
                           ${index === 2 ? "max-[480px]:top-[110px]" : ""}
                           ${index === 3 ? "max-[480px]:top-[165px]" : ""}
                           ${index === 4 ? "max-[480px]:top-[220px]" : ""}
                           `}
                  onClick={
                    item.href.startsWith("#") ? handleMenuClick : undefined
                  }
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderTailwind;
