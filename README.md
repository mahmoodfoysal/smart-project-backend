# Smart Project and Task

A smart project and task collaboration system.

## Live Demo

- Live URL: [https://smart-project-task.netlify.app/](https://smart-project-task.netlify.app/)

## Repository

- GitHub Client: [https://github.com/mahmoodfoysal/smart-project](https://github.com/mahmoodfoysal/smart-project)
-
- GitHub Backend: [https://github.com/mahmoodfoysal/smart-project-backend](https://github.com/mahmoodfoysal/smart-project-backend)

## Technologies Used

- Next.js
- Redux Toolkit
- Tailwind CSS
- MongoDB
- Firebase
- Node.js
- Express.js
- JWT Token
- Apex Chart
- Sweet Alert 2

## Protected Route

- Full website have protected route. Without login user can not access any page.
- Admin can access all page.
- Project manager can access project, my task, overview.
- Team member can access my task, overview.

## Public Route

- Login
- Register

## Key Features

- Admin and project manager can see all the running task and progress in the overview.
- Team member can see his assing task and status from overview.
- Admin have full access to this website.
- Only Admin Can create user.
- Project manager can create project assign tasks.
- Team Member can view their assigned tasks and change status.
-

## Short Description

- Admin : Admin have access full website.
- Manage User: Only admin can add or any action for manage user.
- Project Management : Project manager can assign new project add member and assign task. Here also apply some filter. manager can see filter wise.
- My task : Team member can view their assigned tasks and change status. Team member can only view his assing task and change status.

## Setup and Installation

### 1) Clone the repository

```terminal
git clone https://github.com/mahmoodfoysal/smart-project-backend.git
cd smart-project-backend
```

### 2) Install dependencies

```terminal
npm install
```

### 3) Configure environment variables

Create a `.env` file in the root directory and add:

```env

DB_USER=user_name
DB_PASS=your_pass
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret

```

Do not commit `.env` to version control.

### 4) Run the development server

```terminal
node index.js or nodemon index.js
```

Open [http://localhost:5000](http://localhost:5000).

### 5) Build for production

```terminal
Deploy on server
```
