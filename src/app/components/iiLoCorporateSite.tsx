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
import HeaderTailwind from "./layout/HeaderTailwind";

const IiLoCorporateSite = () => {
  const [missionModalOpen, setMissionModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const switchToContactModal = () => {
    setMissionModalOpen(false);
    setContactModalOpen(true);
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
      <NewsSectionNew />
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

      </div>
    </>
  );
};

export default IiLoCorporateSite;
