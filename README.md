# Vinay Appari — Personal Portfolio & AI Chatbot

A modern, interactive personal portfolio built with React and Spring Boot. This isn't just a static site—it features a custom AI assistant powered by Spring AI and Google's Gemini API that has been specifically trained on my resume and professional background.

## 🚀 Tech Stack

### Frontend (`/portfolio-frontend`)
*   **Framework:** React 19, Vite, TanStack Router
*   **Styling:** Tailwind CSS v4, native CSS scroll-driven animations (`text-wrap: balance`, `animation-timeline`)
*   **UI Components:** shadcn/ui, Radix UI
*   **Deployment:** Vercel

### Backend (`/portfolio-backend`)
*   **Framework:** Java 21, Spring Boot 3
*   **AI Integration:** Spring AI, Google Gemini 3.1 Flash-Lite
*   **Real-time Chat:** Server-Sent Events (SSE) for streaming responses
*   **Build Tool:** Gradle
*   **Deployment:** Render (via Docker)

---

## 🛠️ Running Locally

### Prerequisites
*   Node.js v20+
*   Java 21
*   A Google Gemini API Key

### 1. Start the Backend
The backend serves the AI chatbot. You must provide a Gemini API key.

```bash
cd portfolio-backend
export GEMINI_API_KEY="your_api_key_here"
./gradlew bootRun
```
*The backend will start on `http://localhost:8080`.*

### 2. Start the Frontend
The frontend uses Vite and expects the backend to be running on port 8080 by default.

```bash
cd portfolio-frontend
npm install
npm run dev
```
*The frontend will start on `http://localhost:5173`.*

---

## ☁️ Deployment

This repository is configured for automated, free-tier deployments.

### Backend (Render)
A `Dockerfile` is included in the root of the backend to automate the Java 21 build.
1. Create a new **Web Service** in Render (do *not* use Blueprint).
2. Connect this repository.
3. Set the Root Directory to `portfolio-backend`.
4. Render will automatically detect the Dockerfile.
5. In the setup wizard, under Environment Variables, add `GEMINI_API_KEY` and your actual key.
6. Click Deploy.

### Frontend (Vercel)
1. Import the repository into Vercel.
2. Set the Root Directory to `portfolio-frontend`.
3. Add a `VITE_CHAT_API_URL` environment variable pointing to your Render backend URL (e.g., `https://your-backend.onrender.com`).
