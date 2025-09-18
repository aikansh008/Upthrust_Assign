import React from 'react';

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  // Check if this is a chain workflow result
  const isChainResult = result.results && Array.isArray(result.results);

  if (isChainResult) {
    return (
      <div className="result-section">
        <h2>✅ Workflow Result</h2>
        
        {/* Chain Summary */}
        <div className="chain-summary" style={{
          background: '#f8f9fa',
          border: '2px solid #e1e5e9',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <h3>📊 Chain Summary</h3>
          <p><strong>Chain Name:</strong> {result.chainName}</p>
          <p><strong>Total Steps:</strong> {result.totalSteps}</p>
          <p><strong>Completed:</strong> {result.completedSteps} ✅</p>
          <p><strong>Failed:</strong> {result.failedSteps} ❌</p>
          <p><strong>Executed At:</strong> {new Date(result.executedAt).toLocaleString()}</p>
        </div>

        {/* Individual Steps */}
        {result.results.map((step, index) => (
          <div key={index} className="chain-step-result" style={{
            border: '2px solid #e1e5e9',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            background: step.error ? '#fff5f5' : '#f8fff8'
          }}>
            <h3>Step {step.step}: {step.action} 
              {step.cached && <span style={{ color: '#28a745', fontSize: '0.8em' }}> 📦 CACHED</span>}
              {step.execution_time_ms && <span style={{ color: '#6c757d', fontSize: '0.8em' }}> ({step.execution_time_ms}ms)</span>}
            </h3>
            
            {step.error ? (
              <div className="result-item">
                <h4 style={{ color: '#dc3545' }}>❌ Error</h4>
                <p style={{ color: '#dc3545' }}>{step.error}</p>
              </div>
            ) : (
              <>
                <div className="result-item">
                  <h4>🤖 AI Response</h4>
                  <p>{step.ai_response}</p>
                </div>

                <div className="result-item">
                  <h4>📡 API Response</h4>
                  <p>{step.api_response}</p>
                </div>

                <div className="result-item">
                  <h4>🎯 Final Combined Result</h4>
                  <p><strong>{step.final_result}</strong></p>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Chain Summary Text */}
        {result.summary && (
          <div className="result-item">
            <h3>📋 Execution Summary</h3>
            <pre style={{ 
              background: '#f8f9fa', 
              padding: '1rem', 
              borderRadius: '4px',
              whiteSpace: 'pre-wrap',
              fontSize: '0.9em'
            }}>{result.summary}</pre>
          </div>
        )}
      </div>
    );
  }

  // Single workflow result (original format)
  return (
    <div className="result-section">
      <h2>✅ Workflow Result</h2>
      
      <div className="result-item">
        <h3>🤖 AI Response</h3>
        <p>{result.ai_response}</p>
      </div>

      <div className="result-item">
        <h3>📡 API Response</h3>
        <p>{result.api_response}</p>
      </div>

      <div className="result-item">
        <h3>🎯 Final Combined Result</h3>
        <p><strong>{result.final_result}</strong></p>
      </div>
    </div>
  );
};

export default ResultDisplay;