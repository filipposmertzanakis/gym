import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Article.css'; // pernao to css

const ArticlePage = () => {
  const { articleId } = useParams(); // eksagogi onomatos arthrou apo to url
  const navigate = useNavigate();

  const [article, setArticle] = useState(null); // State gia apothikefsi leptomereion arthrou
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/news/${articleId}`);
        setArticle(response.data);
      } catch (error) {
        setError('An error occurred while fetching the article.');
      }
    };

    fetchArticle();
  }, [articleId]);

  return (
    <div className="article-page-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      {error ? (
        <div className="article-error">{error}</div>
      ) : article ? (
        <div className="article-content">
          <h1 className="article-title">{article.title}</h1>
          <p className="article-meta">
            <strong>Category:</strong> {article.category} | <strong>Author:</strong> {article.author}
          </p>
          <div className="article-body">
            <p>{article.content}</p>
          </div>
        </div>
      ) : (
        <p>Loading article...</p>
      )}
    </div>
  );
};

export default ArticlePage;
