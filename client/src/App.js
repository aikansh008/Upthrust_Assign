import React, { useState, useEffect } from 'react';
import { AuthProvider } from './auth/AuthContext';
import LoginButton from './auth/LoginButton';
import LogoutButton from './auth/LogoutButton';
import UserProfile from './auth/UserProfile';
import ProtectedRoute from './auth/ProtectedRoute';
import WorkflowForm from './components/WorkflowForm';
import ChainWorkflowForm from './components/ChainWorkflowForm';
import ResultDisplay from './components/ResultDisplay';
import HistoryDisplay from './components/HistoryDisplay';
import { runWorkflow, getHistory } from './services/api';

function App() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [workflowMode, setWorkflowMode] = useState('single'); // 'single' or 'chain'

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const historyData = await getHistory();
      setHistory(historyData.history || []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const handleWorkflowSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const workflowResult = await runWorkflow(formData);
      setResult(workflowResult);
      
      // Refresh history after successful workflow
      setTimeout(fetchHistory, 1000);
    } catch (err) {
      setError(err.message || 'Failed to run workflow');
    } finally {
      setLoading(false);
    }
  };

  const handleChainSubmit = async (chainResult) => {
    setResult(chainResult);
    // Refresh history after successful chain
    setTimeout(fetchHistory, 1000);
  };

  return (
    <AuthProvider>
      <div className="container">
        <header className="header">
          <h1>🚀 Upthrust Workflow Automation</h1>
          <p>AI-powered workflows with third-party API integration</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
            <LoginButton />
            <LogoutButton />
            <UserProfile />
          </div>
        </header>

        {/* Temporarily remove ProtectedRoute wrapper for testing */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setWorkflowMode('single')}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: workflowMode === 'single' ? '2px solid #007bff' : '2px solid #e1e5e9',
              background: workflowMode === 'single' ? '#007bff' : 'white',
              color: workflowMode === 'single' ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            📋 Single Workflow
          </button>
          <button
            onClick={() => setWorkflowMode('chain')}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: workflowMode === 'chain' ? '2px solid #007bff' : '2px solid #e1e5e9',
              background: workflowMode === 'chain' ? '#007bff' : 'white',
              color: workflowMode === 'chain' ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🔗 Workflow Chain
          </button>
        </div>

        {workflowMode === 'single' ? (
          <WorkflowForm 
            onSubmit={handleWorkflowSubmit} 
            loading={loading} 
          />
        ) : (
          <ChainWorkflowForm 
            onSubmit={handleChainSubmit} 
            loading={loading} 
          />
        )}

        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <ResultDisplay result={result} />
        )}

        <HistoryDisplay history={history} />
      </div>
    </AuthProvider>
  );
}

export default App;