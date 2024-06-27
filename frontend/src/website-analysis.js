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

