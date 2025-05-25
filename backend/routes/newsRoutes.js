// backend/routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const { getAllNews, scrapeNews } = require('../controllers/newsController');

router.get('/news', getAllNews);
router.post('/scrape', scrapeNews);

module.exports = router;