// backend/controllers/newsController.js
const News = require('../models/newsModel');
const scrapeBBCNews = require('../services/bbcScraper'); // Updated path
// Get all news
const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const news = await News.find()
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await News.countDocuments();

    res.json({
      data: news,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Scrape news
const scrapeNews = async (req, res) => {
  try {
    const result = await scrapeBBCNews();
    if (result.success) {
      res.json({ 
        message: `Successfully scraped ${result.count} articles`,
        count: result.count
      });
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllNews,
  scrapeNews
};