# Vacations

Hello There! Welcome to Vacations. [[Live Demo](https://project-vacations.com/login)]

## Table of contents

- [General Info](#general-info)
- [Roles and and privileges](#roles-and-privileges)
- [Infrastructure](#infrastructure)
- [Interface](#interface)
- [Setup](#setup)

## General info

This project is a vacation management website.
Create an account and start viewing and following your favorite vacations.
Admins will have additional privileges to add, edit, and delete vacations, as well as watch the most popular vacations graph and download it as a CSV file.

## Roles and privileges

#### User

- View vacations
- Follow / Un-follow vacations

#### Admin

- Add, edit, and delete vacations.
- View most popular vacations reports graph and download it as a CSV file.

## Infrastructure

This project is built using:

    Client Side: React using Redux written in typescript
    Server Side: Node.js REST API using Express
    Database: MySQL

## Interface

### Login page

Users will have to register if they do not have a account
(for showcasing User and Admin login details are written below the login tab)

![Login](/frontend/src/assets/images/Login.png)

### User

#### Vacations page

    * Logged in users can view the vacations page.
    * Display vacation details, followers, and follow status.
    * Page pagination for the listed vacations.
    * Filtering options for displayed vacations.

![User Homepage](/frontend/src/assets/images/UserHomepage.png)

### Admin

#### Vacations page

    * Logged in admins can view the vacations page.
    * add new vacations
    * Display vacation details, update vacation or delete
    * Page pagination for the listed vacations.
    * Filtering options for displayed vacations.

![Admin Homepage](/frontend/src/assets/images/AdminHomepage.png)

#### Vacation Chart page

    * A chart which displayes all vacation names and their follower count
    * Download the chart as a CSV file.

![Admin Chart](/frontend/src/assets/images/Chart.png)

## Setup

### Prerequisites

    * TypeScript
    * React
    * Redux
    * Node.js
    * Express
    * MySQL
    * Docker

### Installation

    # Clone the repo
    git clone https://github.com/David-Gavrilyuk/Nomad-Vacations.git

    # Install server side NPM packages
    cd backend
    npm install

    # Install client side NPM packages
    cd frontend
    npm install

    # Run the development server
    cd backend
    npm start

    # Run the development client
    cd frontend
    npm start

    # Or run docker-compose up -d --build
