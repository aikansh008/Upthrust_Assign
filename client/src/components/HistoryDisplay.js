import React from 'react';

const HistoryDisplay = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="history-section">
        <h2>📚 Workflow History</h2>
        <p className="loading">No workflow history yet. Run your first workflow!</p>
      </div>
    );
  }

  return (
    <div className="history-section">
      <h2>📚 Workflow History (Last 10 runs)</h2>
      
      {history.map((item, index) => (
        <div key={item.id || index} className="history-item">
          <div className="history-meta">
            <strong>#{item.id}</strong> • 
            <span> {item.action.toUpperCase()} • </span>
            <span>{new Date(item.created_at).toLocaleString()}</span>
          </div>
          
          <div>
            <strong>Prompt:</strong> {item.prompt}
          </div>
          
          <div>
            <strong>Result:</strong> {item.final_result}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryDisplay;