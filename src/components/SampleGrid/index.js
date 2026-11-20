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

function Thumb({item, withBaseUrl}) {
  return item.thumb ? (
    <img
      className={styles.cardThumb}
      src={withBaseUrl(item.thumb)}
      alt=""
      loading="lazy"
      decoding="async"
    />
  ) : (
    <div className={`${styles.cardThumb} ${styles.placeholder}`} />
  );
}

// A card with a second link (item.secondary) can't be one big link, because
// links can't sit inside links. Instead, the main link stretches over the
// whole card and the second link sits on top of it.
function CardWithSecondLink({item, withBaseUrl}) {
  const url = (link) => (link.internal ? withBaseUrl(link.href) : link.href);
  return (
    <div className={`${styles.card} ${styles.cardWithThumb} ${styles.cardStretched}`}>
      <Thumb item={item} withBaseUrl={withBaseUrl} />
      <div className={styles.cardBody}>
        <span className={styles.cardMeta}>{item.meta}</span>
        <h3>{item.title}</h3>
        {item.blurb && <p>{item.blurb}</p>}
        <span className={styles.cardLinks}>
          <a
            className={`${styles.cardRead} ${styles.stretchedLink}`}
            href={url(item)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.readLabel}: ${item.title}`}>
            {item.readLabel}
            <ExternalIcon />
          </a>
          <a
            className={`${styles.cardRead} ${styles.secondaryLink}`}
            href={url(item.secondary)}
            target="_blank"
            rel="noopener noreferrer">
            {item.secondary.label}
            <ExternalIcon />
          </a>
        </span>
      </div>
    </div>
  );
}

export default function SampleGrid({items}) {
  const {withBaseUrl} = useBaseUrlUtils();
  return (
    <div className={styles.cardRow}>
      {items.map((item) =>
        item.secondary ? (
          <CardWithSecondLink item={item} withBaseUrl={withBaseUrl} key={item.title} />
        ) : (
          <a
            className={`${styles.card} ${styles.cardWithThumb}`}
            href={item.internal ? withBaseUrl(item.href) : item.href}
            target="_blank"
            rel="noopener noreferrer"
            key={item.title}>
            <Thumb item={item} withBaseUrl={withBaseUrl} />
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
        ),
      )}
    </div>
  );
}
