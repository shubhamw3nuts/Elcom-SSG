function SiteMap({sitemapdata}) {
    // getServerSideProps will do the heavy lifting
}

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${posts
         .map((url) => {
           return `
         <url>
             <loc>${`${url}`}</loc>
         </url>
       `;
         })
         .join('')}
     </urlset>
   `;
  }

export async function getServerSideProps({res }) {

    const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/sitemap`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    });

    
    
    let sitemapdata = await response.json();
 
    let data = { ...sitemapdata };

    const sitemap = generateSiteMap(data?.urls);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {
            // headerClass: 'header-v2',
            // sitemapdata: data,
        }
    }
}

export default SiteMap;