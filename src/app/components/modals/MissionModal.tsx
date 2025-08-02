"use client";

import React, { useEffect } from "react";
import { useScrollLock } from "../../hooks/useScrollLock";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";
import MissionSectionWithAnimation from "../MissionSectionWithAnimation";
import ServiceSectionDiiLo from "../sections/ServiceSectionDiiLo";
import MissionStatement from "../MissionStatement";
import ContactSectionTailwind from "../sections/ContactSectionTailwind";

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToContact?: () => void;
}

const MissionModal: React.FC<MissionModalProps> = ({ isOpen, onClose, onSwitchToContact }) => {

  // ヘッダーの表示/非表示制御
  useEffect(() => {
    const header = document.querySelector("header");
    const navHeader = document.querySelector("nav");

    if (isOpen) {
      // Hide header elements
      if (header) {
        (header as HTMLElement).style.display = "none";
      }
      if (navHeader) {
        (navHeader as HTMLElement).style.display = "none";
      }
    } else {
      // Show header elements
      if (header) {
        header.removeAttribute('style');
      }
      if (navHeader) {
        navHeader.removeAttribute('style');
      }
    }

    // Cleanup on unmount
    return () => {
      if (header) {
        header.removeAttribute('style');
      }
      if (navHeader) {
        navHeader.removeAttribute('style');
      }
    };
  }, [isOpen]);

  // モーダル表示時の背景スクロール制御
  useScrollLock(isOpen);

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
      className="tw fixed inset-0 bg-black/60 flex justify-center items-center z-[999999] p-5 backdrop-blur-sm max-[480px]:p-0"
      onClick={onClose}
    >
      {contentTransition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className="tw bg-[#E7E7E7] rounded-2xl w-full max-w-[1280px] max-h-[80vh] overflow-y-auto relative shadow-[0_25px_50px_rgba(0,0,0,0.25)] border border-white/20 font-sans z-[1000000] max-[480px]:rounded-none max-[480px]:max-w-none max-[480px]:w-screen max-[480px]:h-screen max-[480px]:max-h-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 閉じるボタン */}
            <button
              type="button"
              className="tw absolute top-6 right-6 bg-black/5 border-none text-xl cursor-pointer z-[1000000] text-[#666] w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 backdrop-blur-[10px] hover:bg-black/10 hover:text-[#333] hover:scale-105 active:scale-95 max-[480px]:top-4 max-[480px]:right-4 max-[480px]:w-8 max-[480px]:h-8 max-[480px]:text-lg"
              onClick={onClose}
            >
              ×
            </button>

            {/* モーダルコンテンツ */}
            <div className="tw p-0 text-black">
              {/* Page Title Section */}
              <div className="tw pt-[60px] pb-10 max-[480px]:pt-8 max-[480px]:pb-6">
                <div className="tw flex items-center ml-[60px] mb-[30px] max-[480px]:ml-4 max-[480px]:mb-4">
                  <div className="tw w-2 h-2 bg-black rounded-full mr-[15px] max-[480px]:w-1.5 max-[480px]:h-1.5 max-[480px]:mr-3"></div>
                  <h1 className="tw font-[GeneralSansVariable,system-ui,sans-serif] font-medium text-[40px] leading-[45px] text-black m-0 max-[480px]:text-[28px] max-[480px]:leading-[32px]">
                    Mission
                  </h1>
                </div>
                <div className="tw w-full h-px bg-black m-0"></div>
              </div>

              {/* MissionSectionWithAnimation - Moreボタンなし */}
              <MissionSectionWithAnimation showMoreButton={false} isInModal={true} />

              {/* ServiceSectionDiiLo - モーダル用レイアウト */}
              <ServiceSectionDiiLo isInModal={true} />

              {/* MissionStatement */}
              <MissionStatement />

              {/* ContactSectionTailwind */}
              <ContactSectionTailwind isInModal={true} onContactClick={onSwitchToContact} />
            </div>
          </animated.div>
        ) : null
      )}
    </animated.div>
  );
};

export default MissionModal;