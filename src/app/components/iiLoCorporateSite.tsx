'use client'

import React, { useRef, useEffect } from 'react';
import styles from './IiLoCorporateSite.module.css';
import Header from './Header';
import Image from 'next/image';
import { gsap } from 'gsap';

const IiLoCorporateSite = () => {
  // スクロール連動アニメーション用のrefs
  const missionSectionRef = useRef<HTMLElement>(null);
  const logoI1Ref = useRef<HTMLDivElement>(null);
  const logoI2Ref = useRef<HTMLDivElement>(null);
  const logoLRef = useRef<HTMLDivElement>(null);
  const logoORef = useRef<HTMLDivElement>(null);
  const missionSubtitleRef = useRef<HTMLDivElement>(null);
  const missionMainTitleRef = useRef<HTMLDivElement>(null);
  const missionTitleSmallRef = useRef<HTMLSpanElement>(null);
  const missionHeaderRef = useRef<HTMLDivElement>(null);
  const blackOverlayRef = useRef<HTMLDivElement>(null);
  const diagonalLine1Ref = useRef<HTMLDivElement>(null);
  const diagonalLine2Ref = useRef<HTMLDivElement>(null);
  const diagonalLine3Ref = useRef<HTMLDivElement>(null);

  // 文字出現アニメーション実装
  useEffect(() => {
    const elements = [
      logoI1Ref.current,
      logoI2Ref.current,
      logoLRef.current,
      logoORef.current,
      missionSubtitleRef.current,
      missionMainTitleRef.current,
      missionTitleSmallRef.current,
      missionHeaderRef.current
    ];

    if (elements.some(el => !el)) return;

    // 初期状態設定：全要素を非表示状態に設定
    gsap.set([logoI1Ref.current, logoI2Ref.current, logoLRef.current, logoORef.current], {
      opacity: 0,
      y: 80,
      scale: 0.95
    });

    gsap.set([missionSubtitleRef.current, missionMainTitleRef.current, missionTitleSmallRef.current], {
      opacity: 0,
      y: 50,
      scale: 0.9
    });

    let hasAnimated = false;

    // Intersection Observer設定
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          
          // アニメーション実行
          const executeAnimation = () => {
            // 第1段階: ロゴパーツ順次出現（I → I → L → O）- 横から激しく飛び出し
            const logoElements = [logoI1Ref, logoI2Ref, logoLRef, logoORef];
            logoElements.forEach((element, index) => {
              // 初期状態：新幹線のように遠くから高速で飛び出し
              gsap.set(element.current, {
                opacity: 0,
                x: -800,
                y: 80,
                scale: 0.3,
                rotation: -15,
                filter: "blur(20px)"
              });

              // 新幹線のように激しく高速で飛び出すアニメーション
              gsap.to(element.current, {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                filter: "blur(0px)",
                duration: 0.8,
                delay: index * 0.05,
                ease: "power4.out"
              });

              // 着地時のインパクト効果
              gsap.to(element.current, {
                scale: 1.2,
                duration: 0.1,
                delay: index * 0.05 + 0.8,
                ease: "power2.out"
              });

              gsap.to(element.current, {
                scale: 1,
                duration: 0.2,
                delay: index * 0.05 + 0.9,
                ease: "elastic.out(1.5, 0.3)"
              });
            });

            // 第2段階: 「イーロの」出現（0.8秒後）
            gsap.to(missionSubtitleRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: 0.8,
              ease: "power1.out"
            });

            // 第3段階: 「Mission」出現（1.2秒後）
            gsap.to(missionMainTitleRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: 1.2,
              ease: "power2.out"
            });

            // 第4段階: 「は」出現（1.6秒後）
            gsap.to(missionTitleSmallRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              delay: 1.6,
              ease: "back.out(1.2)"
            });

            // 第5段階: 激しい斜め線インパクトエフェクト（1.5秒後）
            setTimeout(() => {
              // 複数の斜め線が連続で出現
              const diagonalLines = [diagonalLine1Ref, diagonalLine2Ref, diagonalLine3Ref];
              
              diagonalLines.forEach((lineRef, index) => {
                if (lineRef.current) {
                  gsap.set(lineRef.current, {
                    opacity: 1,
                    scaleX: 0,
                    rotation: 45 + (index * 30)
                  });
                  
                  gsap.to(lineRef.current, {
                    scaleX: 1,
                    duration: 0.15,
                    delay: index * 0.1,
                    ease: "power4.out"
                  });
                  
                  gsap.to(lineRef.current, {
                    opacity: 0,
                    duration: 0.2,
                    delay: index * 0.1 + 0.15
                  });
                }
              });

              // 文字を一旦小さくする
              gsap.to([logoI1Ref.current, logoI2Ref.current, logoLRef.current, logoORef.current], {
                scale: 0.6,
                duration: 0.25,
                ease: "power3.out"
              });

              gsap.to([missionSubtitleRef.current, missionMainTitleRef.current, missionTitleSmallRef.current], {
                scale: 0.6,
                duration: 0.25,
                ease: "power3.out"
              });

              // 元のサイズに戻す（より激しく）
              gsap.to([logoI1Ref.current, logoI2Ref.current, logoLRef.current, logoORef.current], {
                scale: 1,
                duration: 0.4,
                delay: 0.4,
                ease: "back.out(2.5)"
              });

              gsap.to([missionSubtitleRef.current, missionMainTitleRef.current, missionTitleSmallRef.current], {
                scale: 1,
                duration: 0.4,
                delay: 0.4,
                ease: "back.out(2.5)"
              });

            }, 1500);

            // 完了後エフェクト（3秒後に微妙な浮遊効果開始）
            setTimeout(() => {
              gsap.to(missionHeaderRef.current, {
                y: -2,
                duration: 3,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true
              });
            }, 3000);
          };

          executeAnimation();
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
      <section id="mission" className={styles.section} ref={missionSectionRef}>
        <div className={styles.container1024}>
          {/* Header Section */}
          <div className={styles.missionHeader} ref={missionHeaderRef}>
            <div className={styles.missionLogoContainer}>
              {/* 斜め線エフェクト1 */}
              <div 
                ref={diagonalLine1Ref}
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '30%',
                  width: '400px',
                  height: '6px',
                  backgroundColor: '#ff6b6b',
                  opacity: 0,
                  transformOrigin: 'center left',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              ></div>
              
              {/* 斜め線エフェクト2 */}
              <div 
                ref={diagonalLine2Ref}
                style={{
                  position: 'absolute',
                  top: '60%',
                  left: '70%',
                  width: '350px',
                  height: '5px',
                  backgroundColor: '#4ecdc4',
                  opacity: 0,
                  transformOrigin: 'center left',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              ></div>
              
              {/* 斜め線エフェクト3 */}
              <div 
                ref={diagonalLine3Ref}
                style={{
                  position: 'absolute',
                  top: '30%',
                  left: '80%',
                  width: '300px',
                  height: '4px',
                  backgroundColor: '#ffe66d',
                  opacity: 0,
                  transformOrigin: 'center left',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              ></div>
              
              <div className={styles.iiloLogo}>
                <div className={styles.logoI1} ref={logoI1Ref}></div>
                <div className={styles.logoI2} ref={logoI2Ref}></div>
                <div className={styles.logoL} ref={logoLRef}></div>
                <div className={styles.logoO} ref={logoORef}></div>
              </div>
              <div className={styles.missionTextContainer}>
                <div className={styles.missionSubtitle} ref={missionSubtitleRef}>イーロの</div>
                <div className={styles.missionMainTitle} ref={missionMainTitleRef}>Mission<span className={styles.missionTitleSmall} ref={missionTitleSmallRef}>は</span></div>
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