# Project Guide

This document explains what the project uses, how it is structured, and the best-practice patterns behind the setup. It is intended as a learning guide for a reusable Laravel + Inertia + React template.

## 1. High-Level Architecture

- Backend: Laravel handles routing, auth, database, validation, and server-side concerns.
- Frontend: Inertia.js connects Laravel routes to React pages without a separate API layer.
- Build: Vite compiles the React and CSS assets.
- Styling: Tailwind CSS is used for utility-first styling with a central brand theme.

Request flow:

1. Browser requests a Laravel route.
2. Laravel returns an Inertia response pointing to a React page component.
3. The React page renders using shared props (auth state, flash messages, etc.).
4. Mutations (forms) post back to Laravel routes.

## 2. Tech Stack

Backend:

- Laravel 12
- Inertia.js (Laravel adapter)
- Laravel Sanctum (auth/session support)
- Laravel Wayfinder (typed routes)

Frontend:

- React 19 + TypeScript
- Inertia React adapter
- Tailwind CSS 4
- Radix UI primitives and Headless UI
- React Hook Form for form state

Tooling:

- Vite 7
- ESLint + Prettier
- TypeScript

## 3. Core Directories

Backend:

- `app/`  
  Controllers, models, services, mail, middleware.
- `database/`  
  Migrations, seeders, factories.
- `routes/`  
  `web.php` for public routes, `admin.php` for admin, `auth.php` for auth.
- `resources/views/`  
  Blade shell used by Inertia and email templates.
- `storage/`  
  File uploads, caches, and logs.

Frontend:

- `resources/js/app.tsx`  
  Inertia app bootstrap and React setup.
- `resources/js/layouts/`  
  Shared layout shells for Auth/Admin/Frontpage.
- `resources/js/pages/`  
  React pages used by Inertia.
- `resources/js/pages/Frontpage/_data/`  
  Static content configuration for easier reuse.
- `resources/css/app.css`  
  Tailwind entry plus branding variables.

## 4. Routing Structure

Public routes: `routes/web.php`

- Home, About, Services, News, Contact, Downloads, etc.

Admin routes: `routes/admin.php`

- Protected by `auth` and `verified`.
- CRUD endpoints for officers, FAQs, galleries, news, downloadables, and homepage slides.

Auth routes: `routes/auth.php`

- Login, register, password reset, verification.

Best practice:

- Keep public routes in `web.php` and admin routes in `admin.php`.
- Use controllers for admin CRUD and public pages that need data.
- Only keep simple static pages as inline route closures.

## 5. Inertia and React Pages

Inertia maps Laravel route names to React page files:

- `Inertia::render('Frontpage/Home/Index')` resolves to
  `resources/js/pages/Frontpage/Home/Index.tsx`.

Best practices:

- One page component per route.
- Use layouts (`FrontLayout`, `AdminLayout`) to keep shared UI consistent.
- Keep data fetching and pagination in controllers.
- Keep UI-level composition in React pages/components.

## 6. Shared Props and Types

`app/Http/Middleware/HandleInertiaRequests.php` shares global data:

- app name
- authenticated user
- flash messages
- sidebar state

Frontend types are defined in:

- `resources/js/types/index.d.ts`

Best practice:

- Keep server-shared props typed and in sync with middleware.
- Allow `auth.user` to be `null` for guests.

## 7. Styling and Branding

Brand theme variables live in:

- `resources/css/app.css`

Best practice:

- Only edit the BRAND THEME block to change the global look.
- Use Tailwind utility classes for consistent spacing/typography.
- Define component-level variants using class-variance-authority if needed.

## 8. Forms and Validation

Backend validation:

- Use FormRequest classes in `app/Http/Requests/`.
- Keep rules and messages close to the request class.

Frontend forms:

- `useForm` from Inertia handles form state and errors.
- React Hook Form can be used for complex client-side validation.

Best practice:

- Validate on the server even if client validation exists.
- Return errors through Inertia so they map to field error UI.

## 9. File Uploads

Uploads are stored in:

- `storage/app/public`

Public access is enabled via:

- `php artisan storage:link`

Best practice:

- Validate file size and mime types with FormRequest rules.
- Delete old files when replacing records.

## 10. Mail and Queues

Contact form sends mail via a queued Mailable:

- `app/Mail/ContactFormSubmitted.php`
- `resources/views/emails/contact-form.blade.php`

Queue driver is configured in `.env` (`QUEUE_CONNECTION=database`).

Best practice:

- Use queue workers in production.
- Keep mail formatting in Blade templates.

## 11. Environment Configuration

Key `.env` values:

- `APP_NAME`, `APP_URL`
- `DB_*` for database
- `MAIL_*` for mail delivery
- `VITE_APP_NAME`, `VITE_APP_LOGO_URL`
- `SEED_DEFAULT_ADMIN`, `DEFAULT_ADMIN_*`

Best practice:

- Never commit real secrets to git.
- Use `.env.example` as the template for new environments.

## 12. Scripts and Commands

Node:

- `npm run dev` for Vite
- `npm run build` for production
- `npm run lint` and `npm run format`

PHP:

- `php artisan migrate`
- `php artisan db:seed`
- `php artisan queue:work`

Best practice:

- Use `npm run build` before deployment.
- Run tests and linting during CI.

## 13. Data Content Structure

Static site content is stored in `_data` files:

- `layout.data.ts` for navigation and footer
- `home.data.ts` for homepage blocks
- `contact.data.ts` for address/phone/email

Best practice:

- Keep these files as the single source of truth for static text.
- Pass data into components rather than hardcoding inside JSX.

## 14. Testing and Quality

Testing:

- PHPUnit / Pest are available (see `composer.json`).

Linting and formatting:

- ESLint configured for React + TS
- Prettier and Tailwind class sorting

Best practice:

- Add feature tests for each admin CRUD flow.
- Add smoke tests for public pages.

## 15. Deployment Checklist

1. `APP_ENV=production`, `APP_DEBUG=false`
2. `npm run build` and deploy `public/build`
3. `php artisan config:cache && php artisan route:cache`
4. `php artisan storage:link`
5. Start a queue worker
6. Ensure seeded admin uses a strong password

## 16. Recommended Learning Path

1. Read `routes/web.php` and open the matching React pages.
2. Read one controller + its React page to see data flow.
3. Explore `_data` files to see how content is centralized.
4. Modify the brand theme in `resources/css/app.css`.

## 17. Where To Start Editing For Clients

- Brand colors: `resources/css/app.css`
- Logo: `public/` + `VITE_APP_LOGO_URL`
- Text content: `resources/js/pages/Frontpage/_data/*.ts`
- Pages layout: `resources/js/pages/Frontpage/layout/FrontLayout.tsx`

If you want, I can add diagrams or a section-by-section walkthrough of a specific feature.
