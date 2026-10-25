// Header Render
const headerElement = document.querySelector("#site-header");
if (headerElement) {
  headerElement.innerHTML = `<div class="wrap bar"><a class="brand" href="index.html"><img src="/logo.png" alt="Hasan Imam Talks" width="44" height="44"><span>Hasan Imam Talks</span></a>
<button class="burger" aria-expanded="false" aria-controls="nav" aria-label="Toggle menu"><span></span></button>
<nav id="nav" aria-label="Main">${NAV.map(n => `<a href="${n[1]}"${n[2] === P ? ' aria-current="page"' : ""}>${n[0]}</a>`).join("")}</nav>
<a class="btn sm" data-yt>YouTube</a></div>`;
}
const HIT_ICONS = {
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path fill-rule="evenodd" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>'
};
// Footer Render
const footerElement = document.querySelector("#site-footer");
if (footerElement) {
  footerElement.innerHTML = `<div class="wrap fgrid2"><div class="fl"><img src="/logo.png" alt="Hasan Imam Talks logo" width="96" height="96" loading="lazy"><p>Real conversations on career growth, marketing, branding, sales and life lessons.<br><span lang="bn">বাংলা ও English-এ বাস্তব আলাপ।</span></p></div>
<div><h4>Explore</h4>${NAV.map(n => `<a href="${n[1]}">${n[0]}</a>`).join("")}</div>
<div><h4>Follow</h4>${social.map(([k, u]) => `<a class="soc" href="${esc(u)}" target="_blank" rel="noopener">${HIT_ICONS[k] || ""}<span>${LBL[k] || esc(k)}</span></a>`).join("")}${S.email ? `<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>` : ""}</div></div>
<div class="wrap copy">&copy; ${new Date().getFullYear()} Hasan Imam Talks. All rights reserved.</div>`;
}

// Burger Menu Toggle
const burger = document.querySelector(".burger"), nav = document.querySelector("#nav");
if (burger && nav) {
  burger.onclick = () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
  document.addEventListener("keydown", e => { if (e.key === "Escape") { nav.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });
}
