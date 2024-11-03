# Real Time Chart visualizer using Websockets and Queue

This project consists of a frontend and backend, both of which can be run locally. Follow the steps below to set up and start each part of the project. (Please try to setup locally and use and download the .csv file and upload)

## Demo credentials

- email: zahirul@gmail.com
- pass: 123456

---

## Demo credentials

- email: zahirul@gmail.com
- pass: 123456

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
