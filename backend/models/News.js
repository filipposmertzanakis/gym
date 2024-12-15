// Example News model (mongoose schema)
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true }, // assuming UserID or name
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
