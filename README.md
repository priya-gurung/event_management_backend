# Event Manager — Backend API

Node.js, Express, and MongoDB backend API for managing **multi-user, timezone-aware events** with **audit logs**.

### Prerequisites

* Node.js **v18+**
* MongoDB — Local or MongoDB Atlas

### Environment Setup

Create a `.env` file in the root of the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/event-manager
NODE_ENV=development
```

### Installation & Run

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## API Endpoints

### Users / Profiles

**Base URL:** `/api/users`

| Method  | Endpoint                  | Description               |
| ------- | ------------------------- | ------------------------- |
| `GET`   | `/api/users`              | Fetch all user profiles   |
| `POST`  | `/api/users`              | Create a new user profile |
| `PATCH` | `/api/users/:id/timezone` | Update a user's timezone  |

**Create User:**

```json
{
  "name": "John Doe",
  "timezone": "Asia/Kolkata"
}
```

**Update Timezone:**

```json
{
  "timezone": "America/New_York"
}
```

### Events

**Base URL:** `/api/events`

| Method | Endpoint               | Description                              |
| ------ | ---------------------- | ---------------------------------------- |
| `GET`  | `/api/events`          | Fetch all events                         |
| `GET`  | `/api/events/:id`      | Get event details                        |
| `POST` | `/api/events`          | Create a new event                       |
| `PUT`  | `/api/events/:id`      | Update an event and generate change logs |
| `GET`  | `/api/events/:id/logs` | Fetch audit history for an event         |

**Optional Query Parameter:**

```text
GET /api/events?userId=<userId>
```

**Create Event:**

```json
{
  "title": "Team Meeting",
  "users": ["userId1", "userId2"],
  "timezone": "Asia/Kolkata",
  "startAt": "2026-08-20T10:00:00.000Z",
  "endAt": "2026-08-20T11:00:00.000Z"
}
```

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **Environment:** dotenv
* **Development:** Nodemon

## Features

* Multi-user event management
* Timezone-aware events
* Event creation and updates
* Event filtering by user
* Automatic audit/change logs
* RESTful API architecture
