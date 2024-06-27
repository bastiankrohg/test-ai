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
