"use client";

import React from "react";
import Image from "next/image";
import { HoverButton } from "../../../components/ui/hover-button";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  };

  return (
    <footer className="font-sans relative w-full h-[330px] bg-[#E7E7E7] max-[480px]:h-[480px] max-[480px]:pb-20">
      <div className="absolute w-full h-px top-0 bg-black max-[480px]:left-0"></div>
      <div className="relative w-full h-full max-w-[1728px] mx-auto">
        {/* Logo Section */}
        <div className="absolute left-[9.49%] top-[105.29px] h-[37.5px] max-[480px]:left-[3.13%] max-[480px]:top-[55px] max-[480px]:h-[35px]">
          <Image
            src="/images/IILo-DIILo_logo_IILo_logo-b.png"
            alt="IILO Logo"
            width={80}
            height={37.5}
            className="object-contain cursor-pointer max-[480px]:h-[35px]"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>

        {/* Copyright */}
        <div className="absolute left-[calc(9.49%+10px)] right-[87.15%] top-[45.67%] bottom-[48.61%] font-medium text-[8px] leading-[22px] text-black whitespace-nowrap max-[480px]:left-[6.13%] max-[480px]:top-[21.88%] max-[480px]:text-[8px]">
          ©2025 - IILO
        </div>

        {/* Navigation Links - Individual positioning */}
        <a
          href="#mission"
          className="absolute left-[23.96%] right-[72.57%] top-[30.61%] bottom-[63.68%] font-medium text-base leading-[22px] text-black no-underline cursor-pointer transition-colors duration-300 hover:text-gray-500 max-[480px]:left-[6.13%] max-[480px]:top-[34.79%] max-[480px]:text-[16px]"
        >
          Mission
        </a>
        <a
          href="#service"
          className="absolute left-[23.96%] right-[72.69%] top-[42.81%] bottom-[51.47%] font-medium text-base leading-[22px] text-black no-underline cursor-pointer transition-colors duration-300 hover:text-gray-500 max-[480px]:left-[6.13%] max-[480px]:top-[42.29%] max-[480px]:text-[16px]"
        >
          Service
        </a>
        <a
          href="#recruit"
          className="absolute left-[23.96%] right-[72.8%] top-[55.02%] bottom-[39.26%] font-medium text-base leading-[22px] text-black no-underline cursor-pointer transition-colors duration-300 hover:text-gray-500 max-[480px]:left-[6.13%] max-[480px]:top-[49.79%] max-[480px]:text-[16px]"
        >
          Recruit
        </a>
        <a
          href="#contact"
          className="absolute left-[33.51%] right-[62.79%] top-[30.61%] bottom-[63.68%] font-medium text-base leading-[22px] text-black no-underline cursor-pointer transition-colors duration-300 hover:text-gray-500 max-[480px]:left-[50.13%] max-[480px]:top-[34.79%] max-[480px]:text-[16px]"
        >
          Contact
        </a>
        <a
          href="#news"
          className="absolute left-[33.51%] right-[64%] top-[42.82%] bottom-[51.47%] font-medium text-base leading-[22px] text-black no-underline cursor-pointer transition-colors duration-300 hover:text-gray-500 max-[480px]:left-[50.13%] max-[480px]:top-[42.29%] max-[480px]:text-[16px]"
        >
          News
        </a>

        {/* Social Links - Individual positioning */}
        <a
          href="#"
          className="absolute left-[71.47%] right-[27.84%] top-[30.61%] bottom-[63.68%] font-medium text-base leading-[22px] text-black no-underline cursor-pointer transition-colors duration-300 hover:text-gray-500 max-[480px]:left-[6.13%] max-[480px]:top-[65.62%] max-[480px]:text-[13px]"
        >
          X
        </a>
        <a
          href="#"
          className="absolute left-[71.47%] right-[23.96%] top-[42.81%] bottom-[51.47%] font-medium text-base leading-[22px] text-black no-underline cursor-pointer transition-colors duration-300 hover:text-gray-500 max-[480px]:left-[6.13%] max-[480px]:top-[72.29%] max-[480px]:text-[13px]"
        >
          Instagram
        </a>
        <a
          href="#"
          className="absolute left-[71.47%] right-[26.45%] top-[55.02%] bottom-[39.26%] font-medium text-base leading-[22px] text-black no-underline cursor-pointer transition-colors duration-300 hover:text-gray-500 max-[480px]:left-[6.13%] max-[480px]:top-[78.96%] max-[480px]:text-[13px]"
        >
          LINE
        </a>

        {/* Page Top Button - PC版でSNSリンクの右側に配置 */}
        <HoverButton
          onClick={handleScrollToTop}
          normalBg="#000000"
          normalText="#ffffff"
          hoverBg="#ffffff"
          hoverText="#000000"
          className="absolute w-[120px] h-[40px] right-[9.49%] top-[28%] text-sm leading-[26px] font-medium rounded-[35px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hidden md:block"
        >
          Pagetop
        </HoverButton>
        {/* Page Top Button - モバイル版 */}
        <HoverButton
          onClick={handleScrollToTop}
          normalBg="#000000"
          normalText="#ffffff"
          hoverBg="#ffffff"
          hoverText="#000000"
          className="absolute w-[100px] h-[36px] right-[20px] bottom-[20px] text-xs leading-[26px] font-medium rounded-[35px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:hidden max-[480px]:hidden"
        >
          Pagetop
        </HoverButton>
      </div>
    </footer>
  );
};

export default Footer;
