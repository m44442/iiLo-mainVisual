"use client";

import React, { useState, useEffect } from "react";
import Footer from "./layout/Footer";
import ContactSectionTailwind from "./sections/ContactSectionTailwind";
import HeroSection from "./layout/HeroSection";
import MissionSectionWithAnimation from "./MissionSectionWithAnimation";
import ServiceSectionDiiLo from "./sections/ServiceSectionDiiLo";
import RecruitSectionNew from "./sections/RecruitSectionNew";
import CompanySectionNew from "./sections/CompanySectionNew";
import ScrollWaveBars from "./ScrollWaveBars";
import NewsSectionNew from "./sections/NewsSectionNew";
import MissionModal from "./modals/MissionModal";
import ContactModal from "./modals/ContactModal";
import NewsModal from "./modals/NewsModal";
import NewsDetailModal from "./modals/NewsDetailModal";
import HeaderTailwind from "./layout/HeaderTailwind";

const IiLoCorporateSite = () => {
  const [missionModalOpen, setMissionModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [newsDetailModalOpen, setNewsDetailModalOpen] = useState(false);
  const [selectedNewsItem, setSelectedNewsItem] = useState<{ id: number; date: string; title: string } | null>(null);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Mock news data (same as in NewsModal)
  const newsData = [
    {
      id: 1,
      date: "YYYY.MM.DD",
      title: "歯科クリニック特化LINEマーケティングSaaS「DIILo」をリリースいたしました",
    },
    {
      id: 2,
      date: "YYYY.MM.DD",
      title: "コーポレートサイト公開しました",
    },
    {
      id: 3,
      date: "YYYY.MM.DD",
      title: "タイトル",
    },
    {
      id: 4,
      date: "YYYY.MM.DD",
      title: "タイトルタイトル",
    },
    {
      id: 5,
      date: "YYYY.MM.DD",
      title: "タイトルタイトルタイトルタイトル",
    },
    {
      id: 6,
      date: "YYYY.MM.DD",
      title: "タイトル",
    },
    {
      id: 7,
      date: "YYYY.MM.DD",
      title: "タイトル",
    },
    {
      id: 8,
      date: "YYYY.MM.DD",
      title: "タイトルタイトルタイトルタイトルタイトル",
    },
    {
      id: 9,
      date: "YYYY.MM.DD",
      title: "タイトル",
    },
    {
      id: 10,
      date: "YYYY.MM.DD",
      title: "タイトル",
    },
  ];

  const switchToContactModal = () => {
    setMissionModalOpen(false);
    setContactModalOpen(true);
  };

  const handleNewsItemClick = (newsItem: { id: number; date: string; title: string }) => {
    const index = newsData.findIndex(item => item.id === newsItem.id);
    setCurrentNewsIndex(index);
    setSelectedNewsItem(newsItem);
    setNewsModalOpen(false);
    setNewsDetailModalOpen(true);
  };

  const handleBackToNewsList = () => {
    setNewsDetailModalOpen(false);
    setNewsModalOpen(true);
  };

  const handlePrevNews = () => {
    if (currentNewsIndex > 0) {
      const newIndex = currentNewsIndex - 1;
      setCurrentNewsIndex(newIndex);
      setSelectedNewsItem(newsData[newIndex]);
    }
  };

  const handleNextNews = () => {
    if (currentNewsIndex < newsData.length - 1) {
      const newIndex = currentNewsIndex + 1;
      setCurrentNewsIndex(newIndex);
      setSelectedNewsItem(newsData[newIndex]);
    }
  };

  return (
    <>
      <ScrollWaveBars />
      <div className="tw min-h-screen text-black w-full font-sans leading-relaxed m-0 p-0">
      <HeaderTailwind onMissionClick={() => setMissionModalOpen(true)} />
      <HeroSection />
      <MissionSectionWithAnimation 
        onMissionMoreClick={() => {
          setMissionModalOpen(true);
        }}
      />
      <ServiceSectionDiiLo />
      <RecruitSectionNew />
      <ContactSectionTailwind />
      <CompanySectionNew />
      <NewsSectionNew onNewsMoreClick={() => setNewsModalOpen(true)} />
      <Footer />

      {/* Mission Modal */}
      <MissionModal
        isOpen={missionModalOpen}
        onClose={() => setMissionModalOpen(false)}
        onSwitchToContact={switchToContactModal}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* News Modal */}
      <NewsModal
        isOpen={newsModalOpen}
        onClose={() => setNewsModalOpen(false)}
        onNewsItemClick={handleNewsItemClick}
      />

      {/* News Detail Modal */}
      <NewsDetailModal
        isOpen={newsDetailModalOpen}
        onClose={() => setNewsDetailModalOpen(false)}
        onBackToNewsList={handleBackToNewsList}
        onPrevNews={handlePrevNews}
        onNextNews={handleNextNews}
        newsItem={selectedNewsItem}
        hasPrevNews={currentNewsIndex > 0}
        hasNextNews={currentNewsIndex < newsData.length - 1}
      />

      </div>
    </>
  );
};

export default IiLoCorporateSite;
