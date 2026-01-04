# Micro Engineering Admin Panel - Hostinger Setup Guide

## 📁 Folder Structure

```
hostinger-admin/
├── api/
│   ├── config.php      # Database configuration
│   ├── auth.php        # Admin authentication
│   ├── pages.php       # Page visibility toggle
│   ├── gallery.php     # Gallery CRUD
│   ├── services.php    # Services CRUD
│   ├── contact.php     # Contact form submissions
│   └── upload.php      # Image upload handler
├── admin/
│   ├── index.html      # Admin panel UI
│   └── admin.js        # Admin panel JavaScript
├── database.sql        # Database setup script
└── README.md           # This file
```

## 🚀 Setup Instructions

### Step 1: Create MySQL Database in Hostinger

1. Login to Hostinger → **hPanel**
2. Go to **Databases** → **MySQL Databases**
3. Create a new database (e.g., `microeng_admin`)
4. Create a database user with password
5. Add user to database with **ALL PRIVILEGES**

### Step 2: Run Database Script

1. Go to **Databases** → **phpMyAdmin**
2. Select your database
3. Click **SQL** tab
4. Copy contents of `database.sql` and run

### Step 3: Configure API

1. Open `api/config.php`
2. Update these lines with your database credentials:
   ```php
   define('DB_NAME', 'your_database_name');
   define('DB_USER', 'your_database_user');
   define('DB_PASS', 'your_database_password');
   define('JWT_SECRET', 'your-unique-secret-key');
   ```

### Step 4: Upload Files to Hostinger

Using **File Manager** or **FTP**:

1. Upload `api/` folder to: `public_html/api/`
2. Upload `admin/` folder to: `public_html/admin/`
3. Create `uploads/` folder: `public_html/uploads/`
4. Set permissions: `uploads/` → **755**

### Step 5: Access Admin Panel

1. Go to: `https://yourdomain.com/admin/`
2. Login with:
   - **Username:** admin
   - **Password:** admin123
3. **IMPORTANT:** Change password immediately in Settings!

## 📋 Final Folder Structure on Hostinger

```
public_html/
├── api/
│   ├── config.php
│   ├── auth.php
│   ├── pages.php
│   ├── gallery.php
│   ├── services.php
│   ├── contact.php
│   └── upload.php
├── admin/
│   ├── index.html
│   └── admin.js
├── uploads/           # For uploaded images
└── (React build files - index.html, assets/, etc.)
```

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth.php?action=login` | POST | Admin login |
| `/api/auth.php?action=logout` | POST | Admin logout |
| `/api/pages.php` | GET | Get all pages |
| `/api/pages.php` | PUT | Toggle page visibility |
| `/api/gallery.php` | GET/POST/PUT/DELETE | Manage gallery |
| `/api/services.php` | GET/POST/PUT/DELETE | Manage services |
| `/api/contact.php` | GET/POST/DELETE | Contact form |

## 🔐 Security Notes

1. Change default password immediately
2. Update `JWT_SECRET` in config.php
3. Use HTTPS on your domain
4. Keep PHP and MySQL updated

## 🔗 Connecting React Frontend

To use API data in your React app, update your components to fetch from:
```javascript
const API_URL = 'https://yourdomain.com/api';

// Example: Get visible pages
const response = await fetch(`${API_URL}/pages.php?visible=true`);
const data = await response.json();
```

## ❓ Troubleshooting

**Login not working?**
- Check database credentials in config.php
- Ensure PHP sessions are enabled

**API returning errors?**
- Check PHP error logs in Hostinger
- Verify database tables exist

**Images not uploading?**
- Check uploads folder permissions (755)
- Verify PHP max upload size in php.ini
