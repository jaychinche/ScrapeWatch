const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  link: String,
  publishedAt: Date,
});

module.exports = mongoose.model('News', newsSchema);
