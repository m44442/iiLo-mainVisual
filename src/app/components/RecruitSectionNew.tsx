'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './IiLoCorporateSite.module.css';

const RecruitSectionNew = () => {
  const router = useRouter();

  const handleEngineerRecruitClick = () => {
    router.push('/recruit/engineer');
  };

  const handleStaffRecruitClick = () => {
    router.push('/recruit/staff');
  };

  return (
    <section id="recruit" className={styles.section}>
      <div className={styles.container1024}>
        <h2 className={styles.sectionTitleWhiteBg}>
          Recruit
        </h2>
        
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
  );
};

export default RecruitSectionNew;