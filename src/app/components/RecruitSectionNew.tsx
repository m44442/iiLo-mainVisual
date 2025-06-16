'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './IiLoCorporateSite.module.css';
import EngineerRecruitModal from './EngineerRecruitModal';
import StaffRecruitModal from './StaffRecruitModal';

const RecruitSectionNew = () => {
  const router = useRouter();
  const [engineerModalOpen, setEngineerModalOpen] = useState(false);
  const [staffModalOpen, setStaffModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'modal' | 'page'>('modal'); // Default to modal

  const handleEngineerRecruitClick = () => {
    if (viewMode === 'modal') {
      setEngineerModalOpen(true);
    } else {
      router.push('/recruit/engineer');
    }
  };

  const handleStaffRecruitClick = () => {
    if (viewMode === 'modal') {
      setStaffModalOpen(true);
    } else {
      router.push('/recruit/staff');
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'modal' ? 'page' : 'modal');
  };

  return (
    <>
      <section id="recruit" className={styles.section}>
        <div className={styles.container1024}>
          <h2 className={styles.sectionTitleWhiteBg}>
            Recruit
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <button 
              onClick={toggleViewMode}
              style={{
                padding: '8px 16px',
                background: viewMode === 'modal' ? '#333' : '#f5f5f5',
                color: viewMode === 'modal' ? 'white' : '#333',
                border: '1px solid #333',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease'
              }}
            >
              {viewMode === 'modal' ? 'モーダル表示' : 'ページ表示'}
            </button>
          </div>
        
        <div className={styles.recruitDescription}>
          IILoは、医療やサービス業など"現場で働く人たち"の手間と課題をテクノロジーで解決する会社です。<br />
        第一弾プロダクト「DIILo」は、歯科クリニック向けのLINEマーケティングSaaS。<br />
        予約・保険証・決済・配信すべてを1つの仕組みでつなげ、現場を驚くほどシンプルにします。<br />
        今後も、AIとWebの力で「現場を支えるプロダクト」を多業界に展開予定。<br />
        スタートアップの熱量の中で、業界の課題を根本から変えてみたい。<br />
        そんな人を、私たちは探しています。<br />  
        </div>
        
        <div className={styles.recruitGrid}>
          <div className={styles.recruitCard}>
            <h3 className={styles.recruitTitle}>
             正社員・インターン採用
            </h3>
            <p className={styles.recruitCardDescription}>
              エンジニア
            </p>
            <button 
              className={styles.recruitButton}
              onClick={handleEngineerRecruitClick}
            >
              more
            </button>
          </div>
          
          <div className={styles.recruitCard}>
            <h3 className={styles.recruitTitle}>
              アルバイト採用
            </h3>
            <p className={styles.recruitCardDescription}>
              DIILOスタッフ
            </p>
            <button 
              className={styles.recruitButton}
              onClick={handleStaffRecruitClick}
            >
              more
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Modals */}
    <EngineerRecruitModal 
      isOpen={engineerModalOpen} 
      onClose={() => setEngineerModalOpen(false)} 
    />
    <StaffRecruitModal 
      isOpen={staffModalOpen} 
      onClose={() => setStaffModalOpen(false)} 
    />
  </>
  );
};

export default RecruitSectionNew;