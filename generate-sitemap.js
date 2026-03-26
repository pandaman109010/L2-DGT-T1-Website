const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://club-juggling.web.app';
const PUBLIC_DIR = path.join(__dirname, 'public');

const pages = fs.readdirSync(PUBLIC_DIR)
  .filter(file => 
    file.endsWith('.html') && 
    file !== '404.html' && 
    !file.startsWith('google') // Ignores verification files
  )
  .map(file => {
    // Removes .html and handles index.html as the root
    if (file === 'index.html') return '';
    return file.replace('.html', '');
  });

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${BASE_URL}/${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('')}
</urlset>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
console.log('✅ Clean Sitemap generated!');