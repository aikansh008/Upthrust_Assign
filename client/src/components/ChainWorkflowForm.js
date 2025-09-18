import React, { useState } from 'react';
import { runWorkflowChain } from '../services/api';

const ChainWorkflowForm = ({ onSubmit, loading }) => {
  const [prompt, setPrompt] = useState('');
  const [workflows, setWorkflows] = useState([
    { action: 'weather', params: { location: '' } }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addWorkflow = () => {
    setWorkflows([...workflows, { action: 'weather', params: { location: '' } }]);
  };

  const removeWorkflow = (index) => {
    if (workflows.length > 1) {
      setWorkflows(workflows.filter((_, i) => i !== index));
    }
  };

  const updateWorkflow = (index, field, value) => {
    const updated = workflows.map((workflow, i) => {
      if (i === index) {
        if (field === 'action') {
          // Reset params when action changes
          const defaultParams = {
            weather: { location: '' },
            news: { query: '' },
            github: { username: '', repo: '' }
          };
          return { action: value, params: defaultParams[value] || {} };
        } else {
          return { 
            ...workflow, 
            params: { ...workflow.params, [field.replace('params.', '')]: value } 
          };
        }
      }
      return workflow;
    });
    setWorkflows(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Transform frontend data to backend format
      const actions = workflows.map(workflow => ({
        type: workflow.action,
        prompt: generateActionPrompt(workflow)
      }));

      const result = await runWorkflowChain({ 
        prompt: prompt || 'Execute the following workflow chain',
        actions 
      });
      onSubmit(result);
    } catch (error) {
      console.error('Chain workflow error:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateActionPrompt = (workflow) => {
    switch (workflow.action) {
      case 'weather':
        return `Get weather information for ${workflow.params.location || 'current location'}`;
      case 'news':
        return `Find news about ${workflow.params.query || 'current events'}`;
      case 'github':
        return workflow.params.username && workflow.params.repo 
          ? `Get information about ${workflow.params.username}/${workflow.params.repo} repository`
          : `Search for repositories by ${workflow.params.username || 'user'}`;
      default:
        return 'Execute this action';
    }
  };

  const renderParamInputs = (workflow, index) => {
    switch (workflow.action) {
      case 'weather':
        return (
          <input
            type="text"
            placeholder="Enter location (e.g., London, UK)"
            value={workflow.params.location || ''}
            onChange={(e) => updateWorkflow(index, 'params.location', e.target.value)}
            required
          />
        );
      case 'news':
        return (
          <input
            type="text"
            placeholder="Enter news topic"
            value={workflow.params.query || ''}
            onChange={(e) => updateWorkflow(index, 'params.query', e.target.value)}
            required
          />
        );
      case 'github':
        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="GitHub username"
              value={workflow.params.username || ''}
              onChange={(e) => updateWorkflow(index, 'params.username', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Repository name (optional)"
              value={workflow.params.repo || ''}
              onChange={(e) => updateWorkflow(index, 'params.repo', e.target.value)}
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="workflow-form">
      <h3>🔗 Chained Workflow</h3>
      <p>Create workflows that run multiple actions in sequence</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label>Overall Goal/Prompt:</label>
          <textarea
            placeholder="Describe what you want to achieve with this workflow chain..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="2"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        {workflows.map((workflow, index) => (
          <div key={index} className="chain-step" style={{
            border: '2px solid #e1e5e9',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            background: '#f8f9fa'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4>Step {index + 1}</h4>
              {workflows.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeWorkflow(index)}
                  style={{
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="form-group">
              <label>Action:</label>
              <select
                value={workflow.action}
                onChange={(e) => updateWorkflow(index, 'action', e.target.value)}
                required
              >
                <option value="weather">🌤️ Weather</option>
                <option value="news">📰 News</option>
                <option value="github">🐙 GitHub</option>
              </select>
            </div>

            <div className="form-group">
              <label>Parameters:</label>
              {renderParamInputs(workflow, index)}
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={addWorkflow}
            style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              cursor: 'pointer'
            }}
          >
            + Add Step
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? '⏳ Running Chain...' : '🚀 Run Workflow Chain'}
        </button>
      </form>
    </div>
  );
};

export default ChainWorkflowForm;