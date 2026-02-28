import { Hono } from 'hono'
import axios from 'axios'
import * as cheerio from 'cheerio'

const neonime = new Hono()

const BASE_URL = 'https://otakupoi.org/neonime'
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

neonime.get('/home', async (c) => {
  try {
    const { data } = await axios.get(BASE_URL, { headers: HEADERS })
    const $ = cheerio.load(data)
    
    const ongoing: any[] = []
    const complete: any[] = []

    $('.panel.shadow').each((i, el) => {
        const title = $(el).find('a').text().trim()
        
        const items: any[] = []
        let current = $(el).next()
        while (current.length && current.hasClass('xrelated')) {
            const itemA = current.find('a')
            const url = itemA.attr('href')
            const slug = url ? url.split('/').filter(Boolean).pop() : ''
            items.push({
                title: current.find('.titlelist').text().trim(),
                thumb: current.find('img').attr('src'),
                ep: current.find('.eplist').text().trim(),
                rating: current.find('.starlist').text().trim(),
                slug
            })
            current = current.next()
        }

        if (title.includes('On-Going')) {
            ongoing.push(...items)
        } else if (title.includes('Completed')) {
            complete.push(...items)
        }
    })

    return c.json({ ongoing, complete })
  } catch (error: any) {
    console.error('Error scraping Neonime home:', error.message)
    return c.json({ error: 'Failed to scrape home' }, 500)
  }
})

neonime.get('/search', async (c) => {
    const query = c.req.query('q')
    if (!query) return c.json({ error: 'Missing query q' }, 400)
    const url = `${BASE_URL}/search/?q=${encodeURIComponent(query)}`
    try {
        const { data } = await axios.get(url, { headers: HEADERS })
        const $ = cheerio.load(data)
        const results: any[] = []
        $('.xrelated').each((i, el) => {
            const itemA = $(el).find('a')
            const url = itemA.attr('href')
            const slug = url ? url.split('/').filter(Boolean).pop() : ''
            results.push({
                title: $(el).find('.titlelist').text().trim(),
                thumb: $(el).find('img').attr('src'),
                ep: $(el).find('.eplist').text().trim(),
                rating: $(el).find('.starlist').text().trim(),
                slug
            })
        })
        return c.json(results)
    } catch (error: any) {
        return c.json({ error: 'Failed to search' }, 500)
    }
})

neonime.get('/anime/:slug', async (c) => {
    const slug = c.req.param('slug')
    const url = `${BASE_URL}/${slug}/`
    try {
        const { data } = await axios.get(url, { headers: HEADERS })
        const $ = cheerio.load(data)
        
        const title = $('.title-post').text().trim()
        const thumb = $('.thumbhd img').attr('src')
        const synopsis = $('.sinops').text().trim()
        
        const info: any = {}
        $('.infolist li').each((i, el) => {
            const label = $(el).find('b').text().replace(':', '').trim()
            const value = $(el).text().replace($(el).find('b').text(), '').trim()
            if (label) info[label.toLowerCase().replace(/ /g, '_')] = value
        })

        const episode_list: any[] = []
        $('.bottom-line a.othereps').each((i, el) => {
            const a = $(el)
            const epUrl = a.attr('href')
            // Neonime often uses /watch/slug
            const epSlug = epUrl ? epUrl.split('/').filter(Boolean).pop() : ''
            episode_list.push({
                title: a.text().trim(),
                slug: epSlug
            })
        })

        return c.json({ title, thumb, synopsis, info, episode_list })
    } catch (error: any) {
        return c.json({ error: 'Failed to scrape detail' }, 500)
    }
})

export default neonime