import React from 'react';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fillOpacity="0"
      />
    </svg>
  );
}

export default function SampleGrid({items}) {
  const {withBaseUrl} = useBaseUrlUtils();
  return (
    <div className={styles.cardRow}>
      {items.map((item) => (
        <a
          className={`${styles.card} ${styles.cardWithThumb}`}
          href={item.internal ? withBaseUrl(item.href) : item.href}
          target="_blank"
          rel="noopener noreferrer"
          key={item.title}>
          {item.thumb ? (
            <img
              className={styles.cardThumb}
              src={withBaseUrl(item.thumb)}
              alt=""
            />
          ) : (
            <div className={`${styles.cardThumb} ${styles.placeholder}`} />
          )}
          <div className={styles.cardBody}>
            <span className={styles.cardMeta}>{item.meta}</span>
            <h3>{item.title}</h3>
            {item.blurb && <p>{item.blurb}</p>}
            <span className={styles.cardRead}>
              {item.readLabel}
              <ExternalIcon />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
