// Header Render
const headerElement = document.querySelector("#site-header");
if (headerElement) {
  headerElement.innerHTML = `<div class="wrap bar"><a class="brand" href="index.html"><img src="/logo.png" alt="Hasan Imam Talks" width="44" height="44"><span>Hasan Imam Talks</span></a>
<button class="burger" aria-expanded="false" aria-controls="nav" aria-label="Toggle menu"><span></span></button>
<nav id="nav" aria-label="Main">${NAV.map(n => `<a href="${n[1]}"${n[2] === P ? ' aria-current="page"' : ""}>${n[0]}</a>`).join("")}</nav>
<a class="btn sm" data-yt>YouTube</a></div>`;
}

// Footer Render
const footerElement = document.querySelector("#site-footer");
if (footerElement) {
  footerElement.innerHTML = `<div class="wrap fgrid2"><div class="fl"><img src="/logo.png" alt="Hasan Imam Talks logo" width="96" height="96" loading="lazy"><p>Real conversations on career growth, marketing, branding, sales and life lessons.<br><span lang="bn">বাংলা ও English-এ বাস্তব আলাপ।</span></p></div>
<div><h4>Explore</h4>${NAV.map(n => `<a href="${n[1]}">${n[0]}</a>`).join("")}</div>
<div><h4>Follow</h4>${social.map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${LBL[k] || esc(k)}</a>`).join("")}${S.email ? `<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>` : ""}</div></div>
<div class="wrap copy">&copy; ${new Date().getFullYear()} Hasan Imam Talks. All rights reserved.</div>`;
}

// Burger Menu Toggle
const burger = document.querySelector(".burger"), nav = document.querySelector("#nav");
if (burger && nav) {
  burger.onclick = () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
  document.addEventListener("keydown", e => { if (e.key === "Escape") { nav.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });
}
