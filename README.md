# Hasan Imam Talks - Official Website
Static site (HTML, CSS, vanilla JS). No build step. `index.html` is at the root.

## Structure
- index.html, episodes.html, videos.html, about.html, hosts.html, contact.html, 404.html
- assets/css/style.css | assets/js/main.js | **assets/js/data.js (the only file you edit for content)**
- assets/img/ (logo, favicon, host photo) | robots.txt | _headers

## Preview locally
`cd` into this folder, run `python3 -m http.server 8000`, open http://localhost:8000 (or use VS Code "Live Server").

## Update content
Open assets/js/data.js and follow the instructions at the top. Add YouTube links newest first.

## Upload to GitHub
1. github.com > New repository > name it `hasan-imam-talks` > Create (no README needed).
2. Easiest: "uploading an existing file" > drag in the CONTENTS of this folder (index.html must be at the repo root) > Commit.
   Or with git: `git init && git add . && git commit -m "Initial site" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`

## Deploy on Cloudflare Pages (free)
1. dash.cloudflare.com > Workers & Pages > Create > Pages > Connect to Git > pick the repo.
2. Framework preset: None. Build command: leave empty. Build output directory: `/` (or leave blank).
3. Save and Deploy. Your site goes live at `https://<project-name>.pages.dev`.
4. Every later commit to `main` redeploys automatically.
