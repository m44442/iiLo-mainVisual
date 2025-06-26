"use client";

import React, { useState } from "react";
import Footer from "./Footer";
import ContactSectionTailwind from "./ContactSectionTailwind";
import HeroSection from "./HeroSection";
import MissionSectionWithAnimation from "./MissionSectionWithAnimation";
import ServiceSectionDiiLo from "./ServiceSectionDiiLo";
import RecruitSectionNew from "./RecruitSectionNew";
import CompanySectionNew from "./CompanySectionNew";
import NewsSectionNew from "./NewsSectionNew";
import MissionModal from "./MissionModal";
import HeaderTailwind from "./HeaderTailwind";

const IiLoCorporateSite = () => {
  const [missionModalOpen, setMissionModalOpen] = useState(false);

  console.log("🏠 IiLoCorporateSite render, missionModalOpen:", missionModalOpen);

  return (
    <div className="tw min-h-screen text-black w-full font-sans leading-relaxed m-0 p-0">
      <HeaderTailwind />
      <HeroSection />
      <MissionSectionWithAnimation 
        onMissionMoreClick={() => {
          console.log("🚀 More button clicked, opening MissionModal");
          setMissionModalOpen(true);
        }}
      />
      <ServiceSectionDiiLo />
      <RecruitSectionNew />
      <ContactSectionTailwind />
      <CompanySectionNew />
      <NewsSectionNew />
      <Footer />

      {/* Mission Modal */}
      <MissionModal
        isOpen={missionModalOpen}
        onClose={() => setMissionModalOpen(false)}
      />

    </div>
  );
};

export default IiLoCorporateSite;
