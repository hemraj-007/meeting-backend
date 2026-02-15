# Meeting Action Items Tracker — Backend

API backend for the **Meeting Action Items Tracker** web app. Paste a meeting transcript, get extracted action items (task, owner, due date), manage and filter them, and keep a short history of transcripts.

**Deployed backend:** [https://meeting-backend-khru.onrender.com](https://meeting-backend-khru.onrender.com)

---

## Problem Statement (What This App Does)

Build a web app where you can:

- **Paste a meeting transcript** (text is enough)
- **Get a list of action items** (task + owner if possible + due date if found)
- **Edit, add, and delete** action items
- **Mark items as done**
- **See a simple history** of the last 5 transcripts processed

**Make it your own:** filters (open/done), tags, or a better editor.

---

## Completed Features

| Requirement | Status | Notes |
|-------------|--------|--------|
| Paste meeting transcript | ✅ | POST transcript text; LLM extracts action items |
| Get action items (task, owner, due date) | ✅ | Returned on process + GET `/api/items` |
| Edit action items | ✅ | PUT `/api/items/:id` |
| Add action items | ✅ | POST `/api/items` (task, owner, dueDate, transcriptId, tags) |
| Delete action items | ✅ | DELETE `/api/items/:id` |
| Mark items as done | ✅ | `completed` flag via PUT `/api/items/:id` |
| History of last 5 transcripts | ✅ | GET `/api/transcripts?limit=5` (default 5) |
| Delete transcript | ✅ | DELETE `/api/transcripts/:id` |
| **Extras** | | |
| Tags | ✅ | Create/update items with `tags`; filter via `?tag=...` |

---

## Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express 5  
- **Database:** PostgreSQL (Prisma ORM)  
- **LLM:** Groq (Llama) for extracting action items from transcript text  

---

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL (or a Postgres URL, e.g. Neon)

### 1. Install dependencies

```bash
npm install
```

(`postinstall` runs `prisma generate`.)

### 2. Environment variables

Create a `.env` in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
LLM_API_KEY=your_groq_api_key
CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
PORT=4000
```

- **DATABASE_URL** — Postgres connection string.  
- **LLM_API_KEY** — [Groq](https://console.groq.com/) API key for transcript extraction.  
- **CORS_ORIGIN** — Comma-separated frontend origins (e.g. Vite dev server, production URL).  
- **PORT** — Server port (default `4000`).

### 3. Database

```bash
npx prisma migrate deploy
```

(Or `npx prisma db push` for prototyping.)

### 4. Run

**Development (with reload):**

```bash
npm run dev
```

**Production:**

```bash
npm run build
npm start
```

Server runs at `http://localhost:4000` (or your `PORT`).

---

## API Reference

**Base URL (local):** `http://localhost:4000` (or your `PORT`).  
**Base URL (deployed):** `https://meeting-backend-khru.onrender.com`

### Transcripts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/transcripts` | Process a transcript. Body: `{ "text": "..." }`. Returns extracted action items. |
| `GET` | `/api/transcripts` | Transcript history. Query: `?limit=5` (default 5). |
| `DELETE` | `/api/transcripts/:id` | Delete a transcript (and its action items). Returns 404 if not found. |

### Action Items

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/items` | List items. Query: `?completed=true|false`, `?tag=value`. |
| `POST` | `/api/items` | Create item. Body: `{ "task", "transcriptId", "owner?", "dueDate?", "tags?" }`. |
| `PUT` | `/api/items/:id` | Update item. Body: `{ "task?", "owner?", "dueDate?", "completed?", "tags?" }`. |
| `DELETE` | `/api/items/:id` | Delete an action item. |

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Basic health check (optionally checks DB/LLM). |

---

## Project Structure

```
src/
  index.ts           # App entry, CORS, routes
  prisma.ts          # Prisma client
  routes/            # Express routers (transcripts, items, health)
  controllers/       # Request handlers
  services/          # LLM (Groq) extraction
prisma/
  schema.prisma      # Transcript, ActionItem models
```

---

## License

ISC
