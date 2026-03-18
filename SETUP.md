# Setup Guide

A step-by-step guide for getting this project running locally, configuring it for a new client, and understanding the project structure.

---

## Requirements

| Tool | Minimum Version |
|------|----------------|
| PHP  | 8.2 |
| Composer | 2.x |
| Node.js | 18.x LTS or newer |
| npm  | 9.x or newer |
| SQLite | (bundled with PHP) **or** MySQL / PostgreSQL |

---

## 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd <project-folder>

# PHP dependencies
composer install

# Node dependencies
npm install
```

---

## 2. Environment Configuration

Copy the example environment file and fill in the required values:

```bash
cp .env.example .env
```

### Key variables to set

```dotenv
# --- App identity ---
APP_NAME="Your Cooperative Name"
APP_URL=http://localhost:8000

# --- Database (SQLite by default — no extra setup needed) ---
DB_CONNECTION=sqlite
# For MySQL, uncomment and fill in:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=your_db_name
# DB_USERNAME=your_db_user
# DB_PASSWORD=your_db_password

# --- Branding (used by the frontend) ---
VITE_APP_NAME="${APP_NAME}"
VITE_APP_LOGO_URL="/Logo.png"   # path under /public, or a full URL
```

> **Logo:** Place your logo file in the `public/` folder and set `VITE_APP_LOGO_URL` accordingly. The app falls back to `/Logo.png` if unset.

---

## 3. Generate Application Key

```bash
php artisan key:generate
```

---

## 4. Run Migrations & Seed Demo Data

```bash
# Run all migrations
php artisan migrate

# (Optional) Seed with sample data
php artisan db:seed
```

By default, a seed admin account is created only in `local` or `testing`.

You can control the default credentials via `.env`:

```dotenv
SEED_DEFAULT_ADMIN=false
DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=
ALLOW_REGISTRATION=false
```

If `DEFAULT_ADMIN_PASSWORD` is empty, a random password is generated and printed to the seeder output.

---

## 5. Create Storage Symlink

File uploads (images, documents) are stored in `storage/app/public`. The symlink makes them accessible from the browser:

```bash
php artisan storage:link
```

---

## 6. Build Frontend Assets

```bash
# Development (with hot-reload)
npm run dev

# Production build
npm run build
```

---

## 7. Start the Development Server

```bash
# Recommended: Laravel + queue + Vite in one command
composer dev

# Alternative: Laravel + Vite only
npm run start

# Manual mode (two terminals)
# Terminal 1: npm run dev
# Terminal 2: php artisan serve
```

Visit `http://localhost:8000` — the public site.  
Admin panel: `http://localhost:8000/dashboard` (log in first via `/login`).

If you want contact emails to send in the background, run a queue worker:

```bash
php artisan queue:work
```

---

## Changing the Color Theme

Open **`resources/css/app.css`** and edit the **BRAND THEME** block (search for `BRAND THEME`):

```css
/* =============================================
 * BRAND THEME — edit only these values to
 * change the entire app's color scheme
 * ============================================= */
--brand-navy:      #1B3A6B;  /* header, sidebar, footer bg */
--brand-navy-dark: #142D54;  /* top bar bg */
--brand-teal:      #2E6B6B;  /* primary buttons, CTAs, accents */
--brand-teal-dark: #245858;  /* button hover state */
--brand-blue:      #4A7AAC;  /* gradients, footer headings */
--brand-blue-dark: #3d6a99;  /* blue hover */
--brand-light:     #F0F4F8;  /* text-on-dark, auth page bg */
--brand-text:      #2C2C2C;  /* body content text */
--brand-border:    #D6D8DC;  /* subtle borders */
--brand-surface:   #f7f8fa;  /* alternating section bg */
```

Those 10 values cascade through every page — Frontpage, Admin, and Auth.

### Changing the font

1. Replace the Google Fonts `<link>` in `resources/views/app.blade.php`.
2. Update `--font-sans` at the top of `resources/css/app.css`.

---

## Changing Site Content & Navigation

| What to change | Where |
|---|---|
| Nav links, footer quick-links & service-links | `resources/js/pages/Frontpage/_data/layout.data.ts` |
| Contact info (phone, email, address, hours, Facebook URL) | `resources/js/pages/Frontpage/_data/contact.data.ts` |
| Homepage slides fallback, stats bar, core services cards | `resources/js/pages/Frontpage/_data/home.data.ts` |
| Cooperative name (used everywhere) | `APP_NAME` in `.env` |
| Footer tagline | `defaultFooterConfig.tagline` in `layout.data.ts` |

---

## Project Structure (quick reference)

```
├── app/
│   ├── Http/Controllers/      # Laravel controllers (Admin CRUD + Auth)
│   ├── Models/                # Eloquent models
│   └── Services/              # Service classes
├── database/
│   ├── migrations/            # Database schema
│   └── seeders/               # Demo data seeders
├── public/                    # Web root — place logo here
├── resources/
│   ├── css/app.css            # ← THEME COLORS & FONT live here
│   ├── js/
│   │   ├── layouts/           # Admin & Auth shell layouts
│   │   └── pages/
│   │       ├── Admin/         # All admin CRUD pages
│   │       ├── auth/          # Login, register, reset-password pages
│   │       └── Frontpage/     # Public-facing site
│   │           ├── _data/     # ← SITE CONTENT & NAV DATA lives here
│   │           └── layout/    # FrontLayout (header + footer)
├── routes/
│   ├── web.php                # Public routes
│   ├── admin.php              # Admin routes (auth-protected)
│   └── auth.php               # Auth routes
└── storage/app/public/        # Uploaded files (symlinked to public/storage)
```

---

## Production Checklist

- [ ] Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`
- [ ] Run `npm run build` and commit / deploy the compiled `public/build/` folder
- [ ] Run `php artisan config:cache && php artisan route:cache`
- [ ] Run `php artisan storage:link` on the server
- [ ] Ensure the seeded admin account uses a strong password
- [ ] Set `APP_URL` to the live domain
- [ ] Configure `MAIL_*` variables for password-reset emails
- [ ] Place the client logo in `public/` and set `VITE_APP_LOGO_URL`
- [ ] Run a queue worker (or supervisor) for email delivery
