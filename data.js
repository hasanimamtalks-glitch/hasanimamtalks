/* =====================================================================
   HASAN IMAM TALKS - CONTENT FILE  (edit this file to update the site)
   Only verified content should be added. Empty lists simply hide or
   show a "watch on YouTube" panel, so nothing is ever faked.

   HOW TO ADD A VIDEO
   1. Open the video on YouTube and copy its address (watch, youtu.be or
      shorts link all work). The 11-character video ID and the thumbnail
      are detected automatically.
   2. Add an entry to `videos` below, NEWEST FIRST. Fields:
        url       (required) YouTube link
        title     (required) exact title as shown on YouTube
        desc      short description (optional)
        category  e.g. "Career", "Marketing" (used by the Episodes filter)
        guest     guest name (optional)
        duration  e.g. "55:29" (optional)
        date      e.g. "2026-10-01" (optional)
        type      "episode" (default) or "short"
        featured  true to show it as an embed on Home and Videos pages
   Example (use a real link):
     { url:"https://www.youtube.com/watch?v=XXXXXXXXXXX", title:"Real title",
       desc:"One-line summary.", category:"Career", featured:true },

   GUESTS:  { name:"Full Name", photo:"assets/img/guests/name.jpg", url:"link (optional)" }
   PRESS:   { name:"Publication", url:"https://link-to-the-feature" }
   SOCIAL / EMAIL: fill only addresses that are officially confirmed.
   ===================================================================== */
window.SITE = {
  name: "Hasan Imam Talks",
  channel: "https://www.youtube.com/@HasanImamTalks",
  email: "",
  social: {
    youtube: "https://www.youtube.com/@HasanImamTalks",
    facebook: "", instagram: "", linkedin: "", tiktok: "", spotify: ""
  },
  videos: [],
  guests: [],
  press: []
};
