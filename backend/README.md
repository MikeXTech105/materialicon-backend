# IconAPI

Enterprise-ready backend admin panel API built with Node.js, Express.js, MySQL2, Sequelize ORM, JWT authentication, Winston logging, validation, Swagger documentation, and a scalable MVC + service + repository structure.

## Features

- API versioning with `/api/v1`
- JWT authentication with secure bcrypt password hashing
- User CRUD with validation, pagination, filtering, search, sorting, duplicate email checks, and soft deletes
- Icon master management with SVG upload, local storage, SVG sanitization, categories, tags, and preview URLs
- Dashboard statistics API
- Sequelize models, migrations, seeders, timestamps, and paranoid mode
- Centralized success and error response format
- Centralized async error handling
- Helmet, CORS, rate limiting, request sanitization, compression, cookies
- Winston file and console logging
- Swagger UI with bearer token support
- Role-ready structure for future RBAC
- Future-ready multer and node-cron utilities

## Project Structure

```text
iconapi/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── middlewares/
│   ├── validations/
│   ├── models/
│   ├── migrations/
│   ├── seeders/
│   ├── helpers/
│   ├── utils/
│   ├── constants/
│   ├── docs/
│   ├── logs/
│   ├── swagger/
│   ├── app.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── .sequelizerc
├── eslint.config.js
├── package.json
└── README.md
```

## Requirements

- Node.js 20 or newer
- MySQL 8 recommended
- npm

## Environment Setup

Create a database named `icon-db`, then copy `.env.example` to `.env` and adjust values if needed.

```env
PORT=5000
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=icon-db
DB_USER=root
DB_PASSWORD=

JWT_SECRET=super_secure_jwt_secret
JWT_EXPIRES_IN=7d
```

## Installation

```bash
npm install
```

## Database Commands

Run migrations:

```bash
npm run migrate
```

Run seeders:

```bash
npm run seed
```

Default admin credentials:

```text
email: admin@example.com
password: Admin@123
```

## Run Commands

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Lint:

```bash
npm run lint
```

## Swagger Documentation

After starting the server, open:

[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

Use the `Authorize` button and paste a JWT token from the login response.

## API Endpoints

Base URL:

```text
http://localhost:5000/api/v1
```

### Auth

```http
POST /api/v1/auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

### Users

```http
POST /api/v1/users
GET /api/v1/users?page=1&limit=10&search=jane&status=active&sortBy=created_at&sortOrder=DESC
GET /api/v1/users/1
PUT /api/v1/users/1
DELETE /api/v1/users/1
```

Protected endpoints require:

```http
Authorization: Bearer <token>
```

### Dashboard

```http
GET /api/v1/dashboard/stats
```

### Icon Management

The icon management module is available under both `/api/v1` and `/api` for admin-panel compatibility.

```http
GET /api/categories
POST /api/categories
PUT /api/categories/1
DELETE /api/categories/1

GET /api/tags
POST /api/tags

GET /api/icons?page=1&limit=10&search=home&category_id=1&style=outlined&status=published
GET /api/icons/1
POST /api/icons
PUT /api/icons/1
DELETE /api/icons/1
```

Upload icons with `multipart/form-data`:

```text
name=Home
category_id=1
style=outlined
status=published
tag_ids=[1,2]
file=@home.svg
```

Uploaded SVG files are sanitized and stored at:

```text
storage/icons/{slug}/{slug}.svg
```

The API returns `preview_url`, which uses `cdn_url` when present and otherwise falls back to the local static file URL.

## Response Format

Success:

```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

Error:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

## Architecture Notes

- Controllers only handle HTTP concerns.
- Services contain business rules.
- Repositories isolate persistence logic.
- Validations are declared separately with `express-validator`.
- Common utilities handle JWT, passwords, pagination, responses, async errors, cron, uploads, and logging.
- User roles are modeled now so RBAC tables and permission middleware can be added without changing API contracts.

## Production Checklist

- Replace `JWT_SECRET` with a strong secret from a secret manager.
- Restrict `CORS_ORIGIN` to trusted frontend domains.
- Use managed MySQL with backups and TLS.
- Ship logs to a centralized log platform.
- Add integration tests and CI before release.
- Run behind a reverse proxy with HTTPS enabled.
