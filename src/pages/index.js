import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const samples = [
  {
    meta: 'Document360 Podcast · August 2025',
    title: 'Why Aesthetics Matter in Technical Docs, with Richard Rabil (Oracle)',
    blurb: 'A conversation on how visual design and usability shape whether documentation actually gets read.',
    href: 'https://document360.com/blog/why-aesthetics-matter-in-technical-docs-with-richard-oracle/',
  },
  {
    meta: 'STC Intercom · May 2019',
    title: 'Content Strategy in Action: Enabling Sales with Product Documentation',
    blurb: 'How documentation structure became a sales enablement asset, not an afterthought.',
    href: 'https://richardrabil.com/2023/12/21/my-article-from-stc-intercom-content-strategy-in-action-how-documentation-can-enable-sales/',
  },
  {
    meta: 'A List Apart · July 2018',
    title: 'Order Out of Chaos: Patterns of Organization for Writing on the Job',
    blurb: 'Reusable organizational patterns for technical writing under real deadline pressure.',
    href: 'https://alistapart.com/article/order-out-of-chaos-patterns-of-organization-for-writing-on-the-job',
  },
];

const pipelineStages = ['Lint', 'Link Check', 'Build', 'Deploy'];

export default function Home() {
  return (
    <Layout
      title="Richard Rabil"
      description="Principal Technical Writer & AI Knowledge Systems Architect">
      <main className={styles.wrap}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>
            Principal Technical Writer — AI Content Strategy and Knowledge Management
          </p>
          <h1 className={styles.heroHeadline}>
            Creating technical content that informs and delights users—and scales over time.
          </h1>
          <p className={styles.subhead}>
            Hi, I'm Richard. Welcome to my online portfolio. I bring over eighteen years of professional technical writing experience turning complex concepts and unstructured systems into documentation people
            actually trust. I also build governance frameworks and editorial workflows to keep content useful and reliable for humans and AI consumers.
          </p>
          <div className={styles.ctaRow}>
            <Link className={styles.btnPrimary} to="/resume">
              View Resume →
            </Link>
            <Link className={styles.btnGhost} to="/docs/portfolio/samples">
              My Work
            </Link>
            <Link className={styles.btnGhost} to="/how-i-built-this">
              How I Built This Site
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
                Over eighteen years of experience in technical writing and knowledge
                management. Expert in researching and organizing complex technical information, designing
                attractive documents, turning complex jargon into clear content, and enabling users to do their tasks correctly. Master&apos;s degree in technical communication.  
              </p>
            </div>
            <div className={styles.identityRule} />
            <div className={styles.identityPanel}>
              <h3>AI Knowledge Architecture</h3>
              <p>
                Building AI knowledge assets and governance frameworks that enable teams to work consistently and scale, and that keep AI outputs reliable. This site is 
                proof of this practice: a docs-as-code pipeline that lints prose,
                validates links, and refuses to deploy broken work.
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
            <h2>A few things that shipped.</h2>
          </div>
          <div className={styles.cardRow}>
            {samples.map((sample) => (
              <a
                className={styles.card}
                href={sample.href}
                target="_blank"
                rel="noopener noreferrer"
                key={sample.title}>
                <span className={styles.cardMeta}>{sample.meta}</span>
                <h3>{sample.title}</h3>
                <p>{sample.blurb}</p>
                <span className={styles.cardRead}>
                  Read the piece
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
              </a>
            ))}
          </div>
          <Link className={styles.sectionLink} to="/docs/portfolio/samples">
            View More Samples →
          </Link>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>This Site&apos;s Pipeline</p>
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
            Every push runs all four before anything ships. If a check fails,
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
