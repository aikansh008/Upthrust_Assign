# 🚀 Upthrust Workflow Automation

A powerful AI-driven workflow automation platform that integrates multiple third-party APIs with intelligent caching and chained workflows. Built with Node.js, React, and PostgreSQL.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Bonus Features](#-bonus-features)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### Core Features
- **🤖 AI-Powered Workflows**: Intelligent response generation using Google Gemini AI
- **🌐 Multi-API Integration**: Weather, News, and GitHub API integrations
- **🔗 Chained Workflows**: Execute multiple actions in sequence with context awareness

- **📦 Advanced Caching**: Redis-based caching with memory fallback to reduce API calls- **📦 Advanced Caching**: Redis-based caching with memory fallback to reduce API calls

- **📊 Performance Monitoring**: Real-time execution timing and cache hit/miss tracking- **📊 Performance Monitoring**: Real-time execution timing and cache hit/miss tracking

- **🗄️ Data Persistence**: PostgreSQL database with complete workflow history- **🗄️ Data Persistence**: PostgreSQL database with complete workflow history

- **🔐 GitHub Authentication**: Secure OAuth login system- **🔐 GitHub Authentication**: Secure OAuth login system



### Advanced Features### Advanced Features

- **⚡ Smart Rate Limiting Protection**: Automatic caching prevents 429 errors- **⚡ Smart Rate Limiting Protection**: Automatic caching prevents 429 errors

- **🎯 Context-Aware Chaining**: Each workflow step builds on previous results- **🎯 Context-Aware Chaining**: Each workflow step builds on previous results

- **📈 Cache Analytics**: Monitor cache performance and API usage statistics- **📈 Cache Analytics**: Monitor cache performance and API usage statistics

- **🔄 Error Recovery**: Graceful handling of API failures with fallback responses- **🔄 Error Recovery**: Graceful handling of API failures with fallback responses

- **📱 Responsive UI**: Clean, modern interface with real-time status updates- **📱 Responsive UI**: Clean, modern interface with real-time status updates



## 🛠 Tech Stack## 🛠 Tech Stack



### Backend### Backend

- **Node.js** with Express.js- **Node.js** with Express.js

- **PostgreSQL** with Sequelize ORM- **PostgreSQL** with Sequelize ORM

- **Redis** for caching (with memory fallback)- **Redis** for caching (with memory fallback)

- **Passport.js** for GitHub OAuth- **Passport.js** for GitHub OAuth

- **Google Gemini AI** for intelligent responses- **Google Gemini AI** for intelligent responses



### Frontend### Frontend

- **React.js** with modern hooks- **React.js** with modern hooks

- **Axios** for API communication- **Axios** for API communication

- **CSS3** with responsive design- **CSS3** with responsive design



### APIs Integrated### APIs Integrated

- **Google Gemini AI** - Text generation and analysis- **Google Gemini AI** - Text generation and analysis

- **OpenWeatherMap** - Weather data- **OpenWeatherMap** - Weather data

- **NewsAPI** - Latest news articles- **NewsAPI** - Latest news articles

- **GitHub API** - Repository information- **GitHub API** - Repository information



## 📋 Prerequisites## 📋 Prerequisites



Before running this application, make sure you have:Before running this application, make sure you have:



- **Node.js** (v14 or higher)- **Node.js** (v14 or higher)

- **npm** or **yarn**- **npm** or **yarn**

- **PostgreSQL** (v12 or higher)- **PostgreSQL** (v12 or higher)

- **Redis** (v6 or higher) - *Optional, falls back to memory caching*- **Redis** (v6 or higher) - *Optional, falls back to memory caching*



## 🚀 Installation & Setup## 🚀 Installation & Setup



### 1. Clone the Repository### 1. Clone the Repository

```bash```bash

git clone https://github.com/yourusername/Upthrust_Assignment.gitgit clone https://github.com/yourusername/Upthrust_Assignment.git

cd Upthrust_Assignmentcd Upthrust_Assignment

``````



### 2. Install Dependencies### 2. Install Dependencies



**Backend:****Backend:**

```bash```bash

cd servercd server

npm installnpm install

``````



**Frontend:****Frontend:**

```bash```bash

cd ../clientcd ../client

npm installnpm install

``````



### 3. Database Setup### 3. Database Setup



**Create PostgreSQL Database:****Create PostgreSQL Database:**

```sql```sql

CREATE DATABASE upthrust_db;CREATE DATABASE upthrust_db;

``````



**Database tables will be created automatically when the server starts.****Database tables will be created automatically when the server starts.**



### 4. Redis Setup (Optional)### 4. Redis Setup (Optional)

```bash```bash

# Install Redis (Ubuntu/Debian)# Install Redis (Ubuntu/Debian)

sudo apt updatesudo apt update

sudo apt install redis-serversudo apt install redis-server



# Start Redis service# Start Redis service

sudo systemctl start redis-serversudo systemctl start redis-server



# For Windows, download from: https://redis.io/download# For Windows, download from: https://redis.io/download

``````



## 🔧 Environment Variables

> **� SECURITY WARNING**: Never commit `.env` files to version control! They contain sensitive API keys and secrets. Use the provided `.env.example` files as templates and create your own `.env` files locally.

### Backend Environment Variables

Create a `.env` file in the `server` directory:



```env```env

# Database Configuration# Database Configuration

DB_HOST=localhostDB_HOST=localhost

DB_PORT=5432DB_PORT=5432

DB_NAME=upthrust_dbDB_NAME=upthrust_db

DB_USER=your_postgres_usernameDB_USER=your_postgres_username

DB_PASSWORD=your_postgres_passwordDB_PASSWORD=your_postgres_password



# Redis Configuration (Optional)# Redis Configuration (Optional)

REDIS_URL=redis://localhost:6379REDIS_URL=redis://localhost:6379



# API Keys# API Keys

GEMINI_API_KEY=your_google_gemini_api_keyGEMINI_API_KEY=your_google_gemini_api_key

WEATHER_API_KEY=your_openweathermap_api_keyWEATHER_API_KEY=your_openweathermap_api_key

NEWS_API_KEY=your_newsapi_keyNEWS_API_KEY=your_newsapi_key



# GitHub OAuth (for authentication)# GitHub OAuth (for authentication)

GITHUB_CLIENT_ID=your_github_oauth_client_idGITHUB_CLIENT_ID=your_github_oauth_client_id

GITHUB_CLIENT_SECRET=your_github_oauth_client_secretGITHUB_CLIENT_SECRET=your_github_oauth_client_secret



# Application Configuration# Application Configuration

NODE_ENV=developmentNODE_ENV=development

PORT=5000PORT=5000

SESSION_SECRET=your_super_secure_session_secretSESSION_SECRET=your_super_secure_session_secret

CLIENT_URL=http://localhost:3000CLIENT_URL=http://localhost:3000

``````



### Frontend Environment Variables### Frontend Environment Variables



Create a `.env` file in the `client` directory:Create a `.env` file in the `client` directory:



```env```env

REACT_APP_API_URL=http://localhost:5000/apiREACT_APP_API_URL=http://localhost:5000/api

``````



### 🔑 API Keys Setup Instructions### 🔑 API Keys Setup Instructions



#### 1. Google Gemini AI API Key#### 1. Google Gemini AI API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)1. Go to [Google AI Studio](https://aistudio.google.com/)

2. Create a new project or select existing2. Create a new project or select existing

3. Generate an API key3. Generate an API key

4. Copy the key to `GEMINI_API_KEY` in your `.env` file4. Copy the key to `GEMINI_API_KEY` in your `.env` file



#### 2. OpenWeatherMap API Key#### 2. OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)1. Visit [OpenWeatherMap](https://openweathermap.org/api)

2. Sign up for a free account2. Sign up for a free account

3. Navigate to API keys section3. Navigate to API keys section

4. Copy your API key to `WEATHER_API_KEY`4. Copy your API key to `WEATHER_API_KEY`



#### 3. NewsAPI Key#### 3. NewsAPI Key

1. Go to [NewsAPI](https://newsapi.org/)1. Go to [NewsAPI](https://newsapi.org/)

2. Register for a free account2. Register for a free account

3. Get your API key from the dashboard3. Get your API key from the dashboard

4. Add to `NEWS_API_KEY` in `.env`4. Add to `NEWS_API_KEY` in `.env`



#### 4. GitHub OAuth Setup#### 4. GitHub OAuth Setup

1. Go to GitHub → Settings → Developer settings → OAuth Apps1. Go to GitHub → Settings → Developer settings → OAuth Apps

2. Create a new OAuth App with:2. Create a new OAuth App with:

   - **Application name**: Upthrust Workflow Automation   - **Application name**: Upthrust Workflow Automation

   - **Homepage URL**: `http://localhost:3000`   - **Homepage URL**: `http://localhost:3000`

   - **Authorization callback URL**: `http://localhost:5000/auth/github/callback`   - **Authorization callback URL**: `http://localhost:5000/auth/github/callback`

3. Copy Client ID and Client Secret to your `.env` file3. Copy Client ID and Client Secret to your `.env` file



## 🏃‍♂️ Running the Application## 🏃‍♂️ Running the Application



### Development Mode### Development Mode



**1. Start the Backend Server:****1. Start the Backend Server:**

```bash```bash

cd servercd server

npm startnpm start

``````

The backend will run on `http://localhost:5000`The backend will run on `http://localhost:5000`



**2. Start the Frontend Development Server:****2. Start the Frontend Development Server:**

```bash```bash

cd clientcd client

npm startnpm start

``````

The frontend will run on `http://localhost:3000`The frontend will run on `http://localhost:3000`



### Production Mode### Production Mode



**Backend:****Backend:**

```bash```bash

cd servercd server

npm run buildnpm run build

npm run start:prodnpm run start:prod

``````



**Frontend:****Frontend:**

```bash```bash

cd clientcd client

npm run buildnpm run build

npm install -g servenpm install -g serve

serve -s build -l 3000serve -s build -l 3000

``````



## 📚 API Documentation## 📚 API Documentation



### Authentication Endpoints### Authentication Endpoints

``````

GET  /auth/github          - Initiate GitHub OAuthGET  /auth/github          - Initiate GitHub OAuth

GET  /auth/github/callback - GitHub OAuth callbackGET  /auth/github/callback - GitHub OAuth callback

POST /auth/logout          - User logoutPOST /auth/logout          - User logout

GET  /auth/user            - Get current user infoGET  /auth/user            - Get current user info

``````



### Workflow Endpoints### Workflow Endpoints

``````

POST /api/run-workflow     - Execute single workflowPOST /api/run-workflow     - Execute single workflow

GET  /api/history          - Get workflow historyGET  /api/history          - Get workflow history

``````



### Chain Workflow Endpoints### Chain Workflow Endpoints

``````

GET  /api/chains           - Get user's workflow chainsGET  /api/chains           - Get user's workflow chains

POST /api/chains           - Create new workflow chainPOST /api/chains           - Create new workflow chain

POST /api/chains/run       - Execute ad-hoc workflow chainPOST /api/chains/run       - Execute ad-hoc workflow chain

POST /api/chains/:id/execute - Execute saved workflow chainPOST /api/chains/:id/execute - Execute saved workflow chain

``````



### Caching & Monitoring### Caching & Monitoring

``````

GET  /api/cache/stats      - Get cache statisticsGET  /api/cache/stats      - Get cache statistics

DELETE /api/cache/clear    - Clear cache (development only)DELETE /api/cache/clear    - Clear cache (development only)

GET  /api/ai/health        - AI service health checkGET  /api/ai/health        - AI service health check

``````



### Request/Response Examples### Request/Response Examples



**Single Workflow:****Single Workflow:**

```json```json

POST /api/run-workflowPOST /api/run-workflow

{{

  "prompt": "What's the weather like today?",  "prompt": "What's the weather like today?",

  "action": "weather"  "action": "weather"

}}



Response:Response:

{{

  "ai_response": "Perfect weather conditions ahead!...",  "ai_response": "Perfect weather conditions ahead!...",

  "api_response": "Clear sky, 22°C in New York",  "api_response": "Clear sky, 22°C in New York",

  "final_result": "Perfect weather conditions ahead! Clear sky, 22°C in New York #weather"  "final_result": "Perfect weather conditions ahead! Clear sky, 22°C in New York #weather"

}}

``````



**Workflow Chain:****Workflow Chain:**

```json```json

POST /api/chains/runPOST /api/chains/run

{{

  "prompt": "Get weather and related news",  "prompt": "Get weather and related news",

  "actions": [  "actions": [

    {"type": "weather", "prompt": "Weather in London"},    {"type": "weather", "prompt": "Weather in London"},

    {"type": "news", "prompt": "Climate news"}    {"type": "news", "prompt": "Climate news"}

  ]  ]

}}



Response:Response:

{{

  "chainName": "Ad-hoc Chain",  "chainName": "Ad-hoc Chain",

  "totalSteps": 2,  "totalSteps": 2,

  "completedSteps": 2,  "completedSteps": 2,

  "failedSteps": 0,  "failedSteps": 0,

  "results": [  "results": [

    {    {

      "step": 1,      "step": 1,

      "action": "weather",      "action": "weather",

      "ai_response": "...",      "ai_response": "...",

      "api_response": "...",      "api_response": "...",

      "final_result": "...",      "final_result": "...",

      "cached": true,      "cached": true,

      "execution_time_ms": 245      "execution_time_ms": 245

    }    }

  ],  ],

  "summary": "🔗 Workflow Chain execution summary..."  "summary": "🔗 Workflow Chain execution summary..."

}}

``````



## 🏗 Architecture## 🏗 Architecture



### Backend Architecture### Backend Architecture

``````

server/server/

├── src/├── src/

│   ├── config/          # Database and OAuth configuration│   ├── config/          # Database and OAuth configuration

│   ├── middleware/      # Authentication and validation│   ├── middleware/      # Authentication and validation

│   ├── models/          # Database models (User, WorkflowRun, WorkflowChain)│   ├── models/          # Database models (User, WorkflowRun, WorkflowChain)

│   ├── routes/          # API route handlers│   ├── routes/          # API route handlers

│   ├── services/        # Business logic services│   ├── services/        # Business logic services

│   │   ├── aiService.js         # Google Gemini AI integration│   │   ├── aiService.js         # Google Gemini AI integration

│   │   ├── apiService.js        # Third-party API calls│   │   ├── apiService.js        # Third-party API calls

│   │   ├── cacheService.js      # Redis/Memory caching│   │   ├── cacheService.js      # Redis/Memory caching

│   │   └── chainedWorkflowService.js # Workflow orchestration│   │   └── chainedWorkflowService.js # Workflow orchestration

│   └── index.js         # Application entry point│   └── index.js         # Application entry point

└── package.json└── package.json

``````



### Frontend Architecture### Frontend Architecture

``````

client/client/

├── src/├── src/

│   ├── auth/            # Authentication components│   ├── auth/            # Authentication components

│   ├── components/      # React components│   ├── components/      # React components

│   │   ├── WorkflowForm.js      # Single workflow form│   │   ├── WorkflowForm.js      # Single workflow form

│   │   ├── ChainWorkflowForm.js # Chained workflow form│   │   ├── ChainWorkflowForm.js # Chained workflow form

│   │   └── ResultDisplay.js     # Results display│   │   └── ResultDisplay.js     # Results display

│   ├── services/        # API communication│   ├── services/        # API communication

│   └── App.js           # Main application component│   └── App.js           # Main application component

└── package.json└── package.json

``````



### Caching Architecture### Caching Architecture

- **Primary**: Redis for distributed caching- **Primary**: Redis for distributed caching

- **Fallback**: In-memory Map for development/testing- **Fallback**: In-memory Map for development/testing

- **TTL**: 10 minutes for API responses, 30 minutes for workflow results- **TTL**: 10 minutes for API responses, 30 minutes for workflow results

- **Analytics**: Cache hit/miss tracking and performance monitoring- **Analytics**: Cache hit/miss tracking and performance monitoring



## 🌟 Bonus Features## 🌟 Bonus Features



### ✅ Implemented Bonus Features### ✅ Implemented Bonus Features



1. **🔐 GitHub Authentication**1. **🔐 GitHub Authentication**

   - OAuth 2.0 integration with Passport.js   - OAuth 2.0 integration with Passport.js

   - User session management   - User session management

   - Protected routes for authenticated users   - Protected routes for authenticated users



2. **🔗 Multiple Chained Actions**2. **🔗 Multiple Chained Actions**

   - Context-aware workflow chains   - Context-aware workflow chains

   - Dynamic action sequencing   - Dynamic action sequencing

   - Cross-action data flow   - Cross-action data flow



3. **📦 Advanced Caching System**3. **📦 Advanced Caching System**

   - Redis-based distributed caching   - Redis-based distributed caching

   - Intelligent cache warming   - Intelligent cache warming

   - Performance analytics   - Performance analytics



4. **🎯 Enhanced Error Handling**4. **🎯 Enhanced Error Handling**

   - Graceful API failure recovery   - Graceful API failure recovery

   - Rate limiting protection   - Rate limiting protection

   - Comprehensive logging   - Comprehensive logging



### 🚀 Ready for Deployment### 🚀 Ready for Deployment



The application is configured for deployment on:The application is configured for deployment on:



- **Backend**: Heroku, Railway, or any Node.js hosting- **Backend**: Heroku, Railway, or any Node.js hosting

- **Frontend**: Vercel, Netlify, or static hosting- **Frontend**: Vercel, Netlify, or static hosting

- **Database**: PostgreSQL on Heroku, Supabase, or AWS RDS- **Database**: PostgreSQL on Heroku, Supabase, or AWS RDS

- **Cache**: Redis Cloud, Upstash, or AWS ElastiCache- **Cache**: Redis Cloud, Upstash, or AWS ElastiCache



## 🧪 Testing## 🧪 Testing



### Backend Testing### Backend Testing

```bash```bash

cd servercd server

npm testnpm test

``````



### Frontend Testing### Frontend Testing

```bash```bash

cd clientcd client

npm testnpm test

``````



### API Testing with cURL### API Testing with cURL

```bash```bash

# Test workflow execution# Test workflow execution

curl -X POST http://localhost:5000/api/run-workflow \curl -X POST http://localhost:5000/api/run-workflow \

  -H "Content-Type: application/json" \  -H "Content-Type: application/json" \

  -d '{"prompt":"Weather in Paris","action":"weather"}'  -d '{"prompt":"Weather in Paris","action":"weather"}'



# Test chain execution# Test chain execution

curl -X POST http://localhost:5000/api/chains/run \curl -X POST http://localhost:5000/api/chains/run \

  -H "Content-Type: application/json" \  -H "Content-Type: application/json" \

  -d '{"prompt":"Multi-step workflow","actions":[{"type":"weather","prompt":"Weather in Tokyo"}]}'  -d '{"prompt":"Multi-step workflow","actions":[{"type":"weather","prompt":"Weather in Tokyo"}]}'



# Check cache statistics# Check cache statistics

curl http://localhost:5000/api/cache/statscurl http://localhost:5000/api/cache/stats

``````



## 📖 Usage Examples## 📖 Usage Examples



### Single Workflow### Single Workflow

1. Navigate to the application1. Navigate to the application

2. Select "Single Workflow" mode2. Select "Single Workflow" mode

3. Choose an action (Weather, News, or GitHub)3. Choose an action (Weather, News, or GitHub)

4. Enter your prompt4. Enter your prompt

5. Click "Run Workflow"5. Click "Run Workflow"



### Chained Workflow### Chained Workflow

1. Switch to "Workflow Chain" mode1. Switch to "Workflow Chain" mode

2. Add multiple steps using "+ Add Step"2. Add multiple steps using "+ Add Step"

3. Configure each step with action type and parameters3. Configure each step with action type and parameters

4. Click "Run Workflow Chain"4. Click "Run Workflow Chain"

5. View detailed results with cache status and timing5. View detailed results with cache status and timing



### Monitoring Performance### Monitoring Performance

- Visit `/api/cache/stats` to view cache performance- Visit `/api/cache/stats` to view cache performance

- Check execution times in workflow results- Check execution times in workflow results

- Monitor cache hit rates for optimization- Monitor cache hit rates for optimization



## 🚢 Deployment## 🚢 Deployment



### Heroku Deployment### Heroku Deployment



**Backend:****Backend:**

```bash```bash

# In server directory# In server directory

heroku create your-app-name-apiheroku create your-app-name-api

heroku addons:create heroku-postgresql:hobby-devheroku addons:create heroku-postgresql:hobby-dev

heroku addons:create heroku-redis:hobby-devheroku addons:create heroku-redis:hobby-dev

heroku config:set NODE_ENV=productionheroku config:set NODE_ENV=production

# Set all environment variables# Set all environment variables

git subtree push --prefix=server heroku maingit subtree push --prefix=server heroku main

``````



**Frontend:****Frontend:**

```bash```bash

# In client directory  # In client directory  

# Deploy to Vercel# Deploy to Vercel

vercel --prodvercel --prod

``````



### Environment Variables for Production### Environment Variables for Production

Update your production environment variables:Update your production environment variables:

- Database URLs from your hosting provider- Database URLs from your hosting provider

- Redis URL from your Redis provider- Redis URL from your Redis provider

- Update CLIENT_URL to your frontend domain- Update CLIENT_URL to your frontend domain

- Set NODE_ENV=production- Set NODE_ENV=production



## 🤝 Contributing## 🤝 Contributing



1. Fork the repository1. Fork the repository

2. Create a feature branch: `git checkout -b feature/amazing-feature`2. Create a feature branch: `git checkout -b feature/amazing-feature`

3. Commit your changes: `git commit -m 'Add amazing feature'`3. Commit your changes: `git commit -m 'Add amazing feature'`

4. Push to the branch: `git push origin feature/amazing-feature`4. Push to the branch: `git push origin feature/amazing-feature`

5. Open a Pull Request5. Open a Pull Request



## 📄 License## 📄 License



This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 👨‍💻 Author## 👨‍💻 Author



**Your Name****Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)- GitHub: [@yourusername](https://github.com/yourusername)

- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)



## 🙏 Acknowledgments## 🙏 Acknowledgments



- Google Gemini AI for intelligent text generation- Google Gemini AI for intelligent text generation

- OpenWeatherMap for weather data- OpenWeatherMap for weather data

- NewsAPI for news integration- NewsAPI for news integration

- GitHub for OAuth and repository data- GitHub for OAuth and repository data

- The amazing open-source community- The amazing open-source community



------



### 🎯 Project Status: ✅ Complete### 🎯 Project Status: ✅ Complete



This project successfully implements all required features plus bonus enhancements:This project successfully implements all required features plus bonus enhancements:

- ✅ Backend API implementation with caching- ✅ Backend API implementation with caching

- ✅ Frontend form and result display- ✅ Frontend form and result display

- ✅ Database persistence with history- ✅ Database persistence with history

- ✅ GitHub authentication- ✅ GitHub authentication

- ✅ Multiple chained actions with context awareness- ✅ Multiple chained actions with context awareness

- ✅ Advanced caching and performance monitoring- ✅ Advanced caching and performance monitoring

- ✅ Comprehensive documentation- ✅ Comprehensive documentation

- ✅ Ready for deployment- ✅ Ready for deployment



**Ready for production deployment and further enhancement!****Ready for production deployment and further enhancement!**
│ - Form Input    │    │ - /run-workflow │    │ - workflow_runs │
│ - Results       │    │ - /history      │    │ - History       │
│ - History       │    │ - Validation    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   External APIs │
                    │                 │
                    │ - OpenAI        │
                    │ - Weather       │
                    │ - GitHub        │
                    │ - News          │
                    └─────────────────┘
```

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** (or Docker for database)
- **API Keys** (optional - mock responses available)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/aikansh008/upthrust-assignment.git
cd upthrust-assignment

# Install all dependencies
npm run install:all
```

### 2. Database Setup

**Option A: Docker (Recommended)**
```bash
# Start PostgreSQL with Docker Compose
docker-compose up -d

# Database will be available at localhost:5432
# Username: postgres, Password: yourpassword, Database: upthrust_db
```

**Option B: Local PostgreSQL**
```bash
# Create database manually
createdb upthrust_db

# Update DATABASE_URL in server/.env
```

### 3. Environment Configuration

**Backend Environment**
```bash
cd server
cp .env.example .env
# Edit .env with your API keys (optional)
```

**Frontend Environment**
```bash
cd client
cp .env.example .env
# Update API URL if needed
```

### 4. Run the Application

**Development Mode (Both Frontend & Backend)**
```bash
# From root directory
npm run dev
```

**Or run separately:**
```bash
# Backend (Terminal 1)
cd server && npm run dev

# Frontend (Terminal 2)  
cd client && npm start
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database Admin (Adminer): http://localhost:8080

## 🔌 API Endpoints

### POST `/api/run-workflow`
Run a 2-step workflow with AI + API integration.

**Request:**
```json
{
  "prompt": "Write a tweet about today's weather",
  "action": "weather"
}
```

**Response:**
```json
{
  "ai_response": "Perfect day to chill outside! 🌞",
  "api_response": "Sunny in Delhi, 32°C",
  "final_result": "Perfect day to chill outside! 🌞 Sunny in Delhi, 32°C #weather"
}
```

### GET `/api/history`
Fetch last 10 workflow runs.

**Response:**
```json
{
  "history": [
    {
      "id": 1,
      "prompt": "Write a tweet about today's weather",
      "action": "weather",
      "ai_response": "Perfect day to chill outside! 🌞",
      "api_response": "Sunny in Delhi, 32°C",
      "final_result": "Perfect day to chill outside! 🌞 Sunny in Delhi, 32°C #weather",
      "created_at": "2025-09-17T10:30:00Z"
    }
  ]
}
```

## 🔑 Environment Variables

### Server (.env)
```bash
# Required
NODE_ENV=development
PORT=5000
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/upthrust_db

# Optional API Keys (mock responses used if not provided)
OPENAI_API_KEY=your_openai_api_key_here
WEATHER_API_KEY=your_openweathermap_api_key_here  
NEWS_API_KEY=your_newsapi_key_here
```

### Client (.env)
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing

**Run Backend Tests:**
```bash
cd server
npm test
```

**Run with Coverage:**
```bash
cd server
npm run test:watch
```

## 📊 Database Schema

**workflow_runs Table:**
```sql
CREATE TABLE workflow_runs (
    id SERIAL PRIMARY KEY,
    prompt TEXT NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('weather', 'github', 'news')),
    ai_response TEXT NOT NULL,
    api_response TEXT NOT NULL,
    final_result TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 API Integration Details

### AI Agent (OpenAI)
- **Model**: GPT-3.5-turbo
- **Fallback**: Mock responses when API key unavailable
- **Timeout**: 10 seconds

### Weather API (OpenWeatherMap)
- **Endpoint**: Current weather for Delhi, India
- **Fallback**: Mock weather data

### GitHub API
- **Endpoint**: Trending repositories
- **Fallback**: Mock repository data

### News API
- **Endpoint**: Top headlines (US)
- **Fallback**: Mock news headlines

## 🚀 Deployment

### Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=your_postgres_url
heroku config:set OPENAI_API_KEY=your_key

# Deploy
git push heroku main
```

### Vercel Deployment (Frontend)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from client directory
cd client
vercel --prod
```

### Render Deployment
1. Connect GitHub repository
2. Configure build settings:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
3. Set environment variables in dashboard

## 📁 Project Structure

```
upthrust-assignment/
├── server/                 # Backend Express API
│   ├── src/
│   │   ├── controllers/   # API controllers
│   │   ├── routes/        # Express routes
│   │   ├── services/      # AI & API services
│   │   ├── models/        # Database models
│   │   ├── config/        # Database config
│   │   ├── middleware/    # Custom middleware
│   │   └── index.js       # Server entry point
│   ├── tests/             # Jest tests
│   └── package.json
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API client
│   │   ├── App.js         # Main app
│   │   └── index.js       # Entry point
│   ├── public/
│   └── package.json
├── scripts/               # Database scripts
├── docker-compose.yml     # Database setup
├── package.json           # Root package.json
└── README.md
```

## 🌟 Bonus Features Implemented

- ✅ **Authentication Ready**: GitHub OAuth setup prepared
- ✅ **Error Handling**: Comprehensive error handling with fallbacks
- ✅ **Testing**: Jest tests for API endpoints
- ✅ **Docker Support**: Easy database setup
- ✅ **Rate Limiting**: API rate limiting implemented
- ✅ **Logging**: Request/response logging
- ✅ **Validation**: Input validation with express-validator
- ✅ **Security**: Helmet.js, CORS configured

## 🛠 Troubleshooting

**Database Connection Issues:**
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart database
docker-compose restart postgres
```

**Port Already in Use:**
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change PORT in server/.env
```

**API Key Issues:**
- Mock responses are used when API keys are not configured
- Check console logs for API integration status

## 📝 License

MIT License - see LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the API documentation
