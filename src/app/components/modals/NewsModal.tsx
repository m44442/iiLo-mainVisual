"use client";

import React, { useEffect, useState } from "react";
import { useScrollLock } from "../../hooks/useScrollLock";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";

interface NewsItem {
  id: number;
  date: string;
  category: string;
  title: string;
  summary?: string;
}

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewsItemClick: (newsItem: { id: number; date: string; title: string }) => void;
}

const mockNewsData: NewsItem[] = [
  {
    id: 1,
    date: "YYYY.MM.DD",
    category: "",
    title: "歯科クリニック特化LINEマーケティングSaaS「DIILo」をリリースいたしました",
  },
  {
    id: 2,
    date: "YYYY.MM.DD",
    category: "",
    title: "コーポレートサイト公開しました",
  },
  {
    id: 3,
    date: "YYYY.MM.DD",
    category: "",
    title: "タイトル",
  },
  {
    id: 4,
    date: "YYYY.MM.DD",
    category: "",
    title: "タイトルタイトル",
  },
  {
    id: 5,
    date: "YYYY.MM.DD",
    category: "",
    title: "タイトルタイトルタイトルタイトル",
  },
  {
    id: 6,
    date: "YYYY.MM.DD",
    category: "",
    title: "タイトル",
  },
  {
    id: 7,
    date: "YYYY.MM.DD",
    category: "",
    title: "タイトル",
  },
  {
    id: 8,
    date: "YYYY.MM.DD",
    category: "",
    title: "タイトルタイトルタイトルタイトルタイトル",
  },
  {
    id: 9,
    date: "YYYY.MM.DD",
    category: "",
    title: "タイトル",
  },
  {
    id: 10,
    date: "YYYY.MM.DD",
    category: "",
    title: "タイトル",
  },
];

const ITEMS_PER_PAGE = 10;

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose, onNewsItemClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
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

  const totalPages = Math.ceil(mockNewsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = mockNewsData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


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
              {/* Page Title Section */}
              <div className="tw pt-[60px] pb-10 max-[480px]:pt-8 max-[480px]:pb-6">
                <div className="tw flex items-center ml-[60px] mb-[30px] max-[480px]:ml-6 max-[480px]:mb-6">
                  <div className="tw w-2 h-2 bg-black rounded-full mr-[15px] max-[480px]:w-1.5 max-[480px]:h-1.5 max-[480px]:mr-3"></div>
                  <h1 className="tw font-[GeneralSansVariable,system-ui,sans-serif] font-medium text-[40px] leading-[45px] text-black m-0 max-[480px]:text-[28px] max-[480px]:leading-[32px]">
                    News
                  </h1>
                </div>
                <div className="tw w-full h-px bg-black m-0"></div>
              </div>

              {/* News Content Section */}
              <div className="tw max-w-[1100px] mx-auto px-[60px] pt-[60px] pb-[60px] max-[480px]:px-6 max-[480px]:pt-8 max-[480px]:pb-6">
                      <div className="max-w-[900px] mx-auto max-[480px]:max-w-full overflow-hidden">
                        <div className="w-full">
                          {/* Top border */}
                          <div className="h-px bg-[#898989]"></div>
                          
                          {currentItems.map((item, index) => (
                            <div
                              key={item.id}
                              className={`cursor-pointer py-8 max-[480px]:py-6 ${
                                index < currentItems.length - 1 ? 'border-b border-[#898989]' : ''
                              }`}
                              onClick={() => onNewsItemClick({ id: item.id, date: item.date, title: item.title })}
                            >
                              <div className="text-[#898989] font-normal text-[13px] leading-[22px] font-['Noto_Sans_JP'] mb-2 max-[480px]:text-[13px] max-[480px]:leading-[20px] max-[480px]:mb-1 max-[480px]:mr-16">
                                {item.date}
                              </div>
                              <div className="text-black font-normal text-[15px] leading-[24px] font-['Noto_Sans_JP'] max-[480px]:text-[15px] max-[480px]:leading-[22px] break-words word-wrap break-word max-[480px]:mr-16">
                                {item.title}
                              </div>
                            </div>
                          ))}
                          
                          {/* Bottom border */}
                          <div className="h-px bg-[#898989]"></div>

                      {/* Custom Pagination */}
                      <div className="mt-8 flex justify-center max-[480px]:mt-6">
                        <div className="flex items-center gap-3 max-[480px]:gap-2">
                          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(
                            (page) => (
                              <button
                                key={page}
                                type="button"
                                onClick={() => handlePageChange(page)}
                                className={`w-[35px] h-[35px] rounded-full border border-black text-[15px] font-['ABeeZee'] transition-colors max-[480px]:w-[30px] max-[480px]:h-[30px] max-[480px]:text-[13px] ${
                                  currentPage === page
                                    ? "bg-black text-white"
                                    : "bg-white text-black hover:bg-gray-100"
                                }`}
                              >
                                {page}
                              </button>
                            )
                          )}
                          {totalPages > 3 && (
                            <>
                              <span className="text-black font-['Noto_Sans_JP'] text-[13px] px-2 max-[480px]:text-[11px] max-[480px]:px-1">
                                …
                              </span>
                              <button
                                type="button"
                                onClick={() => handlePageChange(totalPages)}
                                className={`w-[35px] h-[35px] rounded-full border border-black text-[15px] font-['ABeeZee'] transition-colors max-[480px]:w-[30px] max-[480px]:h-[30px] max-[480px]:text-[13px] ${
                                  currentPage === totalPages
                                    ? "bg-black text-white"
                                    : "bg-white text-black hover:bg-gray-100"
                                }`}
                              >
                                {totalPages}
                              </button>
                            </>
                          )}
                        </div>
                        </div>
                      </div>
                </div>
              </div>
            </div>
          </animated.div>
        ) : null
      )}
    </animated.div>
  );
};

export default NewsModal;