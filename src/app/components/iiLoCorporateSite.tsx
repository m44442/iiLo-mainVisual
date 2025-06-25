"use client";

import React from "react";
// import styles from "./IiLoCorporateSite.module.css"; // Replaced with Tailwind classes
import Footer from "./Footer";
import ContactSectionTailwind from "./ContactSectionTailwind";
import HeroSection from "./HeroSection";
import MissionSectionWithAnimation from "./MissionSectionWithAnimation";
import ServiceSectionDiiLo from "./ServiceSectionDiiLo";
import RecruitSectionNew from "./RecruitSectionNew";
import CompanySectionNew from "./CompanySectionNew";
import NewsSectionNew from "./NewsSectionNew";

const IiLoCorporateSite = () => {
  return (
    <div className="tw min-h-screen text-black w-full font-sans leading-relaxed m-0 p-0">
      <HeroSection />
      <MissionSectionWithAnimation />
      <ServiceSectionDiiLo />
      <RecruitSectionNew />
      <ContactSectionTailwind />
      <CompanySectionNew />
      <NewsSectionNew />
      <Footer />
    </div>
  );
};

export default IiLoCorporateSite;
