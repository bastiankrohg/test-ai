// src/App.js
import React, { useState } from 'react';
import StartupForm from './components/StartupForm';
import Analysis from './components/Analysis';
import WebsiteAnalysis from './components/WebsiteAnalysis';
import Visualization from './components/Visualization';
import SimilarStartups from './components/SimilarStartups';
import api from './api';

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [websiteAnalysis, setWebsiteAnalysis] = useState(null);
  const [visualizationData, setVisualizationData] = useState(null);
  const [similarStartups, setSimilarStartups] = useState(null);

  const handleAnalyzeStartup = async (startupData) => {
    try {
      const result = await api.analyzeStartup(startupData);
      setAnalysis(result.analysis);
      setWebsiteAnalysis(result.website_analysis);
      const similar = await api.getSimilarStartups(startupData.name);
      setSimilarStartups(similar.similar_startups);
    } catch (error) {
      console.error('Error analyzing startup:', error);
    }
  };

  // ... (keep other existing methods)

  return (
    <div className="App">
      <h1>Startup Analysis Tool</h1>
      <StartupForm onSubmit={handleAnalyzeStartup} onVisualize={handleGenerateVisualization} />
      {analysis && <Analysis analysis={analysis} />}
      {websiteAnalysis && <WebsiteAnalysis analysis={websiteAnalysis} />}
      {visualizationData && <Visualization data={visualizationData} />}
      {similarStartups && <SimilarStartups startups={similarStartups} />}
    </div>
  );
}

export default App;

// src/components/StartupForm.js
import React, { useState } from 'react';

function StartupForm({ onSubmit, onVisualize }) {
  const [startup, setStartup] = useState({
    name: '',
    description: '',
    industry: '',
    funding: '',
    website: ''
  });

  const handleChange = (e) => {
    setStartup({ ...startup, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(startup);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={startup.name} onChange={handleChange} placeholder="Startup Name" required />
      <input name="description" value={startup.description} onChange={handleChange} placeholder="Description" required />
      <input name="industry" value={startup.industry} onChange={handleChange} placeholder="Industry" required />
      <input name="funding" value={startup.funding} onChange={handleChange} placeholder="Funding" required />
      <input name="website" value={startup.website} onChange={handleChange} placeholder="Website URL" required type="url" />
      <button type="submit">Analyze Startup</button>
      <button type="button" onClick={() => onVisualize(startup)}>Generate Visualization</button>
    </form>
  );
}

export default StartupForm;

// src/components/WebsiteAnalysis.js
import React from 'react';

function WebsiteAnalysis({ analysis }) {
  return (
    <div className="website-analysis">
      <h2>Website Analysis</h2>
      <pre>{analysis}</pre>
    </div>
  );
}

export default WebsiteAnalysis;

// src/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default {
  analyzeStartup: (startup) => axios.post(`${API_URL}/analyze_startup`, startup).then(res => res.data),
  generateVisualization: (startups) => axios.post(`${API_URL}/generate_visualization`, startups).then(res => res.data),
  getSimilarStartups: (name) => axios.get(`${API_URL}/similar_startups/${name}`).then(res => res.data),
  analyzeWebsite: (url) => axios.post(`${API_URL}/analyze_website`, { url }).then(res => res.data),
};
