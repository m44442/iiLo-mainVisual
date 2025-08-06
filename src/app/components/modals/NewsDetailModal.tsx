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

interface NewsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToNewsList: () => void;
  onPrevNews: () => void;
  onNextNews: () => void;
  newsItem: {
    id: number;
    date: string;
    title: string;
  } | null;
  hasPrevNews: boolean;
  hasNextNews: boolean;
}

const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  onBackToNewsList,
  onPrevNews,
  onNextNews,
  newsItem,
  hasPrevNews,
  hasNextNews
}) => {
  useScrollLock(isOpen);

  useEffect(() => {
    const header = document.querySelector("header");
    const navHeader = document.querySelector("nav");
    
    if (isOpen) {
      if (header) header.style.display = "none";
      if (navHeader) navHeader.style.display = "none";
    } else {
      if (header) header.style.display = "";
      if (navHeader) navHeader.style.display = "";
    }

    return () => {
      if (header) header.style.display = "";
      if (navHeader) navHeader.style.display = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

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

  const getDetailContent = () => {
    if (!newsItem) return null;

    if (newsItem.title === "歯科クリニック特化LINEマーケティングSaaS「DIILo」をリリースいたしました") {
      return {
        image: true,
        content: [
          "お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。",
        "お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。",
        "見出し",
        "お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。"
        ]
      };
    }

    return {
      image: false,
      content: [
        "お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。",
        "お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。",
        "見出し",
        "お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。お知らせの詳細文章が入ります。"
      ]
    };
  };

  const detailContent = getDetailContent();

  if (!isOpen) return null;

  return (
    <animated.div
      style={overlaySpring}
      className="tw fixed inset-0 bg-black/60 flex justify-center items-center z-[9999999] p-5 backdrop-blur-sm max-[480px]:p-0"
      onClick={onClose}
    >
      {contentTransition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className="tw bg-[#E7E7E7] rounded-2xl w-full max-w-[1200px] max-h-[90vh] overflow-y-auto relative shadow-[0_25px_50px_rgba(0,0,0,0.25)] border border-white/20 font-sans z-[10000000] max-[480px]:rounded-none max-[480px]:max-w-none max-[480px]:w-screen max-[480px]:h-screen max-[480px]:max-h-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="tw absolute top-6 right-6 bg-black/5 border-none text-xl cursor-pointer z-[10000001] text-[#666] w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 backdrop-blur-[10px] hover:bg-black/10 hover:text-[#333] hover:scale-105 active:scale-95 max-[480px]:top-4 max-[480px]:right-4 max-[480px]:w-8 max-[480px]:h-8 max-[480px]:text-lg"
              onClick={onClose}
            >
              ×
            </button>

            <div className="tw p-0 text-black">
              {/* Header with Date and Title */}
              <div className="tw pt-[60px] pb-10 max-[480px]:pt-8 max-[480px]:pb-6">
                <div className="tw ml-[60px] mb-[30px] max-[480px]:ml-6 max-[480px]:mb-6">
                  {newsItem && (
                    <>
                      {/* Date */}
                      <div className="tw text-[#898989] font-normal text-[14px] leading-[24px] font-['Noto_Sans_JP'] mb-4 max-[480px]:text-[12px] max-[480px]:leading-[20px]">
                        {newsItem.date}
                      </div>

                      {/* Title */}
                      <h1 className="tw text-black font-medium text-[26px] leading-[32px] font-['Noto_Sans_JP'] m-0 max-[480px]:text-[20px] max-[480px]:leading-[24px]">
                        {newsItem.title}
                      </h1>
                    </>
                  )}
                </div>
                <div className="tw w-full h-px bg-black m-0"></div>
              </div>

              {/* News Detail Content */}
              <div className="tw max-w-[1100px] mx-auto px-[60px] pt-[120px] pb-[60px] max-[480px]:px-6 max-[480px]:pt-12 max-[480px]:pb-6">
                {newsItem && (
                  <>

                    {/* Image for DIILo news */}
                    {detailContent?.image && (
                      <div className="tw max-w-[900px] mx-auto mb-12 max-[480px]:mb-8">
                        <div className="tw w-full h-[545px] bg-black rounded-[12px] flex items-center justify-center max-[480px]:h-[300px]">
                          <div className="tw text-white text-center">
                            <div className="tw text-[24px] font-medium mb-4 max-[480px]:text-[20px]">画像</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="tw max-w-[900px] mx-auto space-y-6">
                      {detailContent?.content.map((paragraph, index) => (
                        <div key={index}>
                          {paragraph === "見出し" ? (
                            <h3 className="tw text-black font-normal text-[18px] leading-[27px] font-['Noto_Sans_JP'] mt-8 mb-4 max-[480px]:text-[16px] max-[480px]:mt-6 max-[480px]:mb-3">
                              見出し
                            </h3>
                          ) : (
                            <p className="tw text-black font-normal text-[16px] leading-[27px] font-['Noto_Sans_JP'] max-[480px]:text-[14px] max-[480px]:leading-[24px]">
                              {paragraph}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                  </>
                )}
              </div>

              {/* Bottom separator - outside padded area */}
              <div className="tw w-full mt-0 mb-8 max-[480px]:mb-6">
                <div className="tw w-full h-px bg-[#898989]"></div>
              </div>

              {/* Navigation buttons - back inside padded area */}
              <div className="tw max-w-[1100px] mx-auto px-[60px] pb-[60px] max-[480px]:px-6 max-[480px]:pb-6">
                <div className="tw max-w-[900px] mx-auto flex justify-between items-center">
                      <button
                        type="button"
                        onClick={onPrevNews}
                        disabled={!hasPrevNews}
                        className={`tw rounded-[25px] px-6 py-2 text-[13px] font-medium font-['General_Sans_Variable'] transition-colors max-[480px]:px-4 max-[480px]:py-2 ${
                          hasPrevNews 
                            ? "bg-black text-white hover:bg-gray-800" 
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={onBackToNewsList}
                        className="tw text-black text-[18px] font-medium font-['General_Sans_Variable'] underline transition-colors hover:text-gray-600 max-[480px]:text-[16px]"
                      >
                        News Index
                      </button>

                      <button
                        type="button"
                        onClick={onNextNews}
                        disabled={!hasNextNews}
                        className={`tw rounded-[25px] px-6 py-2 text-[13px] font-medium font-['General_Sans_Variable'] transition-colors max-[480px]:px-4 max-[480px]:py-2 ${
                          hasNextNews 
                            ? "bg-black text-white hover:bg-gray-800" 
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                </div>
            </div>
          </animated.div>
        ) : null
      )}
    </animated.div>
  );
};

export default NewsDetailModal;