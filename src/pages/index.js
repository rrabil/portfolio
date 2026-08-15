import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const samples = [
  {
    meta: 'STC Intercom · May 2019',
    title: 'Content Strategy in Action: Enabling Sales with Product Documentation',
    blurb: 'How documentation structure became a sales enablement asset, not an afterthought.',
  },
  {
    meta: 'A List Apart · July 2018',
    title: 'Order Out of Chaos: Patterns of Organization for Writing on the Job',
    blurb: 'Reusable organizational patterns for technical writing under real deadline pressure.',
  },
  {
    meta: 'STC Intercom · October 2017',
    title: "Designing Wiki Templates for Today's Web",
    blurb: 'Template governance as the quiet infrastructure behind a wiki that stays usable.',
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
            Over eighteen years of experience turning complex concepts and unstructured systems into documentation people
            actually trust. Now building content and governance frameworks to keep AI-generated content useful and reliable.
          </p>
          <div className={styles.ctaRow}>
            <Link className={styles.btnPrimary} to="/docs/portfolio/samples">
              View My Portfolio →
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
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Selected Work</p>
            <h2>A few things that shipped.</h2>
          </div>
          <div className={styles.cardRow}>
            {samples.map((sample) => (
              <Link className={styles.card} to="/docs/portfolio/samples" key={sample.title}>
                <span className={styles.cardMeta}>{sample.meta}</span>
                <h3>{sample.title}</h3>
                <p>{sample.blurb}</p>
                <span className={styles.cardRead}>Read the piece →</span>
              </Link>
            ))}
          </div>
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
        </section>
      </main>
    </Layout>
  );
}
