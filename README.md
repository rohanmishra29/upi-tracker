# UPI Balance Tracker

Live App: https://upi-tracker-five.vercel.app

A smart personal finance tracker that goes beyond simple expense logging. It shows the running balance before and after every transaction, just like a real bank statement, combined with AI-powered spending insights and category breakdowns.

Built for HACKHAZARDS '26 (Cloud/Dev Tools Track) by Rohan Kumar Mishra.

## The Problem

Most personal finance apps show transactions as a flat list of amounts. They don't clearly show how your balance evolved transaction by transaction, which makes it hard to spot exactly when and why your balance dropped or grew. People juggling multiple UPI apps also have no single place to see a unified view of their spending.

## The Solution

UPI Balance Tracker gives you:
- A clear before-to-after balance for every single transaction, like a real passbook or statement
- Manual transaction entry for quick logging
- CSV statement upload with automatic parsing, works with common Indian bank statement formats
- AI-generated spending insights that analyze your transaction patterns
- A category breakdown chart to visualize where your money goes

## Tech Stack

Frontend: React 19, Vite, Recharts, PapaParse, custom fintech-themed dark UI, deployed on Vercel.

Backend: Node.js, Express, secure proxy pattern for AI insight generation, deployed on Render.

AI: Built for the Anthropic Claude API. Currently running in mock mode for the live demo at zero API cost. Fully ready to connect to live Claude responses by adding an API key on the backend, no code changes required.

## Key Features

- Dashboard with current balance, total credited, and total spent
- Before-to-after balance chain on every transaction (the core differentiator)
- Category-wise spending pie chart
- AI-generated financial insights based on real transaction data
- Manual transaction entry with debit/credit toggle
- CSV statement upload with flexible column auto-detection
- Clean, trustworthy fintech-style dark UI

## Architecture

React Frontend (Vercel) talks to Express Backend (Render) which talks to Claude API (Anthropic), and responses flow back the same way.

The backend acts as a secure intermediary. The frontend never exposes API keys, following the same architecture pattern used in production fintech applications.

## Running Locally

Backend:
cd upi-tracker-server
npm install
node index.js
Runs on http://localhost:3002

Frontend:
cd upi-tracker
npm install
npm run dev
Runs on http://localhost:5173

## Links

Live App: https://upi-tracker-five.vercel.app
Frontend Repo: https://github.com/rohanmishra29/upi-tracker
Backend Repo: https://github.com/rohanmishra29/upi-tracker-server

## Built For

HACKHAZARDS '26, Cloud/Dev Tools Track
By Rohan Kumar Mishra (@rohanmishra29 on GitHub)
