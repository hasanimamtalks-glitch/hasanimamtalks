(() => {
const S = window.SITE, P = document.body.dataset.page;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const idOf = u => { const m = String(u || "").match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/); return m ? m[1] : null; };
const V = (S.videos || []).filter(v => { v.id = idOf(v.url); if (!v.id || !v.title) console.warn("Skipped video entry:", v); return v.id && v.title; });
const eps = V.filter(v => v.type !== "short"), shorts = V.filter(v => v.type === "short");
const LBL = {youtube:"YouTube",facebook:"Facebook",instagram:"Instagram",linkedin:"LinkedIn",tiktok:"TikTok",spotify:"Spotify"};
const social = Object.entries(S.social || {}).filter(([, u]) => u);
const put = (s, h) => { const e = $(s); if (e) e.innerHTML = h; };
const thumb = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const NAV = [["Home","index.html","home"],["Episodes","episodes.html","episodes"],["Videos","videos.html","videos"],["About Us","about.html","about"],["Hosts","hosts.html","hosts"],["Contact","contact.html","contact"]];
put("#site-header", `<div class="wrap bar"><a class="brand" href="index.html"><img src="/logo.png" ...> alt="" width="44" height="44"><span>Hasan Imam Talks</span></a>
<button class="burger" aria-expanded="false" aria-controls="nav" aria-label="Toggle menu"><span></span></button>
<nav id="nav" aria-label="Main">${NAV.map(n => `<a href="${n[1]}"${n[2] === P ? ' aria-current="page"' : ""}>${n[0]}</a>`).join("")}</nav>
<a class="btn sm" data-yt>YouTube</a></div>`);
put("#site-footer", `<div class="wrap fgrid2"><div class="fl"><img src="/logo.png" ...> alt="Hasan Imam Talks logo" width="96" height="96" loading="lazy"><p>Real conversations on career growth, marketing, branding, sales and life lessons.<br><span lang="bn">বাংলা ও English-এ বাস্তব আলাপ।</span></p></div>
<div><h4>Explore</h4>${NAV.map(n => `<a href="${n[1]}">${n[0]}</a>`).join("")}</div>
<div><h4>Follow</h4>${social.map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${LBL[k] || esc(k)}</a>`).join("")}${S.email ? `<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>` : ""}</div></div>
<div class="wrap copy">&copy; ${new Date().getFullYear()} Hasan Imam Talks. All rights reserved.</div>`);
const burger = $(".burger"), nav = $("#nav");
burger.onclick = () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
document.addEventListener("keydown", e => { if (e.key === "Escape") { nav.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

const card = v => `<a class="card" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener"><div class="th"><img loading="lazy" src="${thumb(v.id)}" alt="" width="480" height="360">${v.duration ? `<b>${esc(v.duration)}</b>` : ""}</div><div class="cb">${v.category ? `<span class="ct">${esc(v.category)}</span>` : ""}<h3>${esc(v.title)}</h3>${v.desc ? `<p>${esc(v.desc)}</p>` : ""}${v.guest ? `<small>Guest: ${esc(v.guest)}</small>` : ""}${v.date ? `<small>${esc(v.date)}</small>` : ""}</div></a>`;
const embed = v => `<article class="emb"><button class="play" data-id="${v.id}" aria-label="Play video: ${esc(v.title)}"><img loading="lazy" src="${thumb(v.id)}" alt="" width="480" height="360"><i></i></button><h3>${esc(v.title)}</h3>${v.desc ? `<p>${esc(v.desc)}</p>` : ""}</article>`;
const empty = m => `<div class="empty"><p>${m}</p><a class="btn" data-yt>Watch on YouTube</a></div>`;
const grid = (s, l, f, m) => put(s, l.length ? l.map(f).join("") : empty(m));
const NONE = "New episodes are published on the official Hasan Imam Talks YouTube channel.";
const setYT = () => $$("[data-yt]").forEach(a => { a.href = S.channel; a.target = "_blank"; a.rel = "noopener"; });
document.addEventListener("click", e => { const b = e.target.closest(".play"); if (b) b.outerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.id}?autoplay=1&rel=0" title="YouTube video player" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`; });

const feat = V.filter(v => v.featured && v.type !== "short");
if (P === "home") {
  grid("#latest-list", eps.slice(0, 6), card, NONE);
  grid("#featured-list", feat.slice(0, 3), embed, "Featured interviews and long-form conversations are on the official YouTube channel.");
  if (S.guests && S.guests.length) { $("#guests").hidden = false; put("#guest-list", S.guests.map(g => { const i = `<img loading="lazy" src="${esc(g.photo)}" alt="${esc(g.name)}" width="200" height="200"><h3>${esc(g.name)}</h3>`; return g.url ? `<a class="gcard" href="${esc(g.url)}" target="_blank" rel="noopener">${i}</a>` : `<div class="gcard">${i}</div>`; }).join("")); }
  if (S.press && S.press.length) { $("#press").hidden = false; put("#press-list", S.press.map(p => `<a class="chip" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a>`).join("")); }
}
if (P === "episodes") {
  const cats = [...new Set(eps.map(v => v.category).filter(Boolean))]; let cat = "", q = "", n = 12;
  const draw = () => {
    const l = eps.filter(v => (!cat || v.category === cat) && (!q || `${v.title} ${v.desc || ""} ${v.guest || ""}`.toLowerCase().includes(q)));
    grid("#ep-list", l.slice(0, n), card, eps.length ? "No episodes match your search." : NONE);
    $("#more").hidden = l.length <= n; $("#ep-count").textContent = eps.length ? l.length + (l.length === 1 ? " episode" : " episodes") : ""; setYT();
  };
  $("#ctl").hidden = !eps.length;
  put("#chips", cats.length ? ["All", ...cats].map(c => `<button class="chip" aria-pressed="${c === "All"}" data-c="${esc(c)}">${esc(c)}</button>`).join("") : "");
  $("#chips").onclick = e => { const b = e.target.closest(".chip"); if (!b) return; cat = b.dataset.c === "All" ? "" : b.dataset.c; n = 12; $$(".chip").forEach(x => x.setAttribute("aria-pressed", x === b)); draw(); };
  $("#q").oninput = e => { q = e.target.value.trim().toLowerCase(); n = 12; draw(); };
  $("#more").onclick = () => { n += 12; draw(); };
  draw();
}
if (P === "videos") {
  grid("#feat-list", feat, embed, "Featured interviews and long-form conversations are on the official YouTube channel.");
  grid("#short-list", shorts, card, "Short clips are published on the official YouTube channel.");
}
if (P === "contact") {
  const box = (t, d, h) => `<div class="box"><h3>${t}</h3><p>${d}</p>${h}</div>`;
  put("#contact-list", box("YouTube channel", "Watch, subscribe and comment.", '<a class="btn sm" data-yt>Open channel</a>')
    + box("Channel details", "Public details about the channel are on its About tab.", `<a class="btn sm ghost" href="${esc(S.channel)}/about" target="_blank" rel="noopener">View About tab</a>`)
    + (S.email ? box("Email", esc(S.email), `<a class="btn sm" href="mailto:${esc(S.email)}">Send email</a>`) : "")
    + social.filter(([k]) => k !== "youtube").map(([k, u]) => box(LBL[k] || esc(k), "Official page.", `<a class="btn sm ghost" href="${esc(u)}" target="_blank" rel="noopener">Visit</a>`)).join(""));
}
setYT();
})();
