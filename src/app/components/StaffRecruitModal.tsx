'use client'

import React from 'react';
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web';
import styles from './RecruitModal.module.css';
import ContactSection from './ContactSection';

interface StaffRecruitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StaffRecruitModal = ({ isOpen, onClose }: StaffRecruitModalProps) => {
  const springApi = useSpringRef();
  const overlaySpring = useSpring({
    ref: springApi,
    config: config.gentle,
    from: { opacity: 0 },
    to: { opacity: isOpen ? 1 : 0 },
  });

  const transApi = useSpringRef();
  const contentTransition = useTransition(isOpen, {
    ref: transApi,
    from: { opacity: 0, scale: 0.8, transform: 'translateY(40px)' },
    enter: { opacity: 1, scale: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, scale: 0.8, transform: 'translateY(40px)' },
    config: config.wobbly,
  });

  useChain(isOpen ? [springApi, transApi] : [transApi, springApi], [
    0,
    isOpen ? 0.15 : 0.6,
  ]);

  if (!isOpen) return null;

  return (
    <animated.div 
      style={overlaySpring} 
      className={styles.modalOverlay} 
      onClick={onClose}
    >
      {contentTransition((style, item) =>
        item ? (
          <animated.div 
            style={style}
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
          >
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
        <div className={styles.modalInner}>
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
            <p className={styles.jobType}>アルバイト採用</p>
            <h2 className={styles.jobTitle}>DIILoスタッフ</h2>
            <p className={styles.jobDescription}>
              自社サービスの運用を担当していただきます。
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
                  <p>・サービス運営管理</p>
                  <p>・顧客サポート</p>
                </div>
              </div>

              <div className={styles.sectionLine}></div>

              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>
                  <span>仕事の魅力</span>
                </div>
                <div className={styles.detailContent}>
                  <p className={styles.fadedText}>・成長真っ只中のBtoB SaaSの自社開発に幅広く関われる</p>
                  <p className={styles.fadedText}>・GoやReactといったモダンな技術スタックを使って開発できる</p>
                </div>
              </div>

              <div className={styles.sectionLine}></div>

              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>
                  <span>応募資格（必須）</span>
                </div>
                <div className={styles.detailContent}>
                  <p className={styles.fadedText}>・RDBMSを用いたバックエンド開発経験1年以上</p>
                  <p className={styles.fadedText}>・Reactを用いたフロントエンド開発経験1年以上</p>
                  <p className={styles.fadedText}>・IaaSを用いたインフラ開発やサービス運用経験1年以上</p>
                </div>
              </div>

              <div className={styles.sectionLine}></div>

              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>
                  <span>応募資格（歓迎）</span>
                </div>
                <div className={styles.detailContent}>
                  <p className={styles.fadedText}>・自社SaaSの開発や運用の経験</p>
                  <p className={styles.fadedText}>・Goを用いたバックエンド開発経験</p>
                  <p className={styles.fadedText}>・TypeScriptを用いたフロントエンド開発経験</p>
                  <p className={styles.fadedText}>・AWSを用いたインフラ開発やサービス運用経験</p>
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

              <div className={styles.sectionLine}></div>

              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>
                  <span>勤務地</span>
                </div>
                <div className={styles.detailContent}>
                  <p>勤務地記載</p>
                </div>
              </div>

              <div className={styles.sectionLine}></div>

              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>
                  <span>雇用形態</span>
                </div>
                <div className={styles.detailContent}>
                  <p>アルバイト</p>
                </div>
              </div>

              <div className={styles.sectionLine}></div>

              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>
                  <span>勤務時間</span>
                </div>
                <div className={styles.detailContent}>
                  <p>9:30〜18:30（休憩60分）</p>
                </div>
              </div>

              <div className={styles.sectionLine}></div>

              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>
                  <span>休日・休暇</span>
                </div>
                <div className={styles.detailContent}>
                  <p>土曜、日曜、祝日</p>
                </div>
              </div>

              <div className={styles.sectionLine}></div>
            </div>
          </div>

            {/* Contact Section */}
            <ContactSection />
          </div>
        </animated.div>
        ) : null
      )}
    </animated.div>
  );
};

export default StaffRecruitModal;