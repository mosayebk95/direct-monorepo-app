# Direct Monorepo - React Component Library & List Management

## A professional monorepo setup with a reusable UI component library and a modern list management application built with React, TypeScript, and Vite.

## Tech Stack

- **React + Vite** - for blazing fast development experience
- **TypeScript** – for static typing and better maintainability
- **Monorepo Management**: pnpm workspaces
- **UI Library**: Custom component library (@monorepo/ui)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with PostCSS
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Features

🏗️ **Monorepo Architecture**

- Workspace-based structure with pnpm workspaces
- Shared UI components across multiple applications
- Independent package development with watch mode

📦 **Component Library (@monorepo/ui)**

- Button Component with variants, sizes, and loading states
- Input Component with validation and error states
- Select Component with keyboard navigation
- Table Component with sorting, pagination, and row selection
- Full TypeScript support with proper type exports

🌐 **Web Application**

- **List Management**: View and filter
- **Advanced Filtering**: Search by name/email and filter by status/role
- **Sorting & Pagination**: Client-side data manipulation
- **Mock API Integration**: Simulated API calls with delays
- **Responsive Design**: Fully responsive across all devices

## Prerequisites

- Node.js >= 24
- pnpm >= 10

## Installation

Run the following commands to install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

The app will run in development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Available Scripts

- pnpm dev – Run all workspaces concurrently in development mode
- pnpm build – Build all packages and the application for production
- pnpm build:packages – Build only the ui and utils packages
- pnpm build:web – Build only the web application
- pnpm format – Format code with Prettier

## Project Structure

direct-monorepo-app/
├── packages/
│ ├── ui/ # Reusable component library
│ └── utils/ # Utility functions
└── apps/
└── web/ # Main list management application

## Authors

- **Mosayeb Kiani** – mosayeb.kia95@gmail.com
