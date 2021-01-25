  <h1 align="center">Nucleus</h1>

  <h3 align="center">
    A HR Management App
  </h3>

  <p align="center">
  |&nbsp;&nbsp;&nbsp;<a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-built-with">Built with</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-deployment-instructions">Deployment Instructions</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<p align="center">
  <img alt="MERN Stack" src="https://img.shields.io/badge/TechStack-MERN-brightgreen">

  <a href="#">
    <img alt="Made by" src="https://img.shields.io/badge/Authors-Rohit%20Chaudhari%20%26%20Viraj%20Jadhav-orange">
  </a>

  <img alt="Hackathon" src="https://img.shields.io/badge/Hackathon-StackHack2.0-9cf">
</p>

## 👨🏻‍💻 About The Project

This application promises to provide a single platform with not so complicated and very simple virtual travel of all the daily / long term activities observed in any company between a HR and company employees. This project delivers a simple solution to track activities such as bonuses, leaves, employee attendance, etc. at one place with organized and informative views, both for HR as well as employee. Employees can visit this portal, mark their attendance, request for leaves / bonuses, checkout FAQs, checkout what team they have been allotted to, etc. A HR being an admin on this portal has additional privileges on top of employees i.e. to keep a watch on all the employees, grant bonuses or approve leaves, update company policy, and much more. (More detailed overview of features given below).

## 🌟 Features

### Employee

-   Dashboard:

    -   [x] Update Profile

    -   [x] Checkout Team Members

    -   [x] Search (Name), Sort and Filter options (Email, Phone, Team, Role)

-   Attendance & Leave Management:

    -   [x] Mark & View Attendance

    -   [x] Request a Leave

-   Payroll Management:

    -   [x] Request for loans

    -   [x] Request for bonus

-   Company related docs:

    -   [x] Checkout FAQs

    -   [x] Read Company Policy

    -   [x] Checkout company holidays

### HR

-   Dashboard:

    -   [x] Organised views to navigate:
        -   All Employees
        -   Employees grouped team wise
        -   Employees grouped role wise
    -   [x] Search (Name, Team, Role), Sort and Filter options (Email, Phone, Team, Role)

-   Dashboard -> Employee Details:

    -   [x] Checkout Details of each employee (In detailed view)
    -   [x] Promote or Demote Employees
    -   [x] Track Attendance at individual level

-   Attendance & Leave Management:

    -   [x] View Employee Attendance (Filter options between months, year, days)

    -   [x] Approve / Reject pending employee Leave

-   Payroll Management:

    -   [x] Approve / Reject requested loans

    -   [x] Approve / Reject requested bonus
    -   [x] Grant Bonus to hardworking employees

-   Company related docs:

    -   [x] Add and Update company FAQs

    -   [x] Add and Update company policy

    -   [x] Add declared holidays

### Additional

-   [x] JWT Based Authentication

-   [x] Intituitive UI

## Built with

-   MongoDB (Database)
-   Express
-   ReactJS
-   NodeJS
-   Ant Design

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

-   **Prerequisites**:

    -   Ubuntu 18.04 > Server
    -   Nginx: [Installation instructions](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)
    -   MongoDB: [Installation instruction](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
    -   Node.js & npm: [Installation instructions](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)

-   Clone the Project:\
    `git clone https://github.com/chaudharirohit2810/StackHack-2.0`

-   Navigate to root project directory:\
    `cd StackHack2.0`

### Backend

-   Install Dependencies required for backend:\
    `npm install`
-   Install Pm2:\
    `sudo npm install pm2@latest -g`
-   Start the backend server:\
    `pm2 start index.js --name stackhack_backend`
-   Save PM2 Process list and corresponding environments:\
    `pm2 save`
-   Navigate to nginx conf file:\
    `cd /etc/nginx/sites-enabled`
-   Open default file as a root:\
    `sudo vim default`
-   Copy following configuration in server block of default file:

    ```
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade'
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    ```

### Frontend:

-   Install Dependencies required for backend:\
    `npm run client-install`
-   Open the config.js file in client/src folder:\
    `cd client/src && vim config.js`
-   Change the backendURL to the url of Backend which is:\
    `http://<ip_address>/api`
-   Navigate to client folder:\
    `cd ..`
-   Build the react project:\
    `npm run build`\
    This will create a build folder in client directory. The app is ready to be deployed!
-   Navigate to nginx conf file:\
    `cd /etc/nginx/sites-enabled`
-   Open default file as a root:\
    `sudo vim default`
-   Copy following configuration in server block of default file:

    ```
      root <path_to_build_folder>;

      index index.html index.htm;

      location / {
              try_files $uri $uri/ /index.html;
      }
    ```
