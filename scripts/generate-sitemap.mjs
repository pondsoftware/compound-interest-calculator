import { writeFileSync } from "fs";

const DOMAIN = "https://compoundinterestcalc.app";

const urls = [
  "/",
  "/savings-goal",
  "/investment-growth",
  "/rule-of-72",
  "/inflation",
  "/retirement",
  "/compound-vs-simple-interest",
  "/rule-of-72-explained",
  "/daily-vs-monthly-vs-annual-compounding",
  "/how-long-until-savings-double",
  "/compound-interest-formula",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${DOMAIN}${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>${url === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

writeFileSync("public/sitemap.xml", sitemap);
console.log(`Sitemap generated: ${urls.length} URLs`);
