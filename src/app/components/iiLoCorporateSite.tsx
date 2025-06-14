'use client'

import React, { useRef, useEffect, useState } from 'react';
import styles from './IiLoCorporateSite.module.css';
import Footer from './Footer';
import Image from 'next/image';

const IiLoCorporateSite = () => {
  // スクロール連動アニメーション用のrefs
  const missionSectionRef = useRef<HTMLElement>(null);
  const missionSubtitleRef = useRef<HTMLDivElement>(null);
  const missionMainTitleRef = useRef<HTMLDivElement>(null);
  const missionTitleSmallRef = useRef<HTMLSpanElement>(null);
  const missionHeaderRef = useRef<HTMLDivElement>(null);

  // IILO 5段階ロゴアニメーション実装（CSS keyframes版）
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showMissionText, setShowMissionText] = useState(false);
  
  useEffect(() => {
    let hasAnimated = false;

    const startAnimation = () => {
      // Phase 1: 稲妻スライド（0.0秒〜0.08秒）
      setCurrentPhase(1);
      setTimeout(() => setCurrentPhase(3), 300);
      setTimeout(() => setCurrentPhase(4), 1000);
      setTimeout(() => setCurrentPhase(5), 1300);

      // テキスト要素のアニメーション（別途実行）
      setTimeout(() => {
        setShowMissionText(true);
      }, 2000);

      // 浮遊エフェクト（3秒後）
      setTimeout(() => {
        if (missionHeaderRef.current) {
          missionHeaderRef.current.style.animation = 'float 3s ease-in-out infinite alternate';
        }
      }, 3000);
    };

    // Intersection Observer設定
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          startAnimation();
          observer.disconnect();
        }
      });
    }, { 
      threshold: 0.7
    });

    if (missionHeaderRef.current) {
      observer.observe(missionHeaderRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div className={styles.container}>

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
      <section id="mission" className={styles.section} ref={missionSectionRef}>
        <div className={styles.container1024}>
          {/* Header Section - IILO 5段階アニメーション */}
          <div className={styles.missionHeader} ref={missionHeaderRef}>
            <div className={styles.iiloAnimationContainer}>
              {/* Phase 1: 稲妻スライド */}
              {currentPhase === 1 && (
                <div className={styles.phase1Container}>
                  {/* 残像1 */}
                  <div className={styles.afterimage1}>
                    <div className={styles.compressedLogoContainer}>
                      <div className={styles.compressedI1}></div>
                      <div className={styles.compressedI2}></div>
                      <div className={styles.compressedL}></div>
                      <div className={styles.compressedO}></div>
                    </div>
                  </div>
                  {/* 残像2 */}
                  <div className={styles.afterimage2}>
                    <div className={styles.compressedLogoContainer}>
                      <div className={styles.compressedI1}></div>
                      <div className={styles.compressedI2}></div>
                      <div className={styles.compressedL}></div>
                      <div className={styles.compressedO}></div>
                    </div>
                  </div>
                  {/* メインロゴ */}
                  <div className={styles.mainSlide}>
                    <div className={styles.compressedLogoContainer}>
                      <div className={styles.compressedI1}></div>
                      <div className={styles.compressedI2}></div>
                      <div className={styles.compressedL}></div>
                      <div className={styles.compressedO}></div>
                    </div>
                  </div>
                </div>
              )}


              {/* Phase 3: 上下交互スライド + 芸術エフェクト */}
              {currentPhase === 3 && (
                <div className={styles.phase3Container}>
                  {/* エフェクト要素 - 文字周りに集中配置 */}
                  <div className={styles.effectsContainer}>
                    <div className={styles.effectLine1}></div>
                    <div className={styles.effectLine2}></div>
                    <div className={styles.effectCircle1}></div>
                    <div className={styles.effectLine3}></div>
                    <div className={styles.effectLine4}></div>
                    <div className={styles.effectCircle2}></div>
                    <div className={styles.effectLine5}></div>
                    <div className={styles.effectLine6}></div>
                    <div className={styles.effectLine7}></div>
                    <div className={styles.effectCircle3}></div>
                  </div>
                  
                  {/* 文字 */}
                  <div className={styles.lettersContainer}>
                    <div className={styles.letterI1}></div>
                    <div className={styles.letterI2}></div>
                    <div className={styles.letterL}></div>
                    <div className={styles.letterO}></div>
                  </div>
                </div>
              )}

              {/* Phase 4: 元サイズ復帰 */}
              {currentPhase === 4 && (
                <div className={styles.phase4Container}>
                  <div className={styles.normalLogoContainer}>
                    <div className={styles.normalI1}></div>
                    <div className={styles.normalI2}></div>
                    <div className={styles.normalL}></div>
                    <div className={styles.normalO}></div>
                  </div>
                </div>
              )}

              {/* Phase 5: 斜め分割スライド */}
              {currentPhase === 5 && (
                <div className={styles.phase5Container}>
                  <div className={styles.finalLetters}>
                    {/* I1 の分割 */}
                    <div className={styles.letterSplitI1}>
                      <div className={styles.splitLeftI1}></div>
                      <div className={styles.splitRightI1}></div>
                    </div>
                    
                    {/* I2 の分割 */}
                    <div className={styles.letterSplitI2}>
                      <div className={styles.splitLeftI2}></div>
                      <div className={styles.splitRightI2}></div>
                    </div>
                    
                    {/* L の分割 */}
                    <div className={styles.letterSplitL}>
                      <div className={styles.splitLeftL}></div>
                      <div className={styles.splitRightL}></div>
                    </div>
                    
                    {/* O の分割 */}
                    <div className={styles.letterSplitO}>
                      <div className={styles.splitLeftO}></div>
                      <div className={styles.splitRightO}></div>
                    </div>
                  </div>
                </div>
              )}

            </div>
            
            <div className={styles.missionTextContainer}>
              <div className={`${styles.missionSubtitle} ${showMissionText ? styles.fadeInUp : styles.hiddenText}`} ref={missionSubtitleRef}>イーロの</div>
              <div className={`${styles.missionMainTitle} ${showMissionText ? styles.fadeInUp : styles.hiddenText}`} ref={missionMainTitleRef}>Mission<span className={`${styles.missionTitleSmall} ${showMissionText ? styles.fadeInUp : styles.hiddenText}`} ref={missionTitleSmallRef}>は</span></div>
            </div>
          </div>
          
          {/* Service Areas - 5 circles layout */}
          <div className={styles.missionCircleContainer}>
            {/* Desktop: horizontal layout */}
            <div className={`${styles.missionCircleRow} ${styles.missionCircleDesktop}`}>
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
            
            {/* Mobile: 2-3 layout */}
            <div className={`${styles.missionCircleMobile}`}>
              <div className={`${styles.missionCircleRow} ${styles.missionCircleRowTop}`}>
                <div className={styles.missionCircle}>
                  <div className={styles.missionCircleText}>AI</div>
                </div>
                <div className={styles.missionCircle}>
                  <div className={styles.missionCircleText}>
                    Web<br />アプリケーション<br />開発
                  </div>
                </div>
              </div>
              <div className={`${styles.missionCircleRow} ${styles.missionCircleRowBottom}`}>
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
            <a href="/mission">
              <button type="button" className={styles.missionButton}>
                More
              </button>
            </a>
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
      <Footer />
    </div>
  );
};

export default IiLoCorporateSite;