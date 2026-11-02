/* Amit 2.0 token reference for HTML/JS content templates.
   CSS remains the source of truth for rendered styling. */
window.AMIT_DESIGN_TOKENS = Object.freeze({
  version: "1.0.0",
  palette: {
    ink: "#191919",
    paper: "#F3EFE5",
    signal: "#E8753D",
    stone: "#A8A69B",
    sage: "#D6DCB9"
  },
  formats: {
    carousel: { width: 1080, height: 1350, ratio: "4:5", safeInset: 90 },
    reel: { width: 1080, height: 1920, ratio: "9:16", safeTop: 154, safeBottom: 192 },
    story: { width: 1080, height: 1920, ratio: "9:16", safeTop: 154, safeBottom: 192 }
  },
  principles: [
    "One dominant idea per frame",
    "Editorial hierarchy over decoration",
    "Use Signal as emphasis, not wallpaper",
    "Keep body copy readable on a phone",
    "Use motion to reveal meaning, not to decorate"
  ]
});
