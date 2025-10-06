# lol.consulting - Laravel 12 Application

A Laravel 12 application showcasing lol.consulting's micro-SaaS consulting services and product portfolio.

## Features

### 🎨 Landing Page
- **Hero Section** - Engaging introduction with clear CTAs
- **Products Showcase** - Display of micro-SaaS products (privates.lol, brandr.lol, therapy.lol, todos.lol)
- **Services Section** - 5 consulting service offerings with pricing
- **Process Overview** - 4-step workflow visualization
- **Pricing Tiers** - 3 packages (Micro MVP, Full Platform, Enterprise Ready)
- **Contact Form** - Fully functional with backend validation and email notifications
- **Responsive Design** - Works on all devices

### 🔧 Technical Stack
- **Laravel 12** - Latest Laravel framework
- **Vue 3** - Modern reactive UI with Inertia.js
- **WorkOS** - Authentication integration
- **Pest** - Testing framework
- **SQLite** - Database
- **Custom Design System** - CSS variables with light/dark mode support

### 📧 Contact Form
- Backend validation
- Email notifications to hello@lol.consulting
- Success/error flash messages
- Logs all submissions

### 👀 Preview Routes
Live previews of sub-apps available at:
- `/preview/privates` - Secrets manager dashboard
- `/preview/brandr` - Brand content manager
- `/preview/therapy` - Mental wellness platform
- `/preview/todos` - Todo management app

## Setup

### Prerequisites
- PHP 8.2+
- Composer
- Node.js & NPM
- Laravel Herd (optional)

### Installation

1. **Install Dependencies**
```bash
composer install
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env
php artisan key:generate
```

3. **Database**
```bash
php artisan migrate
```

4. **Build Assets**
```bash
npm run dev
```

5. **Run Server**
```bash
php artisan serve
```

Visit http://localhost:8000

## Development

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
php artisan test
```

### Mail Configuration

To enable contact form emails, configure your mail settings in `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=hello@lol.consulting
MAIL_FROM_NAME="lol.consulting"
```

## Project Structure

```
├── app/
│   └── Http/Controllers/
│       └── ContactController.php      # Contact form handling
├── resources/
│   ├── css/
│   │   ├── app.css                    # Tailwind + Laravel styles
│   │   └── landing.css                # lol.consulting design system
│   ├── js/
│   │   └── pages/
│   │       └── Landing.vue            # Main landing page
│   └── views/
│       └── emails/
│           └── contact.blade.php      # Contact email template
├── public/
│   └── preview/                       # Static preview apps
│       ├── privates/
│       ├── brandr/
│       ├── therapy/
│       └── todos/
└── routes/
    └── web.php                        # Application routes
```

## Design System

The application uses a custom design system with:
- CSS Variables for colors, spacing, typography
- Light/Dark mode support
- FKGroteskNeue font family
- Responsive breakpoints
- Custom teal color palette

## Routes

- `GET /` - Landing page
- `POST /contact` - Contact form submission
- `GET /preview/{app}` - Preview routes for sub-apps
- `GET /dashboard` - User dashboard (requires auth)

## License

Proprietary - © 2025 lol.consulting

## Contact

- Email: hello@lol.consulting
- Website: https://lol.consulting
