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
            Principal Technical Writer — AI Knowledge Systems Architect
          </p>
          <h1 className={styles.heroHeadline}>
            Documentation that survives contact with production — and the judgment to
            know when the AI draft was wrong.
          </h1>
          <p className={styles.subhead}>
            Fifteen-plus years turning ambiguous systems into documentation people
            actually use — now applied to the governance frameworks that keep
            AI-assisted knowledge systems honest.
          </p>
          <div className={styles.ctaRow}>
            <Link className={styles.btnPrimary} to="/docs/portfolio/how-to-guides">
              View the Portfolio →
            </Link>
            <Link className={styles.btnGhost} to="/how-i-built-this">
              How I Built This Site
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Dual Identity</p>
            <h2>Two disciplines, one governance model.</h2>
          </div>
          <div className={styles.identityGrid}>
            <div className={styles.identityPanel}>
              <h3>Technical Writer</h3>
              <p>
                Fifteen years of documentation across DITA/Oxygen migrations,
                Confluence governance, and product docs that scale past whatever
                process was supposed to contain them. The wiki-retirement
                methodology built at Opower outlived the acquisition that was
                supposed to make it obsolete.
              </p>
            </div>
            <div className={styles.identityRule} />
            <div className={styles.identityPanel}>
              <h3>AI Knowledge Systems Architect</h3>
              <p>
                Governance frameworks for custom GPT architectures, and the
                standing rules that keep AI output honest. This site is the
                proof, not just the pitch: a docs-as-code pipeline that lints,
                checks links, and refuses to deploy broken work.
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
              <Link className={styles.card} to="/docs/portfolio/how-to-guides" key={sample.title}>
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
            the site doesn&apos;t deploy — same standard the documentation
            itself is held to.
          </p>
        </section>
      </main>
    </Layout>
  );
}
