'use client'

import React from 'react';
import styles from '../components/IiLoCorporateSite.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';
import MissionStatement from '../components/MissionStatement';
import MissionDetailPage from '../components/MissionDetailPage';
import ServiceSectionNew from '../components/ServiceSectionNew';

const MissionPage = () => {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Header />
      
      <div style={{ 
        paddingTop: '150px',
        marginBottom: '20px'
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '30px',
          marginLeft: '125px'
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
      
      <div style={{ marginTop: '-80px' }}>
        <MissionDetailPage />
      </div>
      <ServiceSectionNew />
      <MissionStatement />
      <ContactSection />
      
      <Footer />
    </div>
  );
};

export default MissionPage;