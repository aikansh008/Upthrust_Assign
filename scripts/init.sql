-- Initialize database schema
CREATE DATABASE IF NOT EXISTS upthrust_db;

-- Switch to the database
\c upthrust_db;

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    github_id VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    avatar_url TEXT,
    access_token TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workflow_runs table
CREATE TABLE IF NOT EXISTS workflow_runs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('weather', 'github', 'news')),
    ai_response TEXT NOT NULL,
    api_response TEXT NOT NULL,
    final_result TEXT NOT NULL,
    execution_time_ms INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workflow_chains table for chained workflows
CREATE TABLE IF NOT EXISTS workflow_chains (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    steps JSONB NOT NULL, -- Array of workflow steps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_workflow_runs_created_at ON workflow_runs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_workflow_runs_user_id ON workflow_runs(user_id);
CREATE INDEX IF NOT EXISTS idx_users_github_id ON users(github_id);
CREATE INDEX IF NOT EXISTS idx_workflow_chains_user_id ON workflow_chains(user_id);
CREATE INDEX IF NOT EXISTS idx_workflow_runs_action ON workflow_runs(action);

-- Insert sample data
INSERT INTO workflow_runs (prompt, action, ai_response, api_response, final_result, created_at) VALUES 
    ('Write a tweet about sunny weather', 'weather', 'Perfect day to chill outside! 🌞', 'Sunny in Delhi, 32°C', 'Perfect day to chill outside! 🌞 Sunny in Delhi, 32°C #weather', NOW() - INTERVAL '1 hour'),
    ('Tell me about trending repos', 'github', 'Amazing projects are trending! 🚀', 'awesome-project by developer123 - 15.2k stars', 'Amazing projects are trending! 🚀 awesome-project by developer123 - 15.2k stars #github', NOW() - INTERVAL '2 hours');