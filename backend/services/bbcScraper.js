// backend/services/bbcScraper.js
const axios = require('axios');
const cheerio = require('cheerio');
const News = require('../models/newsModel');

const scrapeBBCNews = async () => {
  try {
    const { data } = await axios.get('https://www.bbc.com/news', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    const articles = [];

    // More robust scraping logic
    $('a[href*="/news/"]').each((i, elem) => {
      const $elem = $(elem);
      const title = $elem.find('h3').text().trim() || $elem.text().trim();
      const link = $elem.attr('href');

      if (title && link && !link.includes('/av/')) {
        articles.push({
          title,
          link: link.startsWith('http') ? link : `https://www.bbc.com${link}`,
          publishedAt: new Date()
        });
      }
    });

    if (articles.length === 0) {
      throw new Error('No articles found');
    }

    await News.deleteMany({});
    await News.insertMany(articles);

    return { 
      success: true, 
      count: articles.length
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return { 
      success: false, 
      error: error.message
    };
  }
};

module.exports = scrapeBBCNews;