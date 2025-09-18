import React, { useState } from 'react';

const WorkflowForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    prompt: '',
    action: 'weather'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.prompt.trim()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="workflow-form">
      <h2>Create New Workflow</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="prompt">Enter your prompt:</label>
          <input
            type="text"
            id="prompt"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            placeholder="e.g., Write a tweet about today's weather"
            maxLength="500"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="action">Select API:</label>
          <select
            id="action"
            name="action"
            value={formData.action}
            onChange={handleChange}
            required
          >
            <option value="weather">Weather API</option>
            <option value="github">GitHub Trending</option>
            <option value="news">Top News</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading || !formData.prompt.trim()}
        >
          {loading ? '🔄 Running Workflow...' : '🚀 Run Workflow'}
        </button>
      </form>
    </div>
  );
};

export default WorkflowForm;