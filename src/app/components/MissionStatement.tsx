'use client'

import React from 'react';
import styles from './IiLoCorporateSite.module.css';

const MissionStatement = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container1024}>
        <div style={{
          textAlign: 'center',
          fontSize: '18px',
          color: 'black',
          lineHeight: '1.6',
          padding: '40px 0'
        }}>
          現場に根ざしたテクノロジーを届けることで、全ての業界に"もうひとりのAIスタッフ"を提供することを目指しています。
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;