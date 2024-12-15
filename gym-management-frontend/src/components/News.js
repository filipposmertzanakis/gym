import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateNews = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    author: '', // You may fetch the user ID dynamically based on the logged-in user
    image: null, // Added for file upload
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

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Store the file in the image field
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('author', formData.author);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/news', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('News article created successfully!');
      setFormData({
        title: '',
        content: '',
        category: '',
        author: '',
        image: null,
      });

      // After successful creation, re-fetch the news articles
      const newResponse = await axios.get('http://localhost:5000/api/news');
      setNewsArticles(newResponse.data);

      // Hide the form after successful submission
      setIsFormVisible(false);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while creating the article.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>News Articles</h2>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      {/* Button to toggle the form visibility */}
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Cancel' : 'Create News Article'}
      </button>

      {/* Conditionally render the form based on isFormVisible state */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
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
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit">Create News</button>
        </form>
      )}

      {/* Display the list of news articles */}
      <h3>All News Articles</h3>
      {newsArticles.length === 0 ? (
        <p>No news articles found.</p>
      ) : (
        <ul>
          {newsArticles.map((article) => (
            <li key={article._id}>
              <h4>{article.title}</h4>
              {article.image && <img src={`http://localhost:5000${article.image}`} alt={article.title} style={{ maxWidth: '200px' }} />}
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
