# 🚀 Upthrust Workflow Automation

A powerful AI-driven workflow automation platform that integrates multiple third-party APIs with intelligent caching and chained workflows. Built with Node.js, React, and PostgreSQL.



## 📋 Table of Contents## 📋 Table of Contents



- [Features](#-features)- [Features](#-features)

- [Tech Stack](#-tech-stack)- [Tech Stack](#-tech-stack)

- [Prerequisites](#-prerequisites)- [Prerequisites](#-prerequisites)

- [Installation & Setup](#-installation--setup)- [Installation & Setup](#-installation--setup)

- [Environment Variables](#-environment-variables)- [Environment Variables](#-environment-variables)

- [Running the Application](#-running-the-application)- [Running the Application](#-running-the-application)

- [API Documentation](#-api-documentation)- [API Documentation](#-api-documentation)

- [Architecture](#-architecture)- [Architecture](#-architecture)

- [Bonus Features](#-bonus-features)- [Bonus Features](#-bonus-features)

- [Testing](#-testing)- [Testing](#-testing)

- [Deployment](#-deployment)- [Deployment](#-deployment)

- [Contributing](#-contributing)- [Contributing](#-contributing)



## ✨ Features## ✨ Features



### Core Features### Core Features

- **🤖 AI-Powered Workflows**: Intelligent response generation using Google Gemini AI- **🤖 AI-Powered Workflows**: Intelligent response generation using Google Gemini AI

- **🌐 Multi-API Integration**: Weather, News, and GitHub API integrations- **🌐 Multi-API Integration**: Weather, News, and GitHub API integrations

- **🔗 Chained Workflows**: Execute multiple actions in sequence with context awareness- **🔗 Chained Workflows**: Execute multiple actions in sequence with context awareness

- **📦 Advanced Caching**: Redis-based caching with memory fallback to reduce API calls- **📦 Advanced Caching**: Redis-based caching with memory fallback to reduce API calls

- **📊 Performance Monitoring**: Real-time execution timing and cache hit/miss tracking- **📊 Performance Monitoring**: Real-time execution timing and cache hit/miss tracking

- **🗄️ Data Persistence**: PostgreSQL database with complete workflow history- **🗄️ Data Persistence**: PostgreSQL database with complete workflow history

- **🔐 GitHub Authentication**: Secure OAuth login system- **🔐 GitHub Authentication**: Secure OAuth login system



### Advanced Features

- **⚡ Smart Rate Limiting Protection**: Automatic caching prevents 429 errors

- **🎯 Context-Aware Chaining**: Each workflow step builds on previous results### Advanced Features

- **📈 Cache Analytics**: Monitor cache performance and API usage statistics- **⚡ Smart Rate Limiting Protection**: Automatic caching prevents 429 errors

- **🔄 Error Recovery**: Graceful handling of API failures with fallback responses- **🎯 Context-Aware Chaining**: Each workflow step builds on previous results

- **📱 Responsive UI**: Clean, modern interface with real-time status updates- **📈 Cache Analytics**: Monitor cache performance and API usage statistics

- **🔄 Error Recovery**: Graceful handling of API failures with fallback responses

## 🛠 Tech Stack- **📱 Responsive UI**: Clean, modern interface with real-time status updates



### Backend## 🛠 Tech Stack

- **Node.js** with Express.js

- **PostgreSQL** with Sequelize ORM### Backend

- **Redis** for caching (with memory fallback)- **Node.js** with Express.js

- **Passport.js** for GitHub OAuth- **PostgreSQL** with Sequelize ORM

- **Google Gemini AI** for intelligent responses- **Redis** for caching (with memory fallback)

- **Passport.js** for GitHub OAuth

### Frontend- **Google Gemini AI** for intelligent responses

- **React.js** with modern hooks

- **Axios** for API communication### Frontend

- **CSS3** with responsive design- **React.js** with modern hooks

- **Axios** for API communication

### APIs Integrated- **CSS3** with responsive design

- **Google Gemini AI** - Text generation and analysis

- **OpenWeatherMap** - Weather data### APIs Integrated

- **NewsAPI** - Latest news articles- **Google Gemini AI** - Text generation and analysis

- **GitHub API** - Repository information- **OpenWeatherMap** - Weather data

- **NewsAPI** - Latest news articles

## 📋 Prerequisites- **GitHub API** - Repository information



Before running this application, make sure you have:## 📋 Prerequisites



- **Node.js** (v14 or higher)Before running this application, make sure you have:

- **npm** or **yarn**

- **PostgreSQL** (v12 or higher)- **Node.js** (v14 or higher)

- **Redis** (v6 or higher) - *Optional, falls back to memory caching*- **npm** or **yarn**

- **PostgreSQL** (v12 or higher)

## 🚀 Installation & Setup

- **Redis** (v6 or higher) - *Optional, falls back to memory caching*- **Redis** (v6 or higher) - *Optional, falls back to memory caching*

### 1. Clone the Repository

```bash

git clone https://github.com/aikansh008/SHAKTI.git

cd SHAKTI## 🚀 Installation & Setup## 🚀 Installation & Setup

```



### 2. Install Dependencies

### 1. Clone the Repository### 1. Clone the Repository

**Backend:**

```bash```bash```bash

cd server

npm installgit clone https://github.com/yourusername/Upthrust_Assignment.gitgit clone https://github.com/yourusername/Upthrust_Assignment.git

```

cd Upthrust_Assignmentcd Upthrust_Assignment

**Frontend:**

```bash``````

cd ../client

npm install

```

### 2. Install Dependencies### 2. Install Dependencies

### 3. Database Setup



**Create PostgreSQL Database:**

```sql**Backend:****Backend:**

CREATE DATABASE upthrust_db;

``````bash```bash



**Database tables will be created automatically when the server starts.**cd servercd server



### 4. Redis Setup (Optional)npm installnpm install

```bash

# Install Redis (Ubuntu/Debian)``````

sudo apt update

sudo apt install redis-server



# Start Redis service**Frontend:****Frontend:**

sudo systemctl start redis-server

```bash```bash

# For Windows, download from: https://redis.io/download

```cd ../clientcd ../client



## 🔧 Environment Variablesnpm installnpm install



> **🚨 SECURITY WARNING**: Never commit `.env` files to version control! They contain sensitive API keys and secrets. Use the provided `.env.example` files as templates and create your own `.env` files locally.``````



### Backend Environment Variables



Create a `.env` file in the `server` directory:### 3. Database Setup### 3. Database Setup



```env

# Database Configuration

DATABASE_URL=postgres://postgres:yourpassword@localhost:5433/upthrust_db**Create PostgreSQL Database:****Create PostgreSQL Database:**



# API Keys```sql```sql

OPENAI_API_KEY=your_google_gemini_api_key

WEATHER_API_KEY=your_openweathermap_api_keyCREATE DATABASE upthrust_db;CREATE DATABASE upthrust_db;

NEWS_API_KEY=your_newsapi_key

``````

# GitHub OAuth (for authentication)

GITHUB_CLIENT_ID=your_github_oauth_client_id

GITHUB_CLIENT_SECRET=your_github_oauth_client_secret

**Database tables will be created automatically when the server starts.****Database tables will be created automatically when the server starts.**

# Application Configuration

NODE_ENV=development

PORT=5000

SESSION_SECRET=your_super_secure_session_secret### 4. Redis Setup (Optional)### 4. Redis Setup (Optional)

JWT_SECRET=your_jwt_secret

``````bash```bash



### Frontend Environment Variables# Install Redis (Ubuntu/Debian)# Install Redis (Ubuntu/Debian)



Create a `.env` file in the `client` directory:sudo apt updatesudo apt update



```envsudo apt install redis-serversudo apt install redis-server

REACT_APP_API_URL=http://localhost:5000/api

```



### 🔑 API Keys Setup Instructions# Start Redis service# Start Redis service



#### 1. Google Gemini AI API Keysudo systemctl start redis-serversudo systemctl start redis-server

1. Go to [Google AI Studio](https://aistudio.google.com/)

2. Create a new project or select existing

3. Generate an API key

4. Copy the key to `OPENAI_API_KEY` in your `.env` file# For Windows, download from: https://redis.io/download# For Windows, download from: https://redis.io/download



#### 2. OpenWeatherMap API Key``````

1. Visit [OpenWeatherMap](https://openweathermap.org/api)

2. Sign up for a free account

3. Navigate to API keys section

4. Copy your API key to `WEATHER_API_KEY`## 🔧 Environment Variables



#### 3. NewsAPI Key> **� SECURITY WARNING**: Never commit `.env` files to version control! They contain sensitive API keys and secrets. Use the provided `.env.example` files as templates and create your own `.env` files locally.

1. Go to [NewsAPI](https://newsapi.org/)

2. Register for a free account### Backend Environment Variables

3. Get your API key from the dashboard

4. Add to `NEWS_API_KEY` in `.env`Create a `.env` file in the `server` directory:



#### 4. GitHub OAuth Setup

1. Go to GitHub → Settings → Developer settings → OAuth Apps

2. Create a new OAuth App with:```env```env

   - **Application name**: Upthrust Workflow Automation

   - **Homepage URL**: `http://localhost:3000`# Database Configuration# Database Configuration

   - **Authorization callback URL**: `http://localhost:5000/auth/github/callback`

3. Copy Client ID and Client Secret to your `.env` fileDB_HOST=localhostDB_HOST=localhost



## 🏃‍♂️ Running the ApplicationDB_PORT=5432DB_PORT=5432



### Development ModeDB_NAME=upthrust_dbDB_NAME=upthrust_db



**1. Start the Backend Server:**DB_USER=your_postgres_usernameDB_USER=your_postgres_username

```bash

cd serverDB_PASSWORD=your_postgres_passwordDB_PASSWORD=your_postgres_password

npm start

```

The backend will run on `http://localhost:5000`

# Redis Configuration (Optional)# Redis Configuration (Optional)

**2. Start the Frontend Development Server:**

```bashREDIS_URL=redis://localhost:6379REDIS_URL=redis://localhost:6379

cd client

npm start

```

The frontend will run on `http://localhost:3000` or `http://localhost:3001`# API Keys# API Keys



### Production ModeGEMINI_API_KEY=your_google_gemini_api_keyGEMINI_API_KEY=your_google_gemini_api_key



**Backend:**WEATHER_API_KEY=your_openweathermap_api_keyWEATHER_API_KEY=your_openweathermap_api_key

```bash

cd serverNEWS_API_KEY=your_newsapi_keyNEWS_API_KEY=your_newsapi_key

npm run build

npm run start:prod

```

# GitHub OAuth (for authentication)# GitHub OAuth (for authentication)

**Frontend:**

```bashGITHUB_CLIENT_ID=your_github_oauth_client_idGITHUB_CLIENT_ID=your_github_oauth_client_id

cd client

npm run buildGITHUB_CLIENT_SECRET=your_github_oauth_client_secretGITHUB_CLIENT_SECRET=your_github_oauth_client_secret

npm install -g serve

serve -s build -l 3000

```

# Application Configuration# Application Configuration

## 📚 API Documentation

NODE_ENV=developmentNODE_ENV=development

### Authentication Endpoints

```PORT=5000PORT=5000

GET  /auth/github          - Initiate GitHub OAuth

GET  /auth/github/callback - GitHub OAuth callbackSESSION_SECRET=your_super_secure_session_secretSESSION_SECRET=your_super_secure_session_secret

POST /auth/logout          - User logout

GET  /auth/user            - Get current user infoCLIENT_URL=http://localhost:3000CLIENT_URL=http://localhost:3000

```

``````

### Workflow Endpoints

```

POST /api/run-workflow     - Execute single workflow

GET  /api/history          - Get workflow history### Frontend Environment Variables### Frontend Environment Variables

```



### Chain Workflow Endpoints

```Create a `.env` file in the `client` directory:Create a `.env` file in the `client` directory:

GET  /api/chains           - Get user's workflow chains

POST /api/chains           - Create new workflow chain

POST /api/chains/public/execute - Execute ad-hoc workflow chain

POST /api/chains/:id/execute - Execute saved workflow chain```env```env

```

REACT_APP_API_URL=http://localhost:5000/apiREACT_APP_API_URL=http://localhost:5000/api

### Caching & Monitoring

`````````

GET  /api/cache/stats      - Get cache statistics

DELETE /api/cache/clear    - Clear cache (development only)

GET  /api/ai/health        - AI service health check

```### 🔑 API Keys Setup Instructions### 🔑 API Keys Setup Instructions



### Request/Response Examples



**Single Workflow:**#### 1. Google Gemini AI API Key#### 1. Google Gemini AI API Key

```json

POST /api/run-workflow1. Go to [Google AI Studio](https://aistudio.google.com/)1. Go to [Google AI Studio](https://aistudio.google.com/)

{

  "prompt": "What's the weather like today?",2. Create a new project or select existing2. Create a new project or select existing

  "action": "weather"

}3. Generate an API key3. Generate an API key



Response:4. Copy the key to `GEMINI_API_KEY` in your `.env` file4. Copy the key to `GEMINI_API_KEY` in your `.env` file

{

  "ai_response": "Perfect weather conditions ahead!...",

  "api_response": "Clear sky, 22°C in New York",

  "final_result": "Perfect weather conditions ahead! Clear sky, 22°C in New York #weather"#### 2. OpenWeatherMap API Key#### 2. OpenWeatherMap API Key

}

```1. Visit [OpenWeatherMap](https://openweathermap.org/api)1. Visit [OpenWeatherMap](https://openweathermap.org/api)



**Workflow Chain:**2. Sign up for a free account2. Sign up for a free account

```json

POST /api/chains/public/execute3. Navigate to API keys section3. Navigate to API keys section

{

  "actions": [4. Copy your API key to `WEATHER_API_KEY`4. Copy your API key to `WEATHER_API_KEY`

    {"type": "weather", "prompt": "Weather in London"},

    {"type": "news", "prompt": "Climate news"}

  ]

}#### 3. NewsAPI Key#### 3. NewsAPI Key



Response:1. Go to [NewsAPI](https://newsapi.org/)1. Go to [NewsAPI](https://newsapi.org/)

{

  "chainName": "Ad-hoc Chain",2. Register for a free account2. Register for a free account

  "totalSteps": 2,

  "completedSteps": 2,3. Get your API key from the dashboard3. Get your API key from the dashboard

  "failedSteps": 0,

  "results": [4. Add to `NEWS_API_KEY` in `.env`4. Add to `NEWS_API_KEY` in `.env`

    {

      "step": 1,

      "action": "weather",

      "ai_response": "...",#### 4. GitHub OAuth Setup#### 4. GitHub OAuth Setup

      "api_response": "...",

      "final_result": "...",1. Go to GitHub → Settings → Developer settings → OAuth Apps1. Go to GitHub → Settings → Developer settings → OAuth Apps

      "cached": true,

      "execution_time_ms": 2452. Create a new OAuth App with:2. Create a new OAuth App with:

    }

  ],   - **Application name**: Upthrust Workflow Automation   - **Application name**: Upthrust Workflow Automation

  "summary": "🔗 Workflow Chain execution summary..."

}   - **Homepage URL**: `http://localhost:3000`   - **Homepage URL**: `http://localhost:3000`

```

   - **Authorization callback URL**: `http://localhost:5000/auth/github/callback`   - **Authorization callback URL**: `http://localhost:5000/auth/github/callback`

## 🏗 Architecture

3. Copy Client ID and Client Secret to your `.env` file3. Copy Client ID and Client Secret to your `.env` file

### Backend Architecture

```

server/

├── src/## 🏃‍♂️ Running the Application## 🏃‍♂️ Running the Application

│   ├── config/          # Database and OAuth configuration

│   ├── middleware/      # Authentication and validation

│   ├── models/          # Database models (User, WorkflowRun, WorkflowChain)

│   ├── routes/          # API route handlers### Development Mode### Development Mode

│   ├── services/        # Business logic services

│   │   ├── aiService.js         # Google Gemini AI integration

│   │   ├── apiService.js        # Third-party API calls

│   │   ├── cacheService.js      # Redis/Memory caching**1. Start the Backend Server:****1. Start the Backend Server:**

│   │   └── chainedWorkflowService.js # Workflow orchestration

│   └── index.js         # Application entry point```bash```bash

└── package.json

```cd servercd server



### Frontend Architecturenpm startnpm start

```

client/``````

├── src/

│   ├── auth/            # Authentication componentsThe backend will run on `http://localhost:5000`The backend will run on `http://localhost:5000`

│   ├── components/      # React components

│   │   ├── WorkflowForm.js      # Single workflow form

│   │   ├── ChainWorkflowForm.js # Chained workflow form

│   │   └── ResultDisplay.js     # Results display**2. Start the Frontend Development Server:****2. Start the Frontend Development Server:**

│   ├── services/        # API communication

│   └── App.js           # Main application component```bash```bash

└── package.json

```cd clientcd client



### Caching Architecturenpm startnpm start

- **Primary**: Redis for distributed caching

- **Fallback**: In-memory Map for development/testing``````

- **TTL**: 10 minutes for API responses, 30 minutes for workflow results

- **Analytics**: Cache hit/miss tracking and performance monitoringThe frontend will run on `http://localhost:3000`The frontend will run on `http://localhost:3000`



## 🌟 Bonus Features



### ✅ Implemented Bonus Features### Production Mode### Production Mode



1. **🔐 GitHub Authentication**

   - OAuth 2.0 integration with Passport.js

   - User session management**Backend:****Backend:**

   - Protected routes for authenticated users

```bash```bash

2. **🔗 Multiple Chained Actions**

   - Context-aware workflow chainscd servercd server

   - Dynamic action sequencing

   - Cross-action data flownpm run buildnpm run build



3. **📦 Advanced Caching System**npm run start:prodnpm run start:prod

   - Redis-based distributed caching

   - Intelligent cache warming``````

   - Performance analytics



4. **🎯 Enhanced Error Handling**

   - Graceful API failure recovery**Frontend:****Frontend:**

   - Rate limiting protection

   - Comprehensive logging```bash```bash



### 🚀 Ready for Deploymentcd clientcd client



The application is configured for deployment on:npm run buildnpm run build



- **Backend**: Heroku, Railway, or any Node.js hostingnpm install -g servenpm install -g serve

- **Frontend**: Vercel, Netlify, or static hosting

- **Database**: PostgreSQL on Heroku, Supabase, or AWS RDSserve -s build -l 3000serve -s build -l 3000

- **Cache**: Redis Cloud, Upstash, or AWS ElastiCache

``````

## 🧪 Testing



### Backend Testing

```bash## 📚 API Documentation## 📚 API Documentation

cd server

npm test

```

### Authentication Endpoints### Authentication Endpoints

### Frontend Testing

```bash``````

cd client

npm testGET  /auth/github          - Initiate GitHub OAuthGET  /auth/github          - Initiate GitHub OAuth

```

GET  /auth/github/callback - GitHub OAuth callbackGET  /auth/github/callback - GitHub OAuth callback

### API Testing with cURL

```bashPOST /auth/logout          - User logoutPOST /auth/logout          - User logout

# Test workflow execution

curl -X POST http://localhost:5000/api/run-workflow \GET  /auth/user            - Get current user infoGET  /auth/user            - Get current user info

  -H "Content-Type: application/json" \

  -d '{"prompt":"Weather in Paris","action":"weather"}'``````



# Test chain execution

curl -X POST http://localhost:5000/api/chains/public/execute \

  -H "Content-Type: application/json" \### Workflow Endpoints### Workflow Endpoints

  -d '{"actions":[{"type":"weather","prompt":"Weather in Tokyo"}]}'

``````

# Check cache statistics

curl http://localhost:5000/api/cache/statsPOST /api/run-workflow     - Execute single workflowPOST /api/run-workflow     - Execute single workflow

```

GET  /api/history          - Get workflow historyGET  /api/history          - Get workflow history

## 📖 Usage Examples

``````

### Single Workflow

1. Navigate to the application

2. Select "Single Workflow" mode

3. Choose an action (Weather, News, or GitHub)### Chain Workflow Endpoints### Chain Workflow Endpoints

4. Enter your prompt

5. Click "Run Workflow"``````



### Chained WorkflowGET  /api/chains           - Get user's workflow chainsGET  /api/chains           - Get user's workflow chains

1. Switch to "Workflow Chain" mode

2. Add multiple steps using "+ Add Step"POST /api/chains           - Create new workflow chainPOST /api/chains           - Create new workflow chain

3. Configure each step with action type and parameters

4. Click "Run Workflow Chain"POST /api/chains/run       - Execute ad-hoc workflow chainPOST /api/chains/run       - Execute ad-hoc workflow chain

5. View detailed results with cache status and timing

POST /api/chains/:id/execute - Execute saved workflow chainPOST /api/chains/:id/execute - Execute saved workflow chain

### Monitoring Performance

- Visit `/api/cache/stats` to view cache performance``````

- Check execution times in workflow results

- Monitor cache hit rates for optimization



## 🚢 Deployment### Caching & Monitoring### Caching & Monitoring



### Heroku Deployment``````



**Backend:**GET  /api/cache/stats      - Get cache statisticsGET  /api/cache/stats      - Get cache statistics

```bash

# In server directoryDELETE /api/cache/clear    - Clear cache (development only)DELETE /api/cache/clear    - Clear cache (development only)

heroku create your-app-name-api

heroku addons:create heroku-postgresql:hobby-devGET  /api/ai/health        - AI service health checkGET  /api/ai/health        - AI service health check

heroku addons:create heroku-redis:hobby-dev

heroku config:set NODE_ENV=production``````

# Set all environment variables

git subtree push --prefix=server heroku main

```

### Request/Response Examples### Request/Response Examples

**Frontend:**

```bash

# In client directory  

# Deploy to Vercel**Single Workflow:****Single Workflow:**

vercel --prod

``````json```json



### Environment Variables for ProductionPOST /api/run-workflowPOST /api/run-workflow

Update your production environment variables:

- Database URLs from your hosting provider{{

- Redis URL from your Redis provider

- Update CLIENT_URL to your frontend domain  "prompt": "What's the weather like today?",  "prompt": "What's the weather like today?",

- Set NODE_ENV=production

  "action": "weather"  "action": "weather"

## 🤝 Contributing

}}

1. Fork the repository

2. Create a feature branch: `git checkout -b feature/amazing-feature`

3. Commit your changes: `git commit -m 'Add amazing feature'`

4. Push to the branch: `git push origin feature/amazing-feature`Response:Response:

5. Open a Pull Request

{{

## 📄 License

  "ai_response": "Perfect weather conditions ahead!...",  "ai_response": "Perfect weather conditions ahead!...",

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

  "api_response": "Clear sky, 22°C in New York",  "api_response": "Clear sky, 22°C in New York",

## 👨‍💻 Author

  "final_result": "Perfect weather conditions ahead! Clear sky, 22°C in New York #weather"  "final_result": "Perfect weather conditions ahead! Clear sky, 22°C in New York #weather"

**Aikansh**

- GitHub: [@aikansh008](https://github.com/aikansh008)}}

- Repository: [SHAKTI](https://github.com/aikansh008/SHAKTI)

``````

## 🙏 Acknowledgments



- Google Gemini AI for intelligent text generation

- OpenWeatherMap for weather data**Workflow Chain:****Workflow Chain:**

- NewsAPI for news integration

- GitHub for OAuth and repository data```json```json

- The amazing open-source community

POST /api/chains/runPOST /api/chains/run

---

{{

### 🎯 Project Status: ✅ Complete

  "prompt": "Get weather and related news",  "prompt": "Get weather and related news",

This project successfully implements all required features plus bonus enhancements:

- ✅ Backend API implementation with caching  "actions": [  "actions": [

- ✅ Frontend form and result display

- ✅ Database persistence with history    {"type": "weather", "prompt": "Weather in London"},    {"type": "weather", "prompt": "Weather in London"},

- ✅ GitHub authentication

- ✅ Multiple chained actions with context awareness    {"type": "news", "prompt": "Climate news"}    {"type": "news", "prompt": "Climate news"}

- ✅ Advanced caching and performance monitoring

- ✅ Comprehensive documentation  ]  ]

- ✅ Ready for deployment

}}

**Ready for production deployment and further enhancement!**


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



## 🚢 Deployment

### � Render Deployment (Recommended)

Render provides excellent support for full-stack applications with PostgreSQL and Redis. Here's a complete deployment guide:

#### 1. Prepare Your Repository

First, ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

#### 2. Deploy PostgreSQL Database

1. Go to [Render Dashboard](https://render.com/dashboard)
2. Click **"New"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `upthrust-db`
   - **Database**: `upthrust_db`
   - **User**: `upthrust_user`
   - **Region**: Choose closest to your users
   - **Plan**: Free tier available
4. Click **"Create Database"**
5. **Save the connection details** (Internal Database URL and External Database URL)

#### 3. Deploy Redis Instance

1. In Render Dashboard, click **"New"** → **"Redis"**
2. Configure:
   - **Name**: `upthrust-redis`
   - **Region**: Same as your database
   - **Plan**: Free tier available
3. Click **"Create Redis"**
4. **Save the Redis connection URL**

#### 4. Deploy Backend API

1. In Render Dashboard, click **"New"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `upthrust-api`
   - **Environment**: `Node`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Auto-Deploy**: `Yes`

4. **Environment Variables** (click "Advanced" → "Add Environment Variable"):

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=[Your PostgreSQL Internal URL from step 2]
REDIS_URL=[Your Redis URL from step 3]

# API Keys (add your actual keys)
OPENAI_API_KEY=your_google_gemini_api_key
WEATHER_API_KEY=your_openweathermap_api_key
NEWS_API_KEY=your_newsapi_key

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret

# Security
SESSION_SECRET=your_super_secure_session_secret_minimum_32_chars
JWT_SECRET=your_jwt_secret_minimum_32_chars

# Frontend URL (update after frontend deployment)
CLIENT_URL=https://upthrust-app.onrender.com
```

5. Click **"Create Web Service"**

#### 5. Deploy Frontend

1. In Render Dashboard, click **"New"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `upthrust-app`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Auto-Deploy**: `Yes`

4. **Environment Variables**:

```env
REACT_APP_API_URL=https://upthrust-api.onrender.com/api
```

5. Click **"Create Static Site"**

#### 6. Update Backend Environment

1. Go to your backend service in Render
2. Update the `CLIENT_URL` environment variable with your frontend URL:
   ```
   CLIENT_URL=https://upthrust-app.onrender.com
   ```
3. The service will automatically redeploy

#### 7. Update GitHub OAuth Settings

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Update your OAuth app:
   - **Homepage URL**: `https://upthrust-app.onrender.com`
   - **Authorization callback URL**: `https://upthrust-api.onrender.com/auth/github/callback`

### 🔧 Render-Specific Configuration

Create a `render.yaml` file in your project root for automated deployments:

```yaml
databases:
  - name: upthrust-db
    databaseName: upthrust_db
    user: upthrust_user
    plan: free

services:
  - type: redis
    name: upthrust-redis
    plan: free

  - type: web
    name: upthrust-api
    env: node
    rootDir: server
    buildCommand: npm install
    startCommand: npm start
    plan: free
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: upthrust-db
          property: connectionString
      - key: REDIS_URL
        fromService:
          type: redis
          name: upthrust-redis
          property: connectionString

  - type: web
    name: upthrust-app
    env: static
    rootDir: client
    buildCommand: npm install && npm run build
    staticPublishPath: ./build
    plan: free
    envVars:
      - key: REACT_APP_API_URL
        value: https://upthrust-api.onrender.com/api
```

### 🚀 Alternative Deployment Options

#### Vercel (Frontend Only)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from client directory
cd client
vercel --prod
```

#### Railway (Full Stack)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway new
railway up
```

#### Heroku (Full Stack)
```bash
# Install Heroku CLI
npm install -g heroku

# Create apps
heroku create your-app-name-api
heroku create your-app-name-frontend

# Add add-ons
heroku addons:create heroku-postgresql:hobby-dev -a your-app-name-api
heroku addons:create heroku-redis:hobby-dev -a your-app-name-api

# Deploy backend
git subtree push --prefix=server heroku main

# Deploy frontend
git subtree push --prefix=client heroku main
```

### 📋 Production Environment Checklist

Before deploying to production:

- [ ] All API keys are properly set
- [ ] Database connection is working
- [ ] Redis connection is working
- [ ] GitHub OAuth URLs are updated
- [ ] CORS is configured for production domains
- [ ] Environment variables are set correctly
- [ ] Build commands work locally
- [ ] All dependencies are in package.json
- [ ] No .env files are committed to git

### 🔍 Troubleshooting Deployment

**Common Issues:**

1. **Build Fails**
   ```bash
   # Test build locally
   cd server && npm install && npm start
   cd client && npm install && npm run build
   ```

2. **Database Connection Issues**
   - Ensure DATABASE_URL is set correctly
   - Check if PostgreSQL is running on Render
   - Verify network connectivity

3. **API Keys Not Working**
   - Double-check environment variables
   - Ensure no typos in variable names
   - Test API endpoints manually

4. **GitHub OAuth Issues**
   - Update callback URLs in GitHub settings
   - Verify CLIENT_ID and CLIENT_SECRET
   - Check redirect URLs match exactly

### 📊 Monitoring Production

**Render Monitoring:**
- View logs in Render dashboard
- Monitor resource usage
- Set up health checks
- Configure auto-scaling

**Application Monitoring:**
- `/api/ai/health` - AI service status
- `/api/cache/stats` - Cache performance
- Database connection logs
- API response times

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
