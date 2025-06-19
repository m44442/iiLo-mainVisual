"use client";

import React from "react";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import MissionStatement from "../components/MissionStatement";
import MissionSectionWithAnimation from "../components/MissionSectionWithAnimation";
import ServiceSectionNew from "../components/ServiceSectionNew";
const MissionPage = () => {
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <div style={{ 
        paddingTop: '150px',
        marginBottom: '20px'
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '30px',
          marginLeft: '140px'
        }}>
          ・Mission
        </h1>
        <div style={{
          width: '100vw',
          height: '1px',
          backgroundColor: '#333',
          margin: '30px 0 0 0',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)'
        }}></div>
      </div>
      <MissionSectionWithAnimation />
      <ServiceSectionNew />
      <MissionStatement />
      <ContactSection />

      <Footer />
    </div>
  );
};

export default MissionPage;
