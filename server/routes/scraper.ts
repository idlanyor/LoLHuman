import { Hono } from 'hono'
import axios from 'axios'
import * as cheerio from 'cheerio'

const scraper = new Hono()

scraper.get('/test', async (c) => {
  try {
    const { data } = await axios.get('https://example.com')
    const $ = cheerio.load(data)
    const title = $('title').text()
    return c.json({ title, message: 'Scraping successful' })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to scrape' }, 500)
  }
})

scraper.get('/tiktok', async (c) => {
  const url = c.req.query('url')
  if (!url) return c.json({ error: 'Missing url parameter' }, 400)

  try {
    const { data } = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`)
    if (data.code === 0) {
      const video = data.data
      return c.json({
        title: video.title,
        author: video.author.nickname,
        cover: video.cover,
        nowm: `https://www.tikwm.com${video.play}`,
        music: `https://www.tikwm.com${video.music}`,
        stats: {
            views: video.play_count,
            likes: video.digg_count,
            comments: video.comment_count,
            shares: video.share_count
        }
      })
    } else {
      return c.json({ error: data.msg || 'Failed to download TikTok' }, 500)
    }
  } catch (error: any) {
    console.error('Error tiktok downloader:', error.message)
    return c.json({ error: 'Failed to fetch tiktok data' }, 500)
  }
})

scraper.get('/sholat/cities', async (c) => {
  try {
    const { data } = await axios.get('https://api.myquran.com/v2/sholat/kota/semua')
    return c.json(data.data)
  } catch (error: any) {
    return c.json({ error: 'Failed to fetch cities' }, 500)
  }
})

scraper.get('/sholat/:cityId', async (c) => {
  const cityId = c.req.param('cityId')
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()

  try {
    const { data } = await axios.get(`https://api.myquran.com/v2/sholat/jadwal/${cityId}/${y}/${m}/${d}`)
    return c.json(data.data)
  } catch (error: any) {
    return c.json({ error: 'Failed to fetch prayer schedule' }, 500)
  }
})

export default scraper
