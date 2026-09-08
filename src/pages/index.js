import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

const samples = [
  {
    meta: 'Document360 Podcast · August 2025',
    title: 'Why Aesthetics Matter in Technical Docs, with Richard Rabil',
    blurb: 'A conversation on how visual design and usability shape how documentation gets read.',
    href: 'https://document360.com/blog/why-aesthetics-matter-in-technical-docs-with-richard-oracle/',
    readLabel: 'Read the piece',
    thumb: '/img/samples/podcast-document360.png',
  },
  {
    meta: 'A List Apart · July 2018',
    title: 'Order Out of Chaos: Patterns of Organization for Writing on the Job',
    blurb: 'Reusable organizational patterns for professional writing in the workplace.',
    href: 'https://alistapart.com/article/order-out-of-chaos-patterns-of-organization-for-writing-on-the-job',
    readLabel: 'Read the piece',
    thumb: '/img/samples/alistapart-article.png',
  },
  {
    meta: 'STC Intercom · May 2019',
    title: 'Content Strategy in Action: Enabling Sales with Product Documentation',
    blurb: 'How documentation quality and structure became a sales enablement asset.',
    href: 'https://richardrabil.com/2023/12/21/my-article-from-stc-intercom-content-strategy-in-action-how-documentation-can-enable-sales/',
    readLabel: 'Read the piece',
    thumb: '/img/samples/stc-intercom-article.png',
  },
  {
    meta: 'Overview Guide · Oracle Utilities Docs',
    title: 'Opower Digital Energy Management',
    blurb: 'The complete guide to the Digital Self Service - Energy Management experience, from bill comparisons to data trends to solar power usage.',
    href: 'https://docs.oracle.com/en/industries/utilities/digital-self-service/energy-management-overview/energy-use-view-residential.html#GUID-34357E57-D562-412F-9DBA-ED8D9EEA431A',
    readLabel: 'Read the documentation',
    thumb: '/img/samples/dss-solar-bidirectional.png',
  },
  {
    meta: 'User Guide · Oracle Utilities Docs',
    title: 'Opower Analytics Visualization User Guide',
    blurb: 'How subject areas, measures, and attributes come together to build visualizations and inform business decisions.',
    href: 'https://docs.oracle.com/en/industries/utilities/opower-analytics-visualization/opower-av-user-guide/get-started-opower-av.html#GUID-46E22F9F-E5D5-41C6-829C-06803B7B0350',
    readLabel: 'Read the documentation',
    thumb: '/img/samples/av-user-guide.png',
  },
  {
    meta: 'Specification · Oracle Utilities Docs',
    title: 'Data Transfer Specifications',
    blurb: 'Documentation on transferring energy use data securely from utilities to Oracle in the right structure and format.',
    href: 'https://docs.oracle.com/en/industries/utilities/opower-platform/data-transfer/rates-data-file-specifications.html#GUID-0973077D-0779-414D-97AD-F687C19345DB',
    readLabel: 'Read the documentation',
    thumb: '/img/samples/data-transfer-spec.png',
  },
];

const pipelineStages = ['Lint', 'Link Check', 'Build', 'Content Checks', 'Deploy'];

export default function Home() {
  const {withBaseUrl} = useBaseUrlUtils();
  return (
    <Layout
      title="Richard Rabil"
      description="Principal Technical Writer & AI Knowledge Management">
      <main className={styles.wrap}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>
            Principal Technical Writer — AI Knowledge Management
          </p>
          <h1 className={styles.heroHeadline}>
            Creating useful technical docs at scale—for humans <em>and</em> agents.
          </h1>
          <p className={styles.subhead}>
            Hi, I'm Richard. Welcome to my portfolio. I bring 18+ years of experience producing documentation for SaaS and enterprise software.
          </p>
          <div className={styles.ctaRow}>
            <Link className={styles.btnPrimary} to="/about">
              About Me
              <svg
                className={styles.btnIcon}
                viewBox="0 0 24 24"
                width="14"
                height="14"
                aria-hidden="true">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </Link>
            <Link className={styles.btnGhost} to="/docs/portfolio/samples">
              View My Work
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Dual Identity</p>
            <h2>What I do.</h2>
          </div>
          <div className={styles.identityGrid}>
            <div className={styles.identityPanel}>
              <h3>Technical Communication</h3>
              <p>
                I'm an expert in researching and organizing complex information, designing
                attractive documents, and creating technical content that people actually read. I hold a master's degree in technical communication.
              </p>
            </div>
            <div className={styles.identityRule} />
            <div className={styles.identityPanel}>
              <h3>AI Knowledge Management</h3>
              <p>
                I build AI knowledge assets and governance frameworks that enable teams (and agents!) to produce quality content as the docs grow. This site is
                proof: a <Link to="/how-i-built-this">docs-as-code pipeline</Link> that lints prose,
                validates links, and deploys vetted content.
              </p>
            </div>
          </div>
          <Link className={styles.sectionLink} to="/about">
            More About Me →
          </Link>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Selected Work</p>
            <h2>A sampling of things I've shipped.</h2>
          </div>
          <div className={styles.cardRow}>
            {samples.map((sample) => (
              <a
                className={`${styles.card} ${sample.thumb ? styles.cardWithThumb : ''}`}
                href={sample.internal ? withBaseUrl(sample.href) : sample.href}
                target="_blank"
                rel="noopener noreferrer"
                key={sample.title}>
                {sample.thumb && (
                  <img
                    className={styles.cardThumb}
                    src={withBaseUrl(sample.thumb)}
                    alt=""
                  />
                )}
                <div className={styles.cardBody}>
                  <span className={styles.cardMeta}>{sample.meta}</span>
                  <h3>{sample.title}</h3>
                  <p>{sample.blurb}</p>
                  <span className={styles.cardRead}>
                    {sample.readLabel}
                    <svg
                      className={styles.externalIcon}
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      aria-hidden="true">
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
                  </span>
                </div>
              </a>
            ))}
          </div>
          <Link className={styles.sectionLink} to="/docs/portfolio/samples">
            View More Samples →
          </Link>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>What Is This Site?</p>
            <h2>Not a metaphor.</h2>
          </div>
          <div className={styles.pipeline}>
            {pipelineStages.map((stage, i) => (
              <React.Fragment key={stage}>
                <span className={styles.pipelineStage}>{stage}</span>
                {i < pipelineStages.length - 1 && (
                  <span className={styles.pipelineConnector} />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className={styles.pipelineCaption}>
            Every push runs all five before anything ships. If a check fails,
            the site doesn&apos;t deploy.
          </p>
          <Link className={styles.sectionLink} to="/how-i-built-this">
            Learn more →
          </Link>
        </section>
      </main>
    </Layout>
  );
}
