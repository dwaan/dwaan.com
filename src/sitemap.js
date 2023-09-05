const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const axios = require('axios');
const cheerio = require('cheerio');

// Define your website's base URL
const baseUrls = ['https://dwaan.com/', 'https://v1.dwaan.com'];

async function crawlAndGenerateSitemap() {
    // const mergedSitemapStream = new SitemapStream({ hostname: '' }); // Initialize an empty merged sitemap

    async function crawlPage(baseUrl) {
        const visited = new Set();

        async function crawlInternalPage(url) {
            if (visited.has(url)) return;
            visited.add(url);
            console.log(url);

            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            // Find and crawl internal links
            const internalLinks = [];
            $('a').each((_, element) => {
                const href = $(element).attr('href');
                if (href && href.startsWith('./') && !href.includes('./menu')) internalLinks.push(baseUrl + href.replace('./', ''));
                else if (href && href.startsWith('/') && !href.includes('/menu')) internalLinks.push(baseUrl + href);
            });

            for (const link of internalLinks) {
                await crawlInternalPage(link);
            }
        }

        // Start crawling from the homepage of the current base URL
        await crawlInternalPage(baseUrl);

        console.log(`Crawled ${visited.size} pages for ${baseUrl}`);

        return visited;
    }

    // Crawl and merge pages from each base URL
    for (const baseUrl of baseUrls) {
        console.log(await crawlPage(baseUrl));
    }

    // mergedSitemapStream.end();

    // // Convert the stream to a string
    // const sitemapXML = await streamToPromise(mergedSitemapStream).then(data => data.toString());

    // // Write the sitemap.xml file
    // fs.writeFileSync('sitemap.xml', sitemapXML);
}

crawlAndGenerateSitemap()
    .then(_ => console.log('Sitemap generated successfully.'))
    .catch(error => console.error('Error generating sitemap:', error));
