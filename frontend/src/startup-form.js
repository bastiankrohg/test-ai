// src/App.js
import React, { useState } from 'react';
import StartupForm from './components/StartupForm';
import WebsiteAnalysis from './components/WebsiteAnalysis';

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
