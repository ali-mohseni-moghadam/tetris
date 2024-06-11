# Tetris Game with T3 Stack

This project is a modern Tetris game built using the T3 stack, which includes Next.js, Tailwind CSS, ShadCN, TRPC, and React Query, alongside Babylon.js for the game graphics and mechanics.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Project Overview

This project is a web-based Tetris game. The game logic and rendering are handled by Babylon.js, a powerful 3D engine. The T3 stack provides a robust foundation for building and managing the game's backend and frontend

interfaces. Tailwind CSS and ShadCN are used for styling, while TRPC and React Query manage data fetching and state synchronization.

## Features

- Classic Tetris gameplay with intuitive controls.
- Real-time updates and synchronization using TRPC.
- Responsive design with Tailwind CSS and ShadCN.
- Modern, maintainable codebase with Next.js.
- High-performance rendering with Babylon.js.

## Tech Stack

- **Next.js**: React framework for building server-side rendered and static web applications.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **ShadCN**: Component library for building modern web applications.
- **TRPC**: Type-safe APIs using TypeScript.
- **React Query**: Powerful data-fetching and state management library for React.
- **Babylon.js**: 3D engine for graphics rendering and game logic.

## Getting Started

### Prerequisites

Ensure you have the following software installed on your local development machine:

- [Node.js](https://nodejs.org/en/download/) (version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://classic.yarnpkg.com/en/docs/install/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/tetris.git
   cd tetris-game
   ```

2. Install the dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file based on the `.env.example` template and fill in the necessary environment variables.

   ```sh
   cp .env.example .env
   ```

4. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to see the game in action.

## Usage

- Use the arrow keys to control the falling Tetris pieces.
- Complete lines to score points.
- The game speeds up as you progress.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

Please ensure your code follows the project's coding guidelines and includes relevant tests.

## Acknowledgements

- [Babylon.js Documentation](https://doc.babylonjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TRPC Documentation](https://trpc.io/docs)
- [React Query Documentation](https://react-query.tanstack.com/)
- [ShadCN Documentation](https://shadcn.dev/docs)
