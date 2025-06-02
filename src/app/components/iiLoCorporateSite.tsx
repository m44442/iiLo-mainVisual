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
          <h2 className={styles.sectionTitle}>
            iiLoの<br />
            Mission<span style={{ fontSize: '18px' }}>は</span>
          </h2>
          
          {/* 5つの円形要素 */}
          <div className={styles.circleContainer}>
            <div className={styles.circleRowTop}>
              <div className={styles.circle}>
                <div className={styles.circleTextLarge}>AI</div>
              </div>
              <div className={styles.circle}>
                <div>
                  <div className={styles.circleText}>Web</div>
                  <div className={styles.circleText}>アプリケーション</div>
                  <div className={styles.circleText}>開発</div>
                </div>
              </div>
            </div>
            
            <div className={styles.circleRowBottom}>
              <div className={styles.circle}>
                <div className={styles.circleText}>クラウドインフラ</div>
              </div>
              <div className={styles.circle}>
                <div>
                  <div className={styles.circleText}>セキュリティ・</div>
                  <div className={styles.circleText}>プライバシー設計</div>
                </div>
              </div>
              <div className={styles.circle}>
                <div>
                  <div className={styles.circleText}>API・</div>
                  <div className={styles.circleText}>外部連携基盤</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.textBox}>
            <h3 className={styles.textBoxTitle}>
              すべての業界に<br />
              "もうひとりのAIスタッフ"を提供する
            </h3>
            
            <div>
              <p className={styles.textContent}>
                IILo（イーロ）は、AI・Web技術・クラウドインフラを用いて、<br />
                業界特化型のスマートSaaSを開発・提供するテクノロジーカンパニーです。
              </p>
              
              <p className={styles.textContent}>
                私たちは、現場で本当に使われるプロダクトにこだわり、<br />
                医療・教育・店舗業などの現場に寄り添ったプロダクト設計を行っています。
              </p>
              
              <p className={styles.textContent}>
                第一弾として、歯科業界に特化したLINE連携型SaaS「DiiLo（ディーロ）」をリリース。
              </p>
              
              <p className={styles.textContent}>
                今後も、現場に根ざしたテクノロジーを届けることで、<br />
                すべての業界に"もうひとりのAIスタッフ"を提供することを目指しています。
              </p>
            </div>
            
            <button className={styles.button}>
              More
            </button>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section id="service" className={styles.blackSection}>
        <div className={styles.container1024}>
          <h2 className={styles.sectionTitle}>
            • Service
          </h2>
          
          <div className={styles.serviceCard}>
            <div>
              <div className={styles.serviceSubtitle}>
                歯科クリニック特化<br />
                LINEマーケティングSaaS
              </div>
              
              <div className={styles.serviceTitleRow}>
                </div>
                <h3 className={styles.serviceTitle}>
                  <Image
                    src="/images/IILo-DIILo_logo_DIILo_logo-b.png"
                    alt="DiiLo Logo"
                    width={200}
                    height={100}
                  />
                </h3>
            </div>
            
            {/* Device mockup */}
            <div className={styles.deviceMockup}>
              <div className={styles.phoneMockup}>
                <div className={styles.phoneScreen}></div>
              </div>
              <div className={styles.laptopMockup}>
                <div className={styles.laptopScreen}></div>
                <div className={styles.laptopBase}></div>
              </div>
            </div>
            
            <button className={styles.button}>
              More
            </button>
            
            <div className={styles.serviceDescription}>
              DiiLoは、歯科クリニック向けに特化した、LINE公式アカウントと連携するマーケティングSaaSです。<br />
              患者データ管理、予約、保険証のアップロード、患者アンケート、セグメント別のメッセージを配信、個別チャット。<br />
              さらにリッチメニューの自動生成や、Stripe決済機能までを一元管理。さらにそれらを用いたマーケティング情報の獲得。<br />
              従来の汎用ツールと異なり、導入時点からテンプレートが整っており、専門知識不要で”その日から使える”設計”に。<br />
              「歯科現場への最適化」と、誰でも直感的に扱えるユーザーインターフェイスを両立させた、次世代の歯科DXプラットフォー<br />
              ムです。
            </div>
          </div>
        </div>
      </section>

      {/* Recruit Section */}
      <section id="recruit" className={styles.section}>
        <div className={styles.container1024}>
          <h2 className={styles.sectionTitleCenter}>
            • Recruit
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
          <h2 className={styles.sectionTitleCenter}>
            • Contact
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
          <h2 className={styles.sectionTitleCenter}>
            • Company
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
          <h2 className={styles.sectionTitleCenter}>
            • News
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
            <div className={styles.footerColumn}>
              <h3>iiLo</h3>
            </div>
            <div className={styles.footerColumn}>
              <h4>Mission</h4>
              <ul className={styles.footerList}>
                <li><a href="#mission" className={styles.footerLink}>Overview</a></li>
                <li><a href="#service" className={styles.footerLink}>Service</a></li>
                <li><a href="#news" className={styles.footerLink}>News</a></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Contact</h4>
              <ul className={styles.footerList}>
                <li><a href="#contact" className={styles.footerLink}>Contact</a></li>
                <li><a href="#company" className={styles.footerLink}>Company</a></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <ul className={styles.footerList}>
                <li><a href="#recruit" className={styles.footerLink}>Link</a></li>
              </ul>
            </div>
          </div>
          
          <div className={styles.copyright}>
            © 2024 iiLo Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IiLoCorporateSite;