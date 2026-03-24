# MPC Website Template

A reusable Laravel + Inertia + React template for cooperative or organization websites, with a public front page and an admin dashboard for content management.

## Features

- Public front page with services, news, FAQs, officers, and contact
- Admin dashboard with CRUD for content sections
- Admin-managed site setting for contact form recipient email
- Branding via CSS variables and app config
- Inertia + React front end with Tailwind
- File uploads and media galleries

## Tech Stack

- Laravel
- Inertia.js + React
- TypeScript
- Tailwind CSS
- Vite

## Quick Start

```bash
composer install
npm install

cp .env.example .env
php artisan key:generate
php artisan migrate

# Recommended: run Laravel + Vite together
composer dev

# Alternative (manual, two terminals)
# npm run dev
# php artisan serve
```

## Customization Guide

Common edits live in `resources/js/pages/Frontpage/_data/`:

- Navigation and footer: `layout.data.ts`
- Contact info: `contact.data.ts`
- Homepage content: `home.data.ts`

Branding lives in `resources/css/app.css` under `BRAND THEME`.

## Seeding Admin Access

By default, a seed admin is created only in `local` or `testing`. You can control it via `.env`:

```dotenv
SEED_DEFAULT_ADMIN=false
DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=
ALLOW_REGISTRATION=false
```

If `DEFAULT_ADMIN_PASSWORD` is empty, a random password is generated and printed to the seeder output.

`ALLOW_REGISTRATION` defaults to `false` (admin-only access). Set it to `true` only when you want to allow self-service registration for non-admin users.

## Site Settings

Admins can configure the contact form recipient email from the dashboard:

- Go to `Settings -> Site`
- Set `Contact recipient`

If not set, the app falls back to `MAIL_FROM_ADDRESS`.

## Quality Commands

```bash
# Type-check frontend
npm run types

# Lint without changing files
npm run lint

# Lint and auto-fix
npm run lint:fix
```

## Production Notes

- Set `APP_ENV=production` and `APP_DEBUG=false`
- Run `npm run build` and deploy `public/build`
- Run `php artisan config:cache && php artisan route:cache`
- Run `php artisan storage:link` on the server
- Configure `MAIL_*` variables for password reset and contact form delivery
- Run a queue worker for email delivery

## License

MIT (or your preferred license for portfolio use).
