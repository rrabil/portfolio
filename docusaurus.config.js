// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import {GlobExcludeDefault} from '@docusaurus/utils';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Richard Rabil',
  tagline: 'Principal Technical Writer & AI Knowledge Architect',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://portfolio.richardrabil.com',
  baseUrl: '/',

  organizationName: 'rrabil',
  projectName: 'portfolio',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/rrabil/portfolio/tree/main/',
        },
        pages: {
          // home.md is a hand-authored Markdown twin of index.js for the
          // machine-readable content layer (see scripts/generate-llm-content.mjs),
          // not a page Docusaurus should route/render on its own.
          exclude: [...GlobExcludeDefault, 'home.md'],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Social preview (Open Graph / Twitter card) shown when any page is
      // shared on LinkedIn, Slack, X, etc. Docusaurus emits og:image and
      // twitter:image from this; the twitter:card size is set in metadata.
      // Source design: 1200×630, the size LinkedIn and X expect.
      image: 'img/social-card.jpg',
      metadata: [
        {name: 'twitter:card', content: 'summary_large_image'},
        {property: 'og:image:width', content: '1200'},
        {property: 'og:image:height', content: '630'},
        {
          property: 'og:image:alt',
          content:
            'Richard Rabil, Principal Technical Writer and AI Knowledge Architect: delivering useful technical knowledge at scale, for humans and agents.',
        },
      ],
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Richard Rabil',
        items: [
          {to: '/', label: 'Home', position: 'left'},
          {to: '/about', label: 'About Me', position: 'left'},
          {
            type: 'docSidebar',
            sidebarId: 'portfolioSidebar',
            label: 'Work',
            position: 'left',
          },
          {to: '/resume', label: 'Resume', position: 'left'},
          {to: '/how-i-built-this', label: 'How I Built This', position: 'left'},
          {
            href: 'https://richardrabil.com',
            label: 'Blog',
            position: 'right',
          },
          {
            href: 'https://www.linkedin.com/in/rrabil/',
            label: 'Contact',
            position: 'right',
          },
          {
            // pathname:// tells Docusaurus this is a static file, not a page
            // route, so the browser downloads it instead of client-routing.
            to: 'pathname:///files/richard-rabil-resume.pdf',
            label: 'Download Resume',
            position: 'right',
            className: 'navbar-cta',
            target: '_blank',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Site',
            items: [
              {label: 'Home', to: '/'},
              {label: 'About Me', to: '/about'},
              {label: 'Work', to: '/docs/portfolio/samples'},
              {label: 'Resume', to: '/resume'},
            ],
          },
          {
            title: 'More',
            items: [
              {label: 'How I Built This', to: '/how-i-built-this'},
              {label: 'Blog', href: 'https://richardrabil.com'},
              {label: 'Contact (LinkedIn)', href: 'https://www.linkedin.com/in/rrabil/'},
              {label: 'Download Resume (PDF)', to: 'pathname:///files/richard-rabil-resume.pdf'},
            ],
          },
          {
            title: 'Source',
            items: [
              {label: 'GitHub', href: 'https://github.com/rrabil/portfolio'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Richard Rabil. Built with Docusaurus — lint, link-check, build, and deploy all gate this site's own pipeline.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
