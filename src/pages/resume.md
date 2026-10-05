---
title: Resume
description: Principal Technical Writer & AI Knowledge Architect—work experience, tools, and publications.
---

# Richard Rabil, Jr.

**Principal Technical Writer | Product & Engineering Documentation | AI Knowledge Architecture**

20+ years creating technical documentation that helps people understand and use SaaS and enterprise products. First technical writer hired at Opower in its startup phase; since then I've led knowledge systems, content models, and governance that help teams learn and operate products faster, and maintain their own content. I also design AI-augmented workflows and the governance that keeps content trustworthy as it scales.

**Core skills:** product and engineering documentation, information architecture, content modeling, metadata and taxonomy, DITA/XML, enterprise CCMS, structured authoring standards, content governance, AI knowledge workflows

[LinkedIn](https://www.linkedin.com/in/rrabil) · [Samples](/docs/portfolio/samples) · [Blog](https://richardrabil.com/)

## Work Experience

### Oracle—Principal Technical Writer

*Arlington, VA · August 2016–Present*

- Create and maintain technical documentation covering 20+ products and 40+ guides for Oracle Utilities enterprise and SaaS products, working in Agile sprints with product managers and engineers to deliver quality knowledge across the portfolio. Write and manage release notes to ensure complete and accurate coverage of new products and updates. Lead writer for a new AI product, covering user and admin content.
- Create and own complex documentation systems from end to end, including knowledge bases, source content repositories, and publishing workflows. Lead the design and maintenance of content models used to create guides for Oracle Help Center. Set the rules for what to keep internal versus external, and what to reuse across both.
- Lead the long-term modernization of Oracle Utilities Opower Data Transfer Standards documentation: a large, interdependent specification set that utility integration teams use to launch and run Opower products. Designed a new information architecture from scratch, created a structured model for defining core data (for example, data types, allowed values, nullability), and added scenario-based content to assist integrators with the approach that fits their business.
- Develop and edit complex infrastructure and developer documentation, including embedded widgets content, data privacy content, SSO configuration content, and an Opower Integration Hub Widget SDK setup guide. Restructure JavaScript integration and SDK reference content around developer tasks. Close gaps between documented and actual behavior that surface through engineering and customer troubleshooting.
- Serve as a workflow developer on an AI authoring tool for 60 writers across Oracle Industries User Assistance teams. Collaborate with engineers to define product requirements (PRDs) covering authoritative context, provenance, and source evidence. Design solutions around content models and Oracle style guidelines. Run MVP, UAT, and GA test phases, and work across teams to assess problem areas and drive adoption.
- Architect and administer a shared custom GPT for 60 technical writers across multiple teams in the Global Industries Unit, with rules for approved prompts and team context that keep outputs consistent and trustworthy. Designed a standard set of master context files containing audience profiles, document types, and other metadata to inform AI prompts and content generation. Built the framework and architecture for a shared prompt registry and AI skills library for the teams.
- Define rules for new AI workflows: when AI can safely consume inputs, what information to include or exclude, and what constraints and test criteria govern each run and its evaluation.
- Maintain team documentation standards (content rules, structural templates, SOPs) so knowledge assets and deliverables stay consistent. Define rules and governance for AI workflows. Lead the team's iteration planning and triage new documentation requests.
- Led the migration of content in MadCap Flare to enterprise DITA/XML/Oxygen. Designed and socialized standards for directories, reusable content components, metadata tagging (variables and condition tags), and image management. Published multichannel output, updated migrated topics to use DITA topic types and semantic tags, and designed the condition tag strategy that lets shared content render differently by product and customer type.
- Led team-wide initiative to move the remaining print documentation to the web, applying best practices in web writing and usability. Developed CSS stylesheet to match Oracle branding and wrote the team's migration plan. Designed the overarching navigation structure, set cross-linking rules, and restructured the content to make it more responsive and maintainable.

### Opower—Senior Technical Writer

*Arlington, VA · April 2012–July 2016*

- As the first technical writer hired by the company's first documentation manager, created and maintained product and engineering documentation for venture-backed energy efficiency SaaS products, including diagrams and system visuals. Wrote release notes and built the project architecture for single-source publishing, with multichannel targets and conditional tagging strategies so one source fed both print and digital outputs.
- Led a cross-org initiative to design a full-lifecycle SOP knowledge system for Opower delivery teams from scratch, working from ambiguous requirements across multiple stakeholders. Interviewed SMEs; defined the content model and information-type taxonomy (metadata and structural schema for parent/child content types); designed a scalable information architecture; and set up a governance model that let contributors across the company write their own content faster. Delivered adoption training and tracked content health signals using page metadata and macros.
- Co-led initiative to design and implement a central, authoritative product knowledge base from scratch for use across the company. Researched audience needs and designed the information architecture, content models, metadata, page layouts, templates, and workflows that allowed the system to scale. Defined lifecycle rules for maintaining and retiring content, using content reuse libraries and archiving procedures.
- Developed and implemented documentation frameworks (for example, information architectures, templates, style guidelines, and workflows) that saved time and improved quality.
- Hired and onboarded technical writers, teaching them how to work efficiently within our toolset and framework.

### SAIC—Technical Writer/Editor

*Rockville, MD · October 2011–April 2012*

- Collaborated with software engineers, systems analysts, and other technical personnel in an Agile environment to document grants management applications and public health data repositories for the Department of Health and Human Services (HHS) Health Resources and Services Administration (HRSA).
- Developed system and software documentation (business requirements, XML data dictionaries, design documents, technical specifications, release notes) and end-user documentation (online help, training presentations). Ran usability testing for a large-scale web redesign.

### Digital Infuzion—Technical Writer/Editor

*Rockville, MD · June 2006–October 2011*

- Created and maintained system and software documentation in support of large-scale federal healthcare IT contracts. Worked closely with development teams to deliver clear, useful knowledge. Ran usability tests to improve the corporate website and the efficacy of user guides.
- Composed technical proposals that secured new contract awards. Researched and wrote technical marketing materials, including service descriptions, web copy, success stories, and product profiles for use in presentations and sales discussions. Developed a detailed content model of the marketing material (consisting of metadata dimensions, information types, and content units) to support documentation planning, structure, and consistency.
- Wrote and edited the system architecture description (logical and technical architecture, web-services data exchange, and a CDISC-based information model) for the NIH/NIAID Division of AIDS Enterprise System, a clinical research platform, published in the online appendix to a 2011 JAMIA article.

## Selected Projects

### Docs-as-code portfolio site

*This site—see [How I Built This](/how-i-built-this)*

- Build and maintain a Docusaurus site published on GitHub Pages through a gated CI/CD workflow in GitHub Actions that runs Vale style checks, link checks, a build, and content checks before any update goes live.
- Publish a machine-readable content layer: every page ships a raw Markdown twin and an `llms.txt` entry, so AI agents can retrieve the source instead of scraping rendered HTML.
- Develop site content and quality checks with Claude Code and Codex, guided by a shared `AGENTS.md` instruction file.

## Education

- **Texas Tech University**, Lubbock, TX—MA in Technical Communication (2007–2012)
- **York College of Pennsylvania**, York, PA—BA in Professional Writing (2003–2007)

## Tools

| Category | Tools |
| --- | --- |
| Docs-as-Code & Version Control | Git/GitHub, GitLab, GitHub Pages, Docusaurus, Markdown, Vale, Lychee, VS Code, HTML, CSS, TortoiseSVN |
| Authoring & CCMS | DITA/XML, Oxygen XML Author, MadCap Flare, Adobe RoboHelp, Atlassian Confluence, SharePoint |
| AI & Automation | Claude Code, OpenAI Codex, ChatGPT and custom GPTs |
| Diagramming & Design | Visio, Figma, draw.io, Gliffy, Mermaid |
| Productivity & Project Management | Jira, Microsoft Office (Word, PowerPoint, Excel, Project), Slack, Snagit, Camtasia |

## Selected Publications

- "[On Delegating Tech Writing to AI: What We Gain and What We Lose](https://richardrabil.com/2026/08/08/on-delegating-tech-writing-to-ai-what-we-gain-and-what-we-lose/)." *richardrabil.com*, August 2026. On where AI-assisted writing helps and where editorial judgment still has to lead.
- "[Content Strategy in Action: Enabling Sales with Product Documentation](https://richardrabil.com/2023/12/21/my-article-from-stc-intercom-content-strategy-in-action-how-documentation-can-enable-sales/)." *Intercom*, May 2019. How documentation structure became a sales enablement asset.
- "[Order Out of Chaos: Patterns of Organization for Writing on the Job](https://alistapart.com/article/order-out-of-chaos-patterns-of-organization-for-writing-on-the-job)." *A List Apart*, July 2018. Reusable organizational patterns for writing in the workplace.
- "[Designing Wiki Templates for Today's Web](https://richardrabil.com/2018/06/12/my-article-from-stc-intercom-designing-wiki-templates-for-todays-web/)." *Intercom*, November 2017. Practical guidance for designing wiki page templates that stand the test of time as content scales.
- "[Getting Organized: Practical Guidelines for Documentation Scalability](https://www.slideshare.net/slideshow/getting-organized-practical-guidelines-for-documentation-scalability/41119405)." November 2014. Presentation delivered at a local technical communication meetup, later published on SlideShare.

See the full list on [Work Samples](/docs/portfolio/samples).

## Awards

Award of Excellence, STC Washington, DC–Baltimore Chapter's 2013–2014 Summit Technical Writing Competition.
