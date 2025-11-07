# HTTP Verbs Usage in Habit Hero Project

This document explains where the following HTTP verbs have been used in the Habit Hero project:

## GET

- **Retrieves a representation of a resource**
- **Usage in the project:**
  - `fetchHabits()` in `src/api.js`: Retrieves all habits from the backend.
  - `fetchShares()` in `src/api.js`: Retrieves all shared habits.
  - `fetchUpvotes()` in `src/api.js`: Retrieves all upvotes.
  - `getUpvotesForShare(shareId)` in `src/api.js`: Retrieves upvotes for a specific share.
  - Used in `src/App.jsx` to fetch habits for the current user.
  - Used in `src/components/SharedProgress.jsx` to fetch shares, habits, and upvotes.
  - Used in `src/components/Report.jsx` to fetch habits for generating reports.

## POST

- **Create a new resource using data in the body of the request**
- **Usage in the project:**
  - `addHabit(habitData)` in `src/api.js`: Creates a new habit.
  - `addShare(shareData)` in `src/api.js`: Creates a new share for a habit.
  - `addUpvote(upvoteData)` in `src/api.js`: Creates a new upvote for a share.
  - Used in `src/components/AddHabitForm.jsx` to add a new habit.
  - Used in `src/components/HabitItem.jsx` to share a habit.

## PUT

- **Update an existing resource using data in the body of the request**
- **Usage in the project:**
  - `updateHabit(id, updatedData)` in `src/api.js`: Updates an existing habit.
  - `updateShare(id, updatedData)` in `src/api.js`: Updates an existing share.
  - Not directly used in components, but available for future updates.

## DELETE

- **Deletes a specific resource**
- **Usage in the project:**
  - `deleteHabit(id)` in `src/api.js`: Deletes a specific habit.
  - `deleteShare(id)` in `src/api.js`: Deletes a specific share.
  - Used in `src/components/HabitItem.jsx` to delete a habit.
  - Used in `src/components/SharedProgress.jsx` to delete a share.

## PATCH

- **Update part of an existing resource using data in the body of the request**
- **Usage in the project:**
  - Not currently used in the project.

## HEAD

- **Asks for a response (like a GET but without the body)**
- **Usage in the project:**
  - Not currently used in the project.

## TRACE

- **Echoes back the received request**
- **Usage in the project:**
  - Not currently used in the project.

## OPTIONS

- **Returns the HTTP methods the server supports**
- **Usage in the project:**
  - Not currently used in the project.

## CONNECT

- **Converts the request to a TCP/IP tunnel (generally for SSL)**
- **Usage in the project:**
  - Not currently used in the project.
