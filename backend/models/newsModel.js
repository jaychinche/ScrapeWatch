const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\//.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('News', newsSchema);