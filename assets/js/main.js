(() => {
const S = window.SITE || {channel:"https://www.youtube.com/@HasanImamTalks", videos:[], social:{}}, P = document.body.dataset.page;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const idOf = u => { const m = String(u || "").match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/); return m ? m[1] : null; };
const V = (S.videos || []).filter(v => { v.id = idOf(v.url); if (!v.id || !v.title) console.warn("Skipped video entry:", v); return v.id && v.title; });
const eps = V.filter(v => v.type !== "short"), shorts = V.filter(v => v.type === "short");
const LBL = {youtube:"YouTube",facebook:"Facebook",instagram:"Instagram",linkedin:"LinkedIn",tiktok:"TikTok",spotify:"Spotify"};
const ICON = {
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path fill-rule="evenodd" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>'
};
const social = Object.entries(S.social || {}).filter(([, u]) => u);
const put = (s, h) => { const e = $(s); if (e) e.innerHTML = h; };
const thumb = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const NAV = [["Home","index.html","home"],["Episodes","episodes.html","episodes"],["Videos","videos.html","videos"],["About Us","about.html","about"],["Hosts","hosts.html","hosts"],["Contact","contact.html","contact"]];
put("#site-header", `<div class="wrap bar"><a class="brand" href="index.html"><img src="assets/img/logo-sm.png" alt="" width="44" height="44"><span>Hasan Imam Talks</span></a>
<button class="burger" aria-expanded="false" aria-controls="nav" aria-label="Toggle menu"><span></span></button>
<nav id="nav" aria-label="Main">${NAV.map(n => `<a href="${n[1]}"${n[2] === P ? ' aria-current="page"' : ""}>${n[0]}</a>`).join("")}</nav>
<a class="btn sm" data-yt>YouTube</a></div>`);
put("#site-footer", `<div class="wrap fgrid2"><div class="fl"><img src="assets/img/logo-sm.png" alt="Hasan Imam Talks logo" width="96" height="96" loading="lazy"><p>Real conversations on career growth, marketing, branding, sales and life lessons.<br><span lang="bn">বাংলা ও English-এ বাস্তব আলাপ।</span></p></div>
<div><h4>Explore</h4>${NAV.map(n => `<a href="${n[1]}">${n[0]}</a>`).join("")}</div>
<div><h4>Follow</h4>${social.map(([k, u]) => `<a class="soc" href="${esc(u)}" target="_blank" rel="noopener">${ICON[k] || ""}<span>${LBL[k] || esc(k)}</span></a>`).join("")}${S.email ? `<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>` : ""}</div></div>
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
/* ---- Auto carousels: latest uploads via the free YouTube Data API (key in data.js) ---- */
const K = S.youtubeApiKey, HANDLE = (S.channel || "").split("@")[1] || "";
const yt = (path, q) => fetch("https://www.googleapis.com/youtube/v3/" + path + "?" + new URLSearchParams({ ...q, key: K })).then(r => r.ok ? r.json() : Promise.reject(new Error("YouTube API " + r.status)));
const secs = d => { const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(d || ""); return m ? (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0) : 0; };
const clock = s => { const p = n => String(n).padStart(2, "0"); return s >= 3600 ? `${Math.floor(s / 3600)}:${p(Math.floor(s % 3600 / 60))}:${p(s % 60)}` : `${Math.floor(s / 60)}:${p(s % 60)}`; };
const keep = (k, ms, fn) => { try { const c = JSON.parse(localStorage.getItem(k)); if (c && Date.now() - c.t < ms) return Promise.resolve(c.v); } catch (e) {} return fn().then(v => { try { localStorage.setItem(k, JSON.stringify({ t: Date.now(), v })); } catch (e) {} return v; }); };
const uploads = () => keep("hit-uploads-id", 6048e5, () => yt("channels", { part: "contentDetails", forHandle: HANDLE }).then(r => r.items[0].contentDetails.relatedPlaylists.uploads))
  .then(pl => keep("hit-uploads-v1", 36e5, async () => {
    const ids = []; let tok = "";
    for (let i = 0; i < Math.ceil((S.maxVideos || 100) / 50); i++) {
      const r = await yt("playlistItems", { part: "contentDetails", playlistId: pl, maxResults: 50, ...(tok ? { pageToken: tok } : {}) });
      ids.push(...r.items.map(x => x.contentDetails.videoId)); tok = r.nextPageToken; if (!tok) break;
    }
    const out = [];
    for (let i = 0; i < ids.length; i += 50) { const r = await yt("videos", { part: "snippet,contentDetails", id: ids.slice(i, i + 50).join(",") }); r.items.forEach(v => out.push({ id: v.id, title: v.snippet.title, date: v.snippet.publishedAt.slice(0, 10), sec: secs(v.contentDetails.duration), live: v.snippet.liveBroadcastContent })); }
    return out;
  }));
function carousel(sel, list, label) {
  const host = $(sel); if (!host || !list.length) return;
  let paused = matchMedia("(prefers-reduced-motion: reduce)").matches, timer;
  host.innerHTML = `<div class="car" role="region" aria-roledescription="carousel" aria-label="${esc(label)}"><div class="car-track" tabindex="0">${list.slice(0, S.carouselMax || 30).map(v => `<div class="slide">${card({ id: v.id, title: v.title, date: v.date, duration: clock(v.sec) })}</div>`).join("")}</div><div class="car-ctl"><button class="car-b" data-d="-1" aria-label="Previous">&lsaquo;</button><button class="car-b" data-p aria-label="${paused ? "Play" : "Pause"} slideshow">${paused ? "&#9654;" : "&#10074;&#10074;"}</button><button class="car-b" data-d="1" aria-label="Next">&rsaquo;</button></div></div>`;
  const car = $(".car", host), tr = $(".car-track", host);
  const go = d => { const end = tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4;
    if (d > 0 && end) tr.scrollTo({ left: 0, behavior: "smooth" });
    else if (d < 0 && tr.scrollLeft <= 4) tr.scrollTo({ left: tr.scrollWidth, behavior: "smooth" });
    else tr.scrollBy({ left: d * (tr.firstElementChild.getBoundingClientRect().width + 16), behavior: "smooth" }); };
  const run = () => { clearInterval(timer); if (!paused) timer = setInterval(() => go(1), 4500); };
  car.onclick = e => { const b = e.target.closest(".car-b"); if (!b) return;
    if ("p" in b.dataset) { paused = !paused; b.innerHTML = paused ? "&#9654;" : "&#10074;&#10074;"; b.setAttribute("aria-label", (paused ? "Play" : "Pause") + " slideshow"); } else go(+b.dataset.d);
    run(); };
  ["mouseenter", "focusin", "touchstart"].forEach(t => car.addEventListener(t, () => clearInterval(timer), { passive: true }));
  ["mouseleave", "focusout", "touchend"].forEach(t => car.addEventListener(t, run, { passive: true }));
  run();
}
if (K && ["home", "episodes", "videos"].includes(P)) uploads().then(all => {
  const ok = all.filter(v => v.live === "none").sort((a, b) => b.date.localeCompare(a.date)), lim = S.shortMaxSeconds || 180;
  const long = ok.filter(v => v.sec > lim), sh = ok.filter(v => v.sec <= lim);
  if (P === "episodes") carousel("#ep-carousel", long, "Latest episodes");
  else if (P === "videos") { carousel("#feat-carousel", long, "Latest videos"); carousel("#short-carousel", sh, "Latest shorts"); }
  else carousel("#home-carousel", long, "Featured videos");
}).catch(e => console.warn("YouTube carousel unavailable:", e.message));
setYT();
})();
