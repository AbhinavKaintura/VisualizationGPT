# Insights AI

A comprehensive data analysis platform that processes CSV data using LLM and generates insightful visualizations.

## Project Overview

Insights AI allows users to upload CSV data, which is then analyzed using Large Language Models to generate insights and create visualizations. The project consists of a Next.js frontend, a backend API, and a Python service for data processing.

## Setup Instructions

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Create a `.env` file in the client directory with the following variables:
   ```
   NEXT_PUBLIC_pythonApi=http://localhost:8000/
   NEXT_PUBLIC_nextbackend=http://localhost:3010/
   ```

3. Install all dependencies:
   ```
   npm install
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

5. Access the application in your browser at:
   ```
   http://localhost:3010
   ```

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Open the `variables.py` file and add your OpenAI API key:
   ```python
   OPENAI_API_KEY = "your_openai_api_key_here"
   ```

3. Run the Python backend:
   ```
   python main.py
   ```

## Features

- CSV data upload and processing
- LLM-powered data analysis
- Interactive graph generation
- Data insights and recommendations

## System Requirements

- Node.js (v14 or higher)
- Python (v3.8 or higher)
