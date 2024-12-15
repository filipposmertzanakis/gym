const express = require('express');
const News = require('../models/News');
const router = express.Router();

// Create a news article
router.post('/', async (req, res) => {
    try {
      const { title, content, category, author } = req.body;
      const newNews = new News({ title, content, category, author });
      await newNews.save();
      res.status(201).json(newNews);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Get all news articles (Admin function)
router.get('/', async (req, res) => {
    try {
        const newsArticles = await News.find();
        res.status(200).json(newsArticles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get news by ID
router.get('/:id', async (req, res) => {
    try {
        const newsArticle = await News.findById(req.params.id);
        if (!newsArticle) {
            return res.status(404).json({ message: 'News article not found' });
        }
        res.status(200).json(newsArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update news article by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: 'News article not found' });
        }
        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete news article by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedNews = await News.findByIdAndDelete(req.params.id);
        if (!deletedNews) {
            return res.status(404).json({ message: 'News article not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
