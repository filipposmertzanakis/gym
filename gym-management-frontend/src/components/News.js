import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import '../styles/News.css'; // Import the CSS file

const CreateNews = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    author: '', // You may fetch the user ID dynamically based on the logged-in user
  });

  const [newsArticles, setNewsArticles] = useState([]); // State to store fetched news articles
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility

  // Fetch all news articles on component mount
  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news');
        setNewsArticles(response.data);
      } catch (error) {
        setError('An error occurred while fetching the articles.');
      }
    };

    fetchNewsArticles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const dataToSend = {
        ...formData,
        author: user.username,
      };

      const response = await axios.post('http://localhost:5000/api/news', dataToSend);
      setSuccessMessage('News article created successfully!');
      setFormData({
        title: '',
        content: '',
        category: '',
        author: '',
      });

      // After successful creation, re-fetch the news articles
      const newResponse = await axios.get('http://localhost:5000/api/news');
      setNewsArticles(newResponse.data);
      setIsFormVisible(false);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while creating the article.');
    }
  };

  return (
    <div className="news-container">
      <h2>Create News Article</h2>
      {error && <div className="news-error">{error}</div>}
      {successMessage && <div className="news-success">{successMessage}</div>}
       {/* Button to toggle the form visibility */}
       <button
        className="toggle-form-btn"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? 'Cancel' : 'Create News Article'}
      </button>
      {isFormVisible && (
      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-group">
          <label htmlFor="news-title">Title:</label>
          <input
            type="text"
            id="news-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="news-content">Content:</label>
          <textarea
            id="news-content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="news-category">Category:</label>
          <input
            type="text"
            id="news-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Author (User ID):</label>
          {user ? <p>{user.username}</p> : <p>No user logged in</p>}
        </div>

        <button type="submit" className="submit-btn">Create News</button>
      </form>
            )}

      <div className="news-articles">
        <h3>All News Articles</h3>
        {newsArticles.length === 0 ? (
          <p>No news articles found.</p>
        ) : (
          <ul>
            {newsArticles.map((article) => (
              <li key={article._id}>
                <h4>{article.title}</h4>
                <p>{article.content}</p>
                <p><strong>Category:</strong> {article.category}</p>
                <p><strong>Author:</strong> {article.author}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateNews;
