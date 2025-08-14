
# Todo List App

A simple Todo List web application built with **Node.js**, **Express**, **MongoDB Atlas**, and **EJS**.  
Users can add, edit, delete tasks, and set priorities.

## Live Demo

### Copy Link
```bash
https://todo-list-5bbi.onrender.com/
````

## Features

* Add new tasks
* Edit existing tasks
* Delete tasks
* Set priority levels: Low, Medium, High
* Data stored in MongoDB Atlas
* EJS templates for rendering

## Tech Stack

* **Backend:** Node.js, Express
* **Frontend:** EJS, HTML, CSS
* **Database:** MongoDB Atlas
* **Deployment:** Render
* **Version Control:** Git and GitHub

## Project Structure

```
project-folder/
│
├── public/              # Static files (CSS, images)
├── views/               # EJS templates
├── server.js            # Server code
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables (not committed)
└── README.md            # Project documentation
```

## Installation and Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/mudit2838/todo_list.git
   cd todo_list
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file**

   ```
   PORT=8000
   MONGO_URI=your_mongodb_atlas_connection_string
   ```

4. **Run the application**

   ```bash
   node server.js
   ```

   Visit: `http://localhost:8000`

## Deployment on Render

1. Push your code to GitHub
2. On Render, create a new Web Service
3. Select your GitHub repository
4. Build command:

   ```bash
   npm install
   ```
5. Start command:

   ```bash
   node index.js
   ```
6. Add environment variables on Render:

   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   ```

---


