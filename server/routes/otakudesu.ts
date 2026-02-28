import { Hono } from 'hono'
import axios from 'axios'
import * as cheerio from 'cheerio'

const otakudesu = new Hono()

const BASE_URL = 'https://otakudesu.best'
const AJAX_URL = `${BASE_URL}/wp-admin/admin-ajax.php`

// Headers to mimic a real browser
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Origin': BASE_URL,
  'Referer': BASE_URL
}

otakudesu.get('/home', async (c) => {
  try {
    const { data } = await axios.get(BASE_URL, { headers: HEADERS })
    const $ = cheerio.load(data)
    
    const ongoing: any[] = []
    $('.venz ul').first().find('li').each((i, el) => {
      const title = $(el).find('h2.jdlflm').text().trim()
      const episode = $(el).find('.epz').text().trim()
      const day = $(el).find('.epztipe').text().trim()
      const date = $(el).find('.newnime').text().trim()
      const thumb = $(el).find('img').attr('src')
      const url = $(el).find('a').attr('href')
      const slug = url ? url.split('/').filter(Boolean).pop() : ''

      if (title) {
        ongoing.push({
          title,
          episode,
          day,
          date,
          thumb,
          slug
        })
      }
    })

    const complete: any[] = []
    $('.venz ul').eq(1).find('li').each((i, el) => {
        const title = $(el).find('h2.jdlflm').text().trim()
        const episode = $(el).find('.epz').text().trim()
        const score = $(el).find('.epztipe').text().trim()
        const date = $(el).find('.newnime').text().trim()
        const thumb = $(el).find('img').attr('src')
        const url = $(el).find('a').attr('href')
        const slug = url ? url.split('/').filter(Boolean).pop() : ''
  
        if (title) {
          complete.push({
            title,
            episode,
            score,
            date,
            thumb,
            slug
          })
        }
      })

    return c.json({
      ongoing,
      complete
    })
  } catch (error: any) {
    console.error('Error scraping home:', error.message)
    return c.json({ error: 'Failed to scrape home' }, 500)
  }
})

otakudesu.get('/schedule', async (c) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/jadwal-rilis/`, { headers: HEADERS })
    const $ = cheerio.load(data)
    
    const schedule: any[] = []
    $('.kglist321').each((i, el) => {
      const day = $(el).find('h2').text().trim()
      const animeList: any[] = []
      
      $(el).find('ul li').each((j, li) => {
        const title = $(li).find('a').text().trim()
        const url = $(li).find('a').attr('href')
        const slug = url ? url.split('/').filter(Boolean).pop() : ''
        
        if (title) {
          animeList.push({ title, slug })
        }
      })

      if (day && animeList.length > 0) {
        schedule.push({ day, animeList })
      }
    })

    return c.json(schedule)
  } catch (error: any) {
    console.error('Error scraping schedule:', error.message)
    return c.json({ error: 'Failed to scrape schedule' }, 500)
  }
})

otakudesu.get('/complete', async (c) => {
  const page = c.req.query('page') || '1'
  const url = page === '1' ? `${BASE_URL}/complete-anime/` : `${BASE_URL}/complete-anime/page/${page}/`

  try {
    const { data } = await axios.get(url, { headers: HEADERS })
    const $ = cheerio.load(data)
    
    const complete: any[] = []
    $('.venz ul li').each((i, el) => {
      const title = $(el).find('h2.jdlflm').text().trim()
      const episode = $(el).find('.epz').text().trim()
      const score = $(el).find('.epztipe').text().trim()
      const date = $(el).find('.newnime').text().trim()
      const thumb = $(el).find('img').attr('src')
      const animeUrl = $(el).find('a').attr('href')
      const slug = animeUrl ? animeUrl.split('/').filter(Boolean).pop() : ''

      if (title) {
        complete.push({
          title,
          episode,
          score,
          date,
          thumb,
          slug
        })
      }
    })

    return c.json(complete)
  } catch (error: any) {
    console.error('Error scraping complete anime:', error.message)
    return c.json({ error: 'Failed to scrape complete anime' }, 500)
  }
})

otakudesu.get('/ongoing', async (c) => {
  const page = c.req.query('page') || '1'
  const url = page === '1' ? `${BASE_URL}/ongoing-anime/` : `${BASE_URL}/ongoing-anime/page/${page}/`

  try {
    const { data } = await axios.get(url, { headers: HEADERS })
    const $ = cheerio.load(data)
    
    const ongoing: any[] = []
    $('.venz ul li').each((i, el) => {
      const title = $(el).find('h2.jdlflm').text().trim()
      const episode = $(el).find('.epz').text().trim()
      const day = $(el).find('.epztipe').text().trim()
      const date = $(el).find('.newnime').text().trim()
      const thumb = $(el).find('img').attr('src')
      const animeUrl = $(el).find('a').attr('href')
      const slug = animeUrl ? animeUrl.split('/').filter(Boolean).pop() : ''

      if (title) {
        ongoing.push({
          title,
          episode,
          day,
          date,
          thumb,
          slug
        })
      }
    })

    return c.json(ongoing)
  } catch (error: any) {
    console.error('Error scraping ongoing anime:', error.message)
    return c.json({ error: 'Failed to scrape ongoing anime' }, 500)
  }
})

otakudesu.get('/search', async (c) => {
  const query = c.req.query('q')
  if (!query) return c.json({ error: 'Missing query parameter q' }, 400)
  
  const url = `${BASE_URL}/?s=${encodeURIComponent(query)}&post_type=anime`

  try {
    const { data } = await axios.get(url, { headers: HEADERS })
    const $ = cheerio.load(data)
    
    const results: any[] = []
    $('.chivsrc li').each((i, el) => {
      const title = $(el).find('h2 a').text().trim()
      const animeUrl = $(el).find('h2 a').attr('href')
      const thumb = $(el).find('img').attr('src')
      const genres: string[] = []
      $(el).find('.set').first().find('a').each((j, a) => {
          genres.push($(a).text().trim())
      })
      const status = $(el).find('.set').eq(1).text().replace('Status :', '').trim()
      const rating = $(el).find('.set').eq(2).text().replace('Rating :', '').trim()
      const slug = animeUrl ? animeUrl.split('/').filter(Boolean).pop() : ''

      if (title) {
        results.push({
          title,
          thumb,
          genres,
          status,
          rating,
          slug
        })
      }
    })

    return c.json(results)
  } catch (error: any) {
    console.error('Error searching anime:', error.message)
    return c.json({ error: 'Failed to search anime' }, 500)
  }
})

otakudesu.get('/anime/:slug', async (c) => {
  const slug = c.req.param('slug')
  const url = `${BASE_URL}/anime/${slug}/`

  try {
    const { data } = await axios.get(url, { headers: HEADERS })
    const $ = cheerio.load(data)
    
    const info: any = {}
    $('.infozin .infozingle p').each((i, el) => {
      const text = $(el).text()
      if (text.includes('Judul')) info.title = text.replace('Judul:', '').trim()
      if (text.includes('Japanese')) info.japanese = text.replace('Japanese:', '').trim()
      if (text.includes('Skor')) info.score = text.replace('Skor:', '').trim()
      if (text.includes('Produser')) info.producer = text.replace('Produser:', '').trim()
      if (text.includes('Tipe')) info.type = text.replace('Tipe:', '').trim()
      if (text.includes('Status')) info.status = text.replace('Status:', '').trim()
      if (text.includes('Total Episode')) info.total_episode = text.replace('Total Episode:', '').trim()
      if (text.includes('Durasi')) info.duration = text.replace('Durasi:', '').trim()
      if (text.includes('Tanggal Rilis')) info.release_date = text.replace('Tanggal Rilis:', '').trim()
      if (text.includes('Studio')) info.studio = text.replace('Studio:', '').trim()
      if (text.includes('Genre')) {
        info.genres = []
        $(el).find('a').each((j, a) => {
          info.genres.push($(a).text().trim())
        })
      }
    })

    const thumb = $('.fotoanime img').attr('src')
    const synopsis = $('.sinopc').text().trim()

    let batch_link: any = null
    const episode_list: any[] = []
    
    $('.episodelist').each((i, el) => {
      const titleText = $(el).find('.monktit').text()
      
      if (titleText.includes('Batch')) {
        const a = $(el).find('a').first()
        const batchUrl = a.attr('href')
        batch_link = {
          title: a.text().trim(),
          slug: batchUrl ? batchUrl.split('/').filter(Boolean).pop() : ''
        }
      } else {
        $(el).find('ul li').each((j, li) => {
          const title = $(li).find('a').text().trim()
          const episodeUrl = $(li).find('a').attr('href')
          const slug = episodeUrl ? episodeUrl.split('/').filter(Boolean).pop() : ''
          const date = $(li).find('.zeebr').text().trim()
          
          if (title) {
            episode_list.push({ title, slug, date })
          }
        })
      }
    })

    return c.json({
      ...info,
      thumb,
      synopsis,
      batch_link,
      episode_list
    })
  } catch (error: any) {
    console.error('Error scraping anime detail:', error.message)
    return c.json({ error: 'Failed to scrape anime detail' }, 500)
  }
})

otakudesu.get('/batch/:slug', async (c) => {
  const slug = c.req.param('slug')
  const url = `${BASE_URL}/batch/${slug}/`

  try {
    const { data } = await axios.get(url, { headers: HEADERS })
    const $ = cheerio.load(data)
    
    const title = $('.jdlrx h1').text().trim()
    const thumb = $('.imganime img').attr('src')
    
    const download_list: any[] = []
    $('.batchlink').each((i, el) => {
      const batchTitle = $(el).find('h4').text().trim()
      const links: any[] = []
      
      $(el).find('ul li').each((j, li) => {
        const quality = $(li).find('strong').text().trim()
        const size = $(li).find('i').text().trim()
        const downloadLinks: any[] = []
        
        $(li).find('a').each((k, a) => {
          downloadLinks.push({
            name: $(a).text().trim(),
            url: $(a).attr('href')
          })
        })
        
        links.push({ quality, size, links: downloadLinks })
      })
      
      download_list.push({ title: batchTitle, links })
    })

    return c.json({
      title,
      thumb,
      download_list
    })
  } catch (error: any) {
    console.error('Error scraping batch:', error.message)
    return c.json({ error: 'Failed to scrape batch' }, 500)
  }
})

otakudesu.get('/genres', async (c) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/genre-list/`, { headers: HEADERS })
    const $ = cheerio.load(data)
    
    const genres: any[] = []
    $('.genres li a').each((i, el) => {
      const name = $(el).text().trim()
      const url = $(el).attr('href')
      const slug = url ? url.split('/').filter(Boolean).pop() : ''
      
      if (name && slug) {
        genres.push({ name, slug })
      }
    })

    return c.json(genres)
  } catch (error: any) {
    console.error('Error scraping genres:', error.message)
    return c.json({ error: 'Failed to scrape genres' }, 500)
  }
})

otakudesu.get('/genres/:slug', async (c) => {
  const slug = c.req.param('slug')
  const page = c.req.query('page') || '1'
  const url = page === '1' ? `${BASE_URL}/genres/${slug}/` : `${BASE_URL}/genres/${slug}/page/${page}/`

  try {
    const { data } = await axios.get(url, { headers: HEADERS })
    const $ = cheerio.load(data)
    
    const results: any[] = []
    $('.col-anime').each((i, el) => {
      const title = $(el).find('.col-anime-title a').text().trim()
      const studio = $(el).find('.col-anime-studio').text().trim()
      const eps = $(el).find('.col-anime-eps').text().trim()
      const rating = $(el).find('.col-anime-rating').text().trim()
      const thumb = $(el).find('.col-anime-cover img').attr('src')
      const animeUrl = $(el).find('.col-anime-title a').attr('href')
      const animeSlug = animeUrl ? animeUrl.split('/').filter(Boolean).pop() : ''
      const date = $(el).find('.col-anime-date').text().trim()
      
      const genres: string[] = []
      $(el).find('.col-anime-genre a').each((j, a) => {
          genres.push($(a).text().trim())
      })

      if (title) {
        results.push({
          title,
          studio,
          eps,
          rating,
          thumb,
          slug: animeSlug,
          date,
          genres
        })
      }
    })

    return c.json(results)
  } catch (error: any) {
    console.error('Error scraping genre detail:', error.message)
    return c.json({ error: 'Failed to scrape genre detail' }, 500)
  }
})

otakudesu.get('/anime-list', async (c) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/anime-list/`, { headers: HEADERS })
    const $ = cheerio.load(data)
    
    const animeList: any[] = []
    $('.bariskelom').each((i, el) => {
      const letter = $(el).find('.barispenz a').text().trim()
      const list: any[] = []
      
      $(el).find('.jdlbar ul li a.hodebgst').each((j, a) => {
        const title = $(a).text().trim()
        const url = $(a).attr('href')
        const slug = url ? url.split('/').filter(Boolean).pop() : ''
        
        if (title) {
          list.push({ title, slug })
        }
      })

      if (letter && list.length > 0) {
        animeList.push({ letter, list })
      }
    })

    return c.json(animeList)
  } catch (error: any) {
    console.error('Error scraping anime list:', error.message)
    return c.json({ error: 'Failed to scrape anime list' }, 500)
  }
})

otakudesu.get('/episode/:slug', async (c) => {
  const slug = c.req.param('slug')
  const url = `${BASE_URL}/episode/${slug}/`

  try {
    const { data } = await axios.get(url, { headers: HEADERS })
    const $ = cheerio.load(data)

    const title = $('.venutama .posttl').text().trim() || $('title').text().trim()
    
    // Default Stream (usually the one loaded in iframe)
    const defaultStream = $('iframe#myIframe').attr('src') || $('iframe').first().attr('src')

    // Mirrors
    const mirrors: any[] = []
    $('.mirrorstream ul li a').each((i, el) => {
      const name = $(el).text().trim()
      const content = $(el).attr('data-content')
      if (name && content) {
        try {
            const payload = JSON.parse(atob(content))
            mirrors.push({
                name,
                payload
            })
        } catch (e) {
            console.error('Failed to parse mirror content', e)
        }
      }
    })

    return c.json({
      title,
      defaultStream,
      mirrors
    })
  } catch (error: any) {
    console.error('Error scraping episode:', error.message)
    return c.json({ error: 'Failed to scrape episode' }, 500)
  }
})

otakudesu.post('/stream', async (c) => {
    try {
        const body = await c.req.json()
        const { payload } = body
        
        if (!payload) {
            return c.json({ error: 'Missing payload' }, 400)
        }

        // Step 1: Get Nonce
        const nonceResponse = await axios.post(AJAX_URL, 
            new URLSearchParams({ action: 'aa1208d27f29ca340c92c66d1926f13f' }), 
            { headers: HEADERS }
        )
        
        const nonce = nonceResponse.data.data
        if (!nonce) {
            return c.json({ error: 'Failed to retrieve nonce' }, 500)
        }

        // Step 2: Get Stream HTML
        const streamResponse = await axios.post(AJAX_URL,
            new URLSearchParams({
                ...payload,
                nonce,
                action: '2a3505c93b0035d3f455df82bf976b84'
            }),
            { headers: HEADERS }
        )

        const streamHtmlBase64 = streamResponse.data.data
        const streamHtml = atob(streamHtmlBase64)
        
        // Extract iframe src from the HTML
        const $ = cheerio.load(streamHtml)
        const iframeSrc = $('iframe').attr('src')

        return c.json({
            iframe: iframeSrc,
            html: streamHtml
        })

    } catch (error: any) {
        console.error('Error fetching stream:', error.message)
        return c.json({ error: 'Failed to fetch stream' }, 500)
    }
})

export default otakudesu
