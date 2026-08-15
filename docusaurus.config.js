// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Richard Rabil',
  tagline: 'Principal Technical Writer & AI Knowledge Systems Architect',
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
          {to: '/resume', label: 'Resume', position: 'left'},
          {
            type: 'dropdown',
            label: 'Work',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'portfolioSidebar',
                label: 'Work',
              },
              {to: '/api-sample', label: 'API Sample'},
            ],
          },
          {
            type: 'dropdown',
            label: 'How I Built This',
            position: 'left',
            items: [
              {to: '/how-i-built-this', label: 'How I Built This'},
              {
                type: 'docSidebar',
                sidebarId: 'skillsAgentsSidebar',
                label: 'Skills & Agents',
              },
            ],
          },
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
              {label: 'Resume', to: '/resume'},
              {label: 'Work', to: '/docs/portfolio/samples'},
            ],
          },
          {
            title: 'More',
            items: [
              {label: 'How I Built This', to: '/how-i-built-this'},
              {label: 'Skills & Agents', to: '/docs/skills-agents/standing-rules-vs-memory'},
              {label: 'API Sample', to: '/api-sample'},
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
