# Habit Tracker

## Overview

Habit Tracker is a web application designed to help users build and maintain positive habits. It allows users to create habits, track their daily progress over a week, view detailed reports, and share their progress with others. The app includes features like real-time chat for shared progress and a community aspect where users can upvote each other's achievements.

The application is built with a modern web stack, using React for the frontend and a JSON-based backend for data storage. It incorporates user authentication to ensure personalized experiences and secure data handling.

## Features

- **User Authentication**: Secure login and registration using Clerk authentication service.
- **Habit Management**: Create, view, update, and delete personal habits.
- **Weekly Tracking**: Track habit completion for each day of the week with an intuitive interface.
- **Detailed Views**: See a week-by-week breakdown of habit progress.
- **Reports**: Generate statistics and reports on habit completion rates.
- **Shared Progress**: Share your habit progress publicly and view others' achievements.
- **Community Interaction**: Upvote shared progress and engage in real-time chat discussions.
- **Real-Time Chat**: Communicate with other users about shared habits using Firebase-powered chat.
- **Responsive Design**: Works well on desktop and mobile devices with Bootstrap styling.

## Technologies Used

### Frontend

- React: JavaScript library for building user interfaces.
- Vite: Fast build tool and development server.
- React Router: For handling navigation between different pages.
- Clerk: Authentication and user management.
- Bootstrap: CSS framework for responsive design.
- Font Awesome: Icon library for visual elements.
- Axios: HTTP client for API requests.

### Backend

- JSON Server: Simple REST API server for data storage and retrieval.
- Firebase: Real-time database for chat functionality.

### Development Tools

- ESLint: Code linting for maintaining code quality.
- Vite: Development server and build tool.

## Installation

To run this project locally, you need to have Node.js and npm installed on your machine.

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Steps

1. Clone the repository:

   ```
   git clone [Repository URL]
   cd habit-tracker
   ```

2. Install frontend dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=http://localhost:4000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_firebase_database_url
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

4. Start the backend server (JSON Server):

   ```
   npx json-server --watch db.json --port 4000
   ```

5. Start the frontend development server:

   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173` to view the application.

## Usage

1. **Sign Up/Login**: Create an account or log in using the Clerk authentication.
2. **Add Habits**: Click on "Add Habit" to create a new habit you want to track.
3. **Track Progress**: For each habit, mark days as "Done" or "Not Done" in the week view.
4. **View Reports**: Check your overall progress and statistics in the Report section.
5. **Share Progress**: Share your habit achievements and view others' progress.
6. **Interact**: Upvote shared progress and chat with other users in real-time.

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /habits` - Retrieve all habits
- `POST /habits` - Create a new habit
- `PUT /habits/:id` - Update a specific habit
- `DELETE /habits/:id` - Delete a specific habit
- `GET /shares` - Retrieve all shared progress
- `POST /shares` - Create a new share
- `DELETE /shares/:id` - Delete a specific share
- `GET /upvotes` - Retrieve all upvotes
- `POST /upvotes` - Create a new upvote
- `GET /upvotes?shareId=:id` - Get upvotes for a specific share

## Project Structure

```
habit-tracker/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── AddHabitForm.jsx
│   │   ├── Chat.jsx
│   │   ├── Clock.jsx
│   │   ├── DayContainer.jsx
│   │   ├── HabitItem.jsx
│   │   ├── HabitList.jsx
│   │   ├── Navbar.jsx
│   │   ├── Report.jsx
│   │   ├── SharedProgress.jsx
│   │   └── WeekView.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── firebase.jsx
│   ├── index.css
│   ├── main.jsx
│   └── assets/
│       └── react.svg
├── db.json
├── package.json
├── vite.config.js
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Submit a pull request with a clear description of your changes.

## Links

- Frontend: [Frontend Link]
- Backend: [Backend Link]
