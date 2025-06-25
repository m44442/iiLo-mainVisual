"use client";

import React from "react";
import HeaderTailwind from "../components/HeaderTailwind";
import Footer from "../components/Footer";
import ContactSectionTailwind from "../components/ContactSectionTailwind";
import MissionStatement from "../components/MissionStatement";
import MissionSectionWithAnimation from "../components/MissionSectionWithAnimation";
import ServiceSectionDiiLo from "../components/ServiceSectionDiiLo";
const MissionPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <HeaderTailwind />
      <div className="pt-[150px] mb-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 ml-[140px]">
          ・Mission
        </h1>
        <div className="w-screen h-px bg-gray-800 mt-8 relative left-1/2 transform -translate-x-1/2"></div>
      </div>
      <MissionSectionWithAnimation />
      <ServiceSectionDiiLo />
      <MissionStatement />
      <ContactSectionTailwind />
      <Footer />
    </div>
  );
};

export default MissionPage;
