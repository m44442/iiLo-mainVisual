"use client";

import React, { useEffect } from "react";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";
import MissionSectionWithAnimation from "./MissionSectionWithAnimation";
import ServiceSectionDiiLo from "./ServiceSectionDiiLo";
import MissionStatement from "./MissionStatement";
import ContactSectionTailwind from "./ContactSectionTailwind";

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MissionModal: React.FC<MissionModalProps> = ({ isOpen, onClose }) => {
  // Hide header and disable body scroll when modal is open
  useEffect(() => {
    console.log("🔥 MissionModal useEffect triggered, isOpen:", isOpen);
    
    const header = document.querySelector("header");
    const navHeader = document.querySelector("nav");
    const body = document.body;

    console.log("🔍 Elements found:", {
      header: !!header,
      navHeader: !!navHeader,
      headerDisplay: header ? (header as HTMLElement).style.display : 'not found',
      bodyOverflow: body.style.overflow
    });

    if (isOpen) {
      console.log("📖 Opening modal - hiding elements");
      // Hide header elements
      if (header) {
        (header as HTMLElement).style.display = "none";
        console.log("✅ Header hidden");
      } else {
        console.log("❌ Header not found!");
      }
      if (navHeader) {
        (navHeader as HTMLElement).style.display = "none";
        console.log("✅ Nav hidden");
      } else {
        console.log("❌ Nav not found!");
      }
      // Disable body scroll
      body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      console.log("✅ Body scroll disabled");
    } else {
      console.log("📕 Closing modal - showing elements");
      // Show header elements
      if (header) {
        header.removeAttribute('style');
        console.log("✅ Header shown");
      }
      if (navHeader) {
        navHeader.removeAttribute('style');
        console.log("✅ Nav shown");
      }
      // Enable body scroll
      body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      console.log("✅ Body scroll enabled");
    }

    // Cleanup on unmount
    return () => {
      if (header) {
        header.removeAttribute('style');
      }
      if (navHeader) {
        navHeader.removeAttribute('style');
      }
      body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen]);

  const springApi = useSpringRef();
  const overlaySpring = useSpring({
    ref: springApi,
    config: config.gentle,
    from: { opacity: 0 },
    to: { opacity: isOpen ? 1 : 0 },
  });

  const transApi = useSpringRef();
  const contentTransition = useTransition(isOpen, {
    ref: transApi,
    from: { opacity: 0, scale: 0.8, transform: "translateY(40px)" },
    enter: { opacity: 1, scale: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, scale: 0.8, transform: "translateY(40px)" },
    config: config.wobbly,
  });

  useChain(isOpen ? [springApi, transApi] : [transApi, springApi], [
    0,
    isOpen ? 0.15 : 0.6,
  ]);

  if (!isOpen) return null;

  return (
    <animated.div
      style={overlaySpring}
      className="tw fixed inset-0 bg-black/60 flex justify-center items-center z-[999999] p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      {contentTransition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className="tw bg-[#E7E7E7] rounded-2xl w-full max-w-[1200px] max-h-[90vh] overflow-y-auto relative shadow-[0_25px_50px_rgba(0,0,0,0.25)] border border-white/20 font-sans z-[1000000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 閉じるボタン */}
            <button
              type="button"
              className="tw absolute top-6 right-6 bg-black/5 border-none text-xl cursor-pointer z-[1000000] text-[#666] w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 backdrop-blur-[10px] hover:bg-black/10 hover:text-[#333] hover:scale-105 active:scale-95"
              onClick={onClose}
            >
              ×
            </button>

            {/* モーダルコンテンツ */}
            <div className="tw p-0 text-black">
              {/* Page Title Section */}
              <div className="tw pt-[60px] pb-10">
                <div className="tw flex items-center ml-[60px] mb-[30px]">
                  <div className="tw w-2 h-2 bg-black rounded-full mr-[15px]"></div>
                  <h1 className="tw font-[GeneralSansVariable,system-ui,sans-serif] font-medium text-[40px] leading-[45px] text-black m-0">
                    Mission
                  </h1>
                </div>
                <div className="tw w-full h-px bg-black m-0"></div>
              </div>

              {/* MissionSectionWithAnimation - Moreボタンなし */}
              <MissionSectionWithAnimation showMoreButton={false} />

              {/* ServiceSectionDiiLo - モーダル用レイアウト */}
              <ServiceSectionDiiLo isInModal={true} />

              {/* MissionStatement */}
              <MissionStatement />

              {/* ContactSectionTailwind */}
              <ContactSectionTailwind />
            </div>
          </animated.div>
        ) : null
      )}
    </animated.div>
  );
};

export default MissionModal;