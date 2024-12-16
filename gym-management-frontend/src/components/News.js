import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

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
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Create News Article</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
       {/* Button to toggle the form visibility */}
       <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Cancel' : 'Create News Article'}
      </button>
      {isFormVisible && (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Author (User ID):</label>
          {user ? <p>{user.username}</p> : <p>No user logged in</p>}
        </div>

        <button type="submit">Create News</button>
      </form>
            )}

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
  );
};

export default CreateNews;
