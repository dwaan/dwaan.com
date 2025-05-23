import fs from "fs"
import axios from "axios"
import * as cheerio from 'cheerio'

// Define your website's base URL
const baseUrls = ['https://dwaan.com', 'https://v1.dwaan.com']

async function crawlAndGenerateSitemap() {
    async function crawlPage(baseUrl) {
        const visited = new Set()

        async function crawlInternalPage(url) {
            if (visited.has(url) || visited.has(url + '/')) return

            try {
                const response = await axios.get(url)
                const $ = cheerio.load(response.data)

                visited.add(url)

                // Find and crawl internal links
                const internalLinks = []
                $('a').each((_, element) => {
                    const href = $(element).attr('href')
                    if (href && href.startsWith('/') && !href.includes('/menu') && !href.includes('/plurk-api') && !href.includes('/img')) internalLinks.push(baseUrl + href)
                })

                for (const link of internalLinks) {
                    await crawlInternalPage(link)
                }
            } catch (error) {
                if (error.config.url) console.log("Found missing link:", error.config.url)
                else console.log("Error occured")
            }
        }

        // Start crawling from the homepage of the current base URL
        await crawlInternalPage(baseUrl)

        console.log(`Crawled ${visited.size} pages for ${baseUrl}`)

        return visited
    }

    // Crawl and merge pages from each base URL
    let urls = new Set()
    for (const baseUrl of baseUrls) {
        const result = await crawlPage(baseUrl)
        urls = new Set([...urls, ...result])
    }

    // Create sitemap
    const maps = []
    for (const url of urls) {
        maps.push(`<url><loc>${url}</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`)
    }
    // Create an XML string manually
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${maps.join('')}</urlset>`

    // Write the sitemap.xml file
    fs.writeFileSync('v2/sitemap.xml', xml, "utf8")
}

crawlAndGenerateSitemap()
    .then(_ => console.log('Sitemap generated successfully.'))
    .catch(error => console.error('Error generating sitemap:', error))
