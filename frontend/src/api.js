// src/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default {
  analyzeStartup: (startup) => axios.post(`${API_URL}/analyze_startup`, startup).then(res => res.data),
  generateVisualization: (startups) => axios.post(`${API_URL}/generate_visualization`, startups).then(res => res.data),
  getSimilarStartups: (name) => axios.get(`${API_URL}/similar_startups/${name}`).then(res => res.data),
  analyzeWebsite: (url) => axios.post(`${API_URL}/analyze_website`, { url }).then(res => res.data),
};
