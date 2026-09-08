// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import {GlobExcludeDefault} from '@docusaurus/utils';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Richard Rabil',
  tagline: 'Principal Technical Writer & AI Knowledge Management',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://rrabil.github.io',
  baseUrl: '/portfolio/',

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
