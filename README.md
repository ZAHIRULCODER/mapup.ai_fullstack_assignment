# Real Time Chart visualizer using Websockets and Queue

This project consists of a frontend and backend, both of which can be run locally. Follow the steps below to set up and start each part of the project. (Please try to setup locally and use and download the .csv file and upload)

## Demo credentials

- email: zahirul@gmail.com
- pass: 123456

---

## Areas of improvement

- CSV File Storage: Right now, CSV files are stored directly on the server for processing. A better approach would be to store these files in an Amazon S3 bucket. This would reduce the load on the server, make it easier to manage large files, and improve overall scalability. Storing files in S3 also adds security, durability, and backup features, making the system more reliable and efficient.

---

## live URLs for both frontend and backend deployments (Check the code for full URLs)

- FRONTEND URL: https://mapup-ai-frontend.vercel.app/
- BACKEND URL: https://mapupbe.onrender.com

---


## Prerequisites

- **Node.js** and **npm** installed on your machine.
- **Docker** installed (for the Redis server).

---

## Setup Instructions

### Frontend

1. **Update Render URLs**:
   - Replace all Render URLs in the codebase with `http://localhost:3000` to ensure they point to local server (backend code).

2. **Install Dependencies**:
   ```bash
   npm install

2. **Start the Development Server**:
   ```bash
   npm run dev


### Backend

1. **Install Docker**:
    - If Docker isn’t already installed, download and install it from the Docker website.


2. **Start a Redis container using the following command**:
   ```bash
     docker run -d --name redis-server -p 6379:6379 -p 8001:8001 redis/redis-stack:latest


3. **Install Dependencies**:
   ```bash
   npm install


4. **Start the Development Server**:
   ```bash
   npm run dev
