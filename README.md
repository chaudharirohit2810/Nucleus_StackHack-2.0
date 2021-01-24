  <h1 align="center">Nucleus</h1>

  <h3 align="center">
    A HR Management App
  </h3>

  <p align="center">
  <a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-built-with">Built with</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-acknowledgements">Acknowledgements</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<p align="center">
  <img alt="MERN Stack" src="https://img.shields.io/badge/TechStack-MERN-brightgreen">

  <a href="#">
    <img alt="Made by" src="https://img.shields.io/badge/Authors-Rohit%20Chaudhari%20%26%20Viraj%20Jadhav-orange">
  </a>

  <img alt="Hackathon" src="https://img.shields.io/badge/Hackathon-StackHack2.0-9cf">
</p>

## 👨🏻‍💻 About The Project

Implementation of project for StackHack2.0 hackathon on Hackerearth.

## 🌟 Features

### Employee

-   Attendance & Leave Management:

    -   [x] Mark & View Attendance
    -   [x] Request a Leave

-   Payroll Management:

    -   [x] Request for loans
    -   [x] Request for bonus

-   Company related docs
    -   [x] Checkout FAQs
    -   [x] Read Company Policy
    -   [x] Checkout company holidays

### HR

-   Promote or Demote Employees
-   Add company FAQs
-   Edit company policy
-   Add declared holidays
-   Approve/Reject Leaves, Loans and Bonus
-   Grant Bonus to hardworking employees

### Other

-   JWT Based Authentication
-   Intituitive UI

## Getting Started

1. Make sure you have MongoDB, Node.js, React and NPM installed
2. Clone the Project using `git clone https://github.com/chaudharirohit2810/StackHack-2.0` or you can download the zip and unzip it.
3. Navigate to Project root directory: `cd StackHack2.0`
4. Run `npm install` to install dependencies required for backend
5. Run `npm run client-install` to install dependencies required for frontend
6. Run `npm run dev` to start the project. This will start backend on port 5000 while frontend will run on 3000
7. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
8. The page will reload if you make edits.\
   You will also see any lint errors in the console.

## Deployment Instructions

### Backend

-   **Prerequisites**:

    -   Ubuntu 18.04 > Server
    -   Nginx: [Installation instructions](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)
    -   MongoDB: [Installation instruction](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
    -   Node.js & npm: [Installation instructions](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)

-   Clone the Project:\
    `git clone https://github.com/chaudharirohit2810/StackHack-2.0`
-   Navigate to root project directory:\
    `cd StackHack2.0`
-   Install Pm2:\
    `sudo npm install pm2@latest -g`
-   Install Dependencies required for backend:\
    `npm install`
-   Start the backend server:\
    `pm2 start index.js --name stackhack_backend`
-   Save PM2 Process list and corresponding environments:\
    `pm2 save`
-   Navigate to nginx conf file:\
    `cd /etc/nginx/sites-enabled`
-   Open default file as a root:\
    `sudo vim default`
-   Copy following configuration in server block of default

    ```
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade'
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    ```
