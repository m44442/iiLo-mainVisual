'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './EngineerRecruitPage.module.css';
import ContactSection from './ContactSection';

const EngineerRecruitPage = () => {
  const router = useRouter();

  const handleStaffRecruitClick = () => {
    router.push('/recruit/staff');
  };

  return (
    <div className={styles.container}>
      {/* Page Title Section */}
      <div className={styles.titleSection}>
        <div className={styles.titleContainer}>
          <div className={styles.titleDot}></div>
          <h1 className={styles.title}>Recruit</h1>
        </div>
        <div className={styles.titleLine}></div>
      </div>

      {/* Job Header */}
      <div className={styles.jobHeader}>
        <p className={styles.jobType}>正社員・インターン採用</p>
        <h2 className={styles.jobTitle}>エンジニア</h2>
        <p className={styles.jobDescription}>
          自社サービスのプロダクトの開発、運用を担当していただきます。
        </p>
      </div>

      {/* Job Details Section */}
      <div className={styles.jobDetails}>
        {/* 業務概要 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>業務概要</h3>
          <div className={styles.sectionLine}></div>
          
          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>
              <span>業務内容</span>
            </div>
            <div className={styles.detailContent}>
              <p>・自社SaaSの開発</p>
              <p>・TypeScript（Reactなど）を用いたフロントエンド開発</p>
              <p>・Go（Gin、GORMなど）、MySQLを用いたバックエンド開発</p>
              <p>・AWS（ECS、Auroraなど）を用いたインフラ開発やサービス運用</p>
              <p>・Dockerを用いた開発環境構築</p>
            </div>
          </div>

          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>
              <span>仕事の魅力</span>
            </div>
            <div className={styles.detailContent}>
              <p>・成長真っ只中のBtoB SaaSの自社開発に幅広く関われる</p>
              <p>・GoやReactといったモダンな技術スタックを使って開発できる</p>
            </div>
          </div>

          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>
              <span>応募資格（必須）</span>
            </div>
            <div className={styles.detailContent}>
              <p>・RDBMSを用いたバックエンド開発経験1年以上</p>
              <p>・Reactを用いたフロントエンド開発経験1年以上</p>
              <p>・IaaSを用いたインフラ開発やサービス運用経験1年以上</p>
            </div>
          </div>

          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>
              <span>応募資格（歓迎）</span>
            </div>
            <div className={styles.detailContent}>
              <p>・自社SaaSの開発や運用の経験</p>
              <p>・Goを用いたバックエンド開発経験</p>
              <p>・TypeScriptを用いたフロントエンド開発経験</p>
              <p>・AWSを用いたインフラ開発やサービス運用経験</p>
            </div>
          </div>
        </div>

        {/* 募集情報 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>募集情報</h3>
          <div className={styles.sectionLine}></div>

          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>
              <span>選考フロー</span>
            </div>
            <div className={styles.detailContent}>
              <p>選考フローは下記を予定しております。</p>
              <p>状況に応じて変更となる可能性がございますのでご了承ください。</p>
              <br />
              <p>・書類選考</p>
              <p>・面接（2回）</p>
              <p>・採用</p>
            </div>
          </div>

          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>
              <span>勤務地</span>
            </div>
            <div className={styles.detailContent}>
              <p>勤務地記載</p>
            </div>
          </div>

          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>
              <span>雇用形態</span>
            </div>
            <div className={styles.detailContent}>
              <p>正社員</p>
              <p>インターン</p>
            </div>
          </div>

          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>
              <span>勤務時間</span>
            </div>
            <div className={styles.detailContent}>
              <p>9:30〜18:30（休憩60分）</p>
            </div>
          </div>

          <div className={styles.detailRow}>
            <div className={styles.detailLabel}>
              <span>休日・休暇</span>
            </div>
            <div className={styles.detailContent}>
              <p>土曜、日曜、祝日</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Others Section */}
      <div className={styles.othersSection}>
        <h3 className={styles.othersTitle}>Others</h3>
        <div className={styles.othersCard}>
          <div className={styles.othersContent}>
            <h4 className={styles.othersCardSubtitle}>アルバイト採用</h4>
            <h4 className={styles.othersCardTitle}>DIILoスタッフ</h4>
            <button 
              className={styles.othersButton}
              onClick={handleStaffRecruitClick}
            >
              More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineerRecruitPage;