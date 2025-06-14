'use client'

import React from 'react';
import styles from './IiLoCorporateSite.module.css';
import Image from 'next/image';

const ServiceSection = () => {
  return (
    <section id="service" className={styles.serviceBlackSection}>
      <div className={styles.container1024}>
        <div className={styles.serviceContainer}>
          <h2 className={styles.serviceSectionTitle}>
            Service
          </h2>
      
          <div className={styles.serviceCard}>
            <div className={styles.serviceHeaderLeft}>
              <div className={styles.serviceSubtitle}>
                歯科クリニック特化<br />
                LINEマーケティングSaaS
              </div>
              
              <div className={styles.serviceTitleRow}>
                <Image
                  src="/images/IILo-DIILo_logo_DIILo_logo-b.png"
                  alt="DiiLo Logo"
                  width={160}
                  height={80}
                  className={styles.serviceLogo}
                />
                <span className={styles.serviceTitleSmall}>ディーロ</span>
              </div>
              
              <button className={styles.serviceButton}>
                More
              </button>
            </div>
            
            <div className={styles.serviceHeaderRight}>
              <div className={styles.deviceMockup}>
                <div className={styles.phoneContainer}>
                  <Image
                    src="/images/phone-mockup.png"
                    alt="Phone Mockup"
                    width={80}
                    height={160}
                    className={styles.phoneImage}
                  />
                </div>
                
                <div className={styles.laptopContainer}>
                  <Image
                    src="/images/laptop-mockup.png"
                    alt="Laptop Mockup"
                    width={500}
                    height={240}
                    className={styles.laptopImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.serviceDescription}>
          <p>DiiLoは、歯科クリニック向けに特化したLINE公式アカウント連携型のマーケティング＆患者管理ツールです。</p>
          <p>患者データ管理、予約、保険証のアップロード、患者アンケート、セグメント別のメッセージ配信、個別チャット。<br />さらにリッチメニューの自動生成や、Stripe決済機能までを一元管理。さらにそれらを用いたマーケティング情報の獲得。</p>
          <p>従来の汎用ツールと異なり、導入時点からテンプレートが整っており、専門知識不要で"その日から使える"設計に。</p>
          <p>「歯科現場への最適化」と、誰でも直感的に扱えるユーザーインターフェースを両立させた、次世代の歯科DXプラットフォームです。</p>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;