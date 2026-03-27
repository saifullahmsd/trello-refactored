# Trello Refactored

A full-stack Trello clone built with the MERN stack. You can create boards, add lists and cards, drag and drop everything, invite teammates, and customize board backgrounds — all in a clean, fully responsive UI.

🔗 **Live Demo:** [trello-refactored.vercel.app](https://trello-refactored.vercel.app)

---


## Features

- **Kanban Boards** — Create unlimited boards with custom background colors or images
- **Lists & Cards** — Add, rename, reorder, and delete lists and cards with drag & drop
- **Card Details** — Each card supports descriptions, labels, checklists, due dates, attachments, comments, cover colors, and member assignments
- **Team Collaboration** — Invite members to boards and assign them to cards
- **Board Customization** — Change board background (color or image) even after creation
- **Authentication** — JWT-based signup, login, and protected routes
- **Fully Responsive** — Works great on mobile, tablet, and desktop

---

## Tech Stack

**Frontend**
- React + Vite
- Redux Toolkit (RTK Query for API calls)
- Material UI (MUI)
- React Beautiful DnD

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/saifullahmsd/trello-refactored.git
cd trello-refactored
```

### 2. Setup the server

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder (use `.env.example` as a reference):

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

### 3. Setup the client

```bash
cd ../client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
trello-refactored/
├── client/              # React frontend
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Route pages
│       ├── store/       # Redux store & API slices
│       └── layouts/     # App layouts
└── server/              # Express backend
    └── src/
        ├── controllers/ # Route handlers
        ├── models/      # Mongoose schemas
        ├── routes/      # API routes
        └── middlewares/ # Auth & error handlers
```

---

## License

MIT — feel free to use this project however you like.
