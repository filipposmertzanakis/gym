require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/News');
const connectDB = require('./database');

connectDB();

// Example document
const createNews = async () => {
  try {
    const newsArticle = new News({
      title: 'Breaking News',
      content: 'This is the content of the breaking news.',
      category: 'Politics',
      author: '63e2b4a9876543210abcdef1', // Replace with a valid User ID
      tags: ['Breaking', 'Politics'],
      status: 'draft',
    });

    const savedNews = await newsArticle.save();
    console.log('News article saved:', savedNews);
  } catch (error) {
    console.error('Error saving news article:', error);
  }
};

createNews();
