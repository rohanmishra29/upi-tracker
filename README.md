# UPI Balance Tracker

## Problem and Domain

Most personal finance apps show transactions as a flat list of amounts. They do not clearly show how a balance evolved transaction by transaction, which makes it hard to spot exactly when and why money moved. People juggling multiple UPI apps also have no single place to see a unified view of their spending.

Themes Selected: Work, Finance & Digital Economy, Human Experience & Productivity

## Objective

Target users: anyone managing personal UPI transactions across multiple apps who wants clarity on where their money goes.

Pain point: existing trackers show amounts in isolation, without a clear running balance, and offer no real insight into spending patterns.

Value provided: a before-to-after balance shown on every single transaction, just like a real bank passbook, combined with AI-generated spending insights and a category breakdown chart.

## Team and Approach

Team Name: SoloStack

Team Members:
- Rohan Kumar Mishra (GitHub: rohanmishra29)

Approach:
- Chose this problem after noticing that no common UPI app clearly shows the balance before and after each transaction, which is the single most useful piece of context when reviewing spending history.
- Key challenge addressed: building a CSV statement parser flexible enough to handle different bank statement column naming conventions, such as Withdrawal Amt versus Debit, without requiring the user to reformat their file.
- Iteration: the running balance logic had to be recomputed in chronological order every time a transaction was added or imported, rather than appended naively, to stay correct regardless of insertion order.

## Tech Stack

Core Technologies Used:
- Frontend: React 19, Vite, Recharts for visualization, PapaParse for CSV parsing
- Backend: Node.js, Express
- Database: None, transaction data is held in client-side state
- APIs: Built for the Anthropic Claude API
- Hosting: Vercel for frontend, Render for backend

Additional Technologies Used:
- AI / ML: Claude API integration for generating spending insights based on real transaction data. Currently running in a mock response mode for the live demo at zero API cost, with the real Claude integration fully wired and ready to activate by adding an API key.

## Key Features

- Dashboard showing current balance, total credited, and total spent
- Before-to-after balance shown on every transaction
- Category-wise spending pie chart
- AI-generated financial insights based on real transaction data
- Manual transaction entry with a debit or credit toggle
- CSV statement upload with flexible column auto-detection
- Clean, fintech-style dark UI

## Demo and Deliverables

- Demo Video Link: to be added
- Deployment Link: https://upi-tracker-five.vercel.app
- Pitch Deck: to be added

## Tasks and Bonus Checklist

- Mandatory social task: pending
- Bonus Task 1, badge sharing: pending
- Bonus Task 2, blog or article: not attempted

## How to Run the Project

Requirements: Node.js v18 or higher, npm

Backend setup:
cd upi-tracker-server
npm install
node index.js
Runs on http://localhost:3002

Frontend setup:
cd upi-tracker
npm install
npm run dev
Runs on http://localhost:5173

## Future Scope

- Direct bank account integration via Account Aggregator APIs
- Support for PDF statement parsing in addition to CSV
- Budget goals and spending alerts
- Multi-currency support

## Resources and Credits

- Built with the Anthropic Claude API
- React, Vite, Recharts, PapaParse, Express

## Final Words

This project came directly from a real personal frustration with how little visibility typical UPI apps give into running balances. Building the CSV import to gracefully handle messy, inconsistent bank statement formats turned out to be the most genuinely useful engineering problem in the whole build.

## Links

- Live App: https://upi-tracker-five.vercel.app
- Frontend Repo: https://github.com/rohanmishra29/upi-tracker
- Backend Repo: https://github.com/rohanmishra29/upi-tracker-server

Built for HACKHAZARDS '26 by Rohan Kumar Mishra, GitHub: rohanmishra29
