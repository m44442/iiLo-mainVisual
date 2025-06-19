'use client'

import React from 'react';
import styles from './IiLoCorporateSite.module.css';
import Footer from './Footer';
import ContactSection from './ContactSection';
import HeroSection from './HeroSection';
import MissionSectionWithAnimation from './MissionSectionWithAnimation';
import ServiceSectionDiiLo from './ServiceSectionDiiLo';
import RecruitSectionNew from './RecruitSectionNew';
import CompanySectionNew from './CompanySectionNew';
import NewsSectionNew from './NewsSectionNew';

const IiLoCorporateSite = () => {
  return (
    <div className={styles.container}>
      <HeroSection />
      <MissionSectionWithAnimation />
      <ServiceSectionDiiLo />
      <RecruitSectionNew />
      <ContactSection />
      <CompanySectionNew />
      <NewsSectionNew />
      <Footer />
    </div>
  );
};

export default IiLoCorporateSite;