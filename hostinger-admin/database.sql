-- Micro Engineering Admin Panel Database Setup
-- Run this SQL in Hostinger cPanel -> phpMyAdmin

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Page visibility settings
CREATE TABLE IF NOT EXISTS page_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_name VARCHAR(50) NOT NULL UNIQUE,
    page_title VARCHAR(100) NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(100),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (username: admin, password: admin123)
-- IMPORTANT: Change this password immediately after first login!
INSERT INTO admin_users (username, password, email) VALUES 
('admin', '$2y$10$8K1p/a0dR1xqM8K3hQx0/.qvzJJLJMYQAQJXJGLMCQ8IJ8.KC6mLe', 'admin@example.com');

-- Insert default page settings
INSERT INTO page_settings (page_name, page_title, is_visible) VALUES 
('services', 'Services Page', TRUE),
('gallery', 'Gallery Page', TRUE),
('solutions', 'Solutions Page', TRUE),
('about', 'About Page', TRUE),
('contact', 'Contact Page', TRUE);

-- Insert sample services
INSERT INTO services (title, description, icon, sort_order) VALUES
('CNC Machining', 'Precision CNC machining services for complex parts', 'cnc', 1),
('Sheet Metal Fabrication', 'Custom sheet metal fabrication and bending', 'fabrication', 2),
('Prototype Development', 'Rapid prototyping and development services', 'prototype', 3),
('VMC Machining', 'Vertical machining center operations', 'vmc', 4);
