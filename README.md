# Teebay - Product Renting and Buying Application

This is a simple product renting and buying application built as part of a coding challenge.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Further Development](#further-development)
- [Author](#author)
- [License](#license)

## Introduction

Teebay is a web application that allows users to buy, rent, and sell products. The application is divided into a frontend (React), backend (Node.js with Express), and uses PostgreSQL for the database.

## Features

- **User Authentication:**
  - User registration and login with JWT.
- **Product Management:**
  - Add, edit, and delete products (multi-step form).
  - User-specific product listings.
- **Product Listing:**
  - Browse all products with category filtering, and user filtering.
    - Pagination for improved performance.
  - View product details, and buy or rent the product.
- **Product Buying/Renting:**
  - Ability to buy or rent products
  - Displays user specific rented or bought products.

## Technologies Used

- **Frontend:**
  - React
  - Apollo Client (for GraphQL)
  - React Router (for navigation)
- **Backend:**
  - Node.js
  - Express.js (with apollo-server)
  - GraphQL
  - Prisma (ORM)
  - jsonwebtoken
  - bcrypt
- **Database:**
  - PostgreSQL

## Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   PostgreSQL
-   Docker (Optional)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/SyedIshmumAhnaf/teebay-website.git
    cd teebay-website
    ```

2.  **Backend Setup:**

    *   Navigate to the backend directory:

        ```bash
        cd backend
        ```
    *   Install dependencies:

        ```bash
        npm install
        ```
    *   Create a `.env` file in the backend directory:

      ```env
      DATABASE_URL="your_database_url"
      JWT_SECRET="your_secret_key"
      ```
      Replace `your_database_url` and `your_secret_key` with your database url and secret key respectively.

    *   Setup Database migrations:

        ```bash
        npx prisma migrate dev
        ```
    *  Seed Database

        ```bash
        node seed.js
        ```

3. **Frontend Setup:**

    *   Navigate to the frontend directory:

        ```bash
        cd frontend/teebay-frontend
        ```
    *   Install dependencies:

        ```bash
        npm install
        ```

### Running the Application

1.  **Start the backend:**
    ```bash
    cd backend
    npm start
    ```

2.  **Start the frontend:**

    ```bash
    cd frontend/teebay-frontend
    npm start
    ```

3.  Open your browser and navigate to `http://localhost:3000` for the frontend and `http://localhost:4000` for the backend.

## Project Structure
teebay-website/
├── backend/ # Backend application
│ ├── node_modules/
│ ├── prisma/
│ ├── resolvers/ # GraphQL resolvers
│ ├── schema/ # GraphQL schema
│ ├── server.js # Main server entry point
│ ├── .env # Environment variables
│ ├── package.json
│ ├── seed.js
│ └── ...
├── frontend/ # Frontend application
│ └── teebay-frontend/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ │ ├── apollo/ # Apollo Client setup
│ │ ├── components/ # Reusable React components
│ │ ├── layouts/ # Layout components
│ │ ├── pages/ # Page components
│ │ ├── styles/ # Stylesheets
│ │ ├── App.js # Main application component
│ │ ├── index.js # Entry point
│ │ └── ...
│ ├── package.json
│ └── ...
├── README.md # This file
├── ...
The following features are in the roadmap:

-   Implement a proper product buy/rent feature.
-   Improve UI and UX and make it responsive for all devices.
-   Add proper testing for all components and backend.
-   Implement a token refresh mechanism for a better security.
-   Dockerize the application for deployment.
-   Add more filters to the product listing page.

## Author

Syed Ishmum Ahnaf

## License

[MIT License](https://opensource.org/licenses/MIT)
