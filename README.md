# Richard Rabil Portfolio

Static technical writing portfolio prepared for GitHub Pages.

## Local Preview

Open `index.html` in a browser, or serve the folder with any static web server.

## Publish to GitHub Pages

Create an empty public repository named `portfolio` under `rrabil`, then run:

```powershell
git branch -M main
git remote add origin https://github.com/rrabil/portfolio.git
git push -u origin main
```

In GitHub, open **Settings > Pages** and set the source to **GitHub Actions** if it is not selected automatically.

The default project URL will be:

```text
https://rrabil.github.io/portfolio/
```

## Custom URL Notes

`richardrabil.com/portfolio` has to be served or redirected by the existing WordPress site because DNS cannot point only one path to GitHub Pages.

The cleaner GitHub Pages option is:

```text
portfolio.richardrabil.com
```

That requires the domain manager to create a `CNAME` record for `portfolio` pointing to `rrabil.github.io`, then this repo can add a `CNAME` file containing `portfolio.richardrabil.com`.

## Content To Add Later

- Public writing samples or sanitized PDFs.
- A preferred email address or LinkedIn profile.
- Concrete case studies with outcomes, constraints, and links.

## Source Material Used

- Public work archive: https://richardrabil.com/work/
- LinkedIn profile link: https://www.linkedin.com/in/rrabil/

LinkedIn returned an authwall during automated review, so it is linked as a professional profile but not used as a factual source for portfolio copy.
