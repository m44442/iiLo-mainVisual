'use client'

import React from 'react';
import styles from './IiLoCorporateSite.module.css';
import Header from './Header';
import Image from 'next/image';

const IiLoCorporateSite = () => {
  return (
    <div className={styles.container}>
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div>
          <p className={styles.heroText}>
            あなたの現場に、<br />
            もうひとつの頭脳を。
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className={styles.section}>
        <div className={styles.container1024}>
          {/* Header Section */}
          <div className={styles.missionHeader}>
            <div className={styles.missionLogoContainer}>
              <Image
                src="/images/IILo-DIILo_logo_IILo_logo-b.png"
                alt="IILO Logo"
                width={440}
                height={220}
                className={styles.missionLogo}
              />
              <div className={styles.missionTextContainer}>
                <div className={styles.missionSubtitle}>イーロの</div>
                <div className={styles.missionMainTitle}>Mission<span className={styles.missionTitleSmall}>は</span></div>
              </div>
            </div>
          </div>
          
          {/* Service Areas - 5 circles in horizontal layout */}
          <div className={styles.missionCircleContainer}>
            <div className={styles.missionCircle}>
              <div className={styles.missionCircleText}>AI</div>
            </div>
            <div className={styles.missionCircle}>
              <div className={styles.missionCircleText}>
                Web<br />アプリケーション<br />開発
              </div>
            </div>
            <div className={styles.missionCircle}>
              <div className={styles.missionCircleText}>
                クラウド<br />インフラ
              </div>
            </div>
            <div className={styles.missionCircle}>
              <div className={styles.missionCircleText}>
                セキュリティ・<br />プライバシー<br />設計
              </div>
            </div>
            <div className={styles.missionCircle}>
              <div className={styles.missionCircleText}>
                API・<br />外部連携<br />基盤
              </div>
            </div>
          </div>

          {/* Catchphrase Section */}
          <div className={styles.missionCatchphrase}>
            <h3 className={styles.missionCatchphraseText}>
              すべての業界に<br />
              "もうひとりのAIスタッフ"を提供する
            </h3>
          </div>
          
          {/* Description Section */}
          <div className={styles.missionDescription}>
            <p className={styles.missionParagraph}>
              IILo（イーロ）は、AI・Web技術・クラウドインフラを用いて、<br />
              業界特化型のスマートSaaSを開発・提供するテクノロジーカンパニーです。
            </p>
            
            <p className={styles.missionParagraph}>
              私たちは、現場で本当に使われるプロダクトにこだわり、<br />
              医療・教育・店舗業などの現場に寄り添ったプロダクト設計を行っています。
            </p>
            
            <p className={styles.missionParagraph}>
              第一弾として、歯科業界に特化したLINE連携型SaaS「DiiLo（ディーロ）」をリリース。
            </p>
            
            <p className={styles.missionParagraph}>
              今後も、現場に根ざしたテクノロジーを届けることで、<br />
              すべての業界に"もうひとりのAIスタッフ"を提供することを目指しています。
            </p>
          </div>
          
          {/* Footer */}
          <div className={styles.missionFooter}>
            <button type="button" className={styles.missionButton}>
              More
            </button>
          </div>
        </div>
      </section>

            {/* Service Section */}
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
                {/* スマホの画像 */}
                <div className={styles.phoneContainer}>
                  <Image
                    src="/images/phone-mockup.png"
                    alt="Phone Mockup"
                    width={80}
                    height={160}
                    className={styles.phoneImage}
                  />
                </div>
                
                {/* ラップトップの画像 */}
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

      {/* Recruit Section */}
      <section id="recruit" className={styles.section}>
        <div className={styles.container1024}>
          <h2 className={styles.sectionTitleWhiteBg}>
            Recruit
          </h2>
          
          <div className={styles.recruitDescription}>
            私たちは、現場で本当に使われるプロダクトにこだわり、人々のキャリアの可能性を広げています。<br />
            一緒に働く仲間を募集中です。
          </div>
          
          <div className={styles.recruitGrid}>
            <div className={styles.recruitCard}>
              <h3 className={styles.recruitTitle}>
               正社員・インターン採用
              </h3>
              <p className={styles.recruitCardDescription}>
                エンジニア
              </p>
              <button className={styles.recruitButton}>
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
              <button className={styles.recruitButton}>
                more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.blackSection}>
        <div className={styles.container1024}>
          <h2 className={styles.serviceSectionTitle}>
            Contact
          </h2>
          
          <div style={{ textAlign: 'center' }}>
            <p className={styles.newsDescription}>
              ご質問・お問い合わせ
            </p>
            
            <button className={styles.buttonWhite}>
              お問い合わせ
            </button>
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section className={styles.section}>
        <div className={styles.container1024}>
          <h2 className={styles.sectionTitleWhiteBg}>
            Company
          </h2>
          
          <div className={styles.companyTable}>
            <div className={styles.companyRow}>
              <div className={styles.companyLabel}>会社名</div>
              <div className={styles.companyValue}>株式会社IILo</div>
            </div>
            <div className={styles.companyRow}>
              <div className={styles.companyLabel}>代表</div>
              <div className={styles.companyValue}>名前</div>
            </div>
            <div className={styles.companyRow}>
              <div className={styles.companyLabel}>設立</div>
              <div className={styles.companyValue}>設立年</div>
            </div>
            <div className={styles.companyRow}>
              <div className={styles.companyLabel}>住所</div>
              <div className={styles.companyValue}>住所</div>
            </div>
            <div className={styles.companyRow}>
              <div className={styles.companyLabel}>電話</div>
              <div className={styles.companyValue}>電話番号</div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className={styles.blackSection}>
        <div className={styles.container1024}>
          <h2 className={styles.serviceSectionTitle}>
            News
          </h2>
          
          
          <div className={styles.newsContainer}>
            <div className={styles.newsItem}>
              <div className={styles.newsDate}>日付</div>
              <div className={styles.newsTitle}>タイトル</div>
            </div>
            <div className={styles.newsItem}>
              <div className={styles.newsDate}>日付</div>
              <div className={styles.newsTitle}>タイトル</div>
            </div>
            <div className={styles.newsItem}>
              <div className={styles.newsDate}>日付</div>
              <div className={styles.newsTitle}>タイトル</div>
            </div>
          </div>
          
          <div className={styles.newsButton}>
            <button className={styles.buttonWhite}>
              ニュース一覧
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            {/* Left Section - Logo */}
            <div className={styles.footerLeft}>
              <Image
                src="/images/IILo-DIILo_logo_IILo_logo-b.png"
                alt="IILO Logo"
                width={80}
                height={40}
                className={styles.footerLogo}
              />
              <div className={styles.copyright}>
                ©2025 - IILO
              </div>
            </div>
            
            {/* Center Section - Navigation Links */}
            <div className={styles.footerCenter}>
              <div className={styles.footerNavLeft}>
                <ul className={styles.footerList}>
                  <li><a href="#mission" className={styles.footerLink}>Mission</a></li>
                  <li><a href="#service" className={styles.footerLink}>Service</a></li>
                  <li><a href="#recruit" className={styles.footerLink}>Recruit</a></li>
                </ul>
              </div>
              <div className={styles.footerNavRight}>
                <ul className={styles.footerList}>
                  <li><a href="#contact" className={styles.footerLink}>Contact</a></li>
                  <li><a href="#news" className={styles.footerLink}>News</a></li>
                </ul>
              </div>
            </div>
            
            {/* Right Section - SNS and Page Top */}
            <div className={styles.footerRight}>
              <div className={styles.footerRightTop}>
                <ul className={styles.socialList}>
                  <li><a href="#" className={styles.socialLink}>X</a></li>
                  <li><a href="#" className={styles.socialLink}>Instagram</a></li>
                  <li><a href="#" className={styles.socialLink}>LINE</a></li>
                </ul>
                <button 
                  type="button"
                  className={styles.pageTopButton}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Pagetop
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IiLoCorporateSite;