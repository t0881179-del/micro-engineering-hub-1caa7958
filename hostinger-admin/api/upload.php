<?php
/**
 * File Upload API
 * Handle image uploads for gallery
 */
require_once 'config.php';

// Validate authentication
validateToken();

// Upload directory
$uploadDir = '../uploads/';

// Allowed file types
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$maxFileSize = 5 * 1024 * 1024; // 5MB

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, null, 'Method not allowed', 405);
}

if (!isset($_FILES['image'])) {
    sendResponse(false, null, 'No image file provided', 400);
}

$file = $_FILES['image'];

// Check for upload errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    $errorMessages = [
        UPLOAD_ERR_INI_SIZE => 'File exceeds server limit',
        UPLOAD_ERR_FORM_SIZE => 'File exceeds form limit',
        UPLOAD_ERR_PARTIAL => 'File was only partially uploaded',
        UPLOAD_ERR_NO_FILE => 'No file was uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
        UPLOAD_ERR_EXTENSION => 'Upload blocked by extension'
    ];
    $message = isset($errorMessages[$file['error']]) ? $errorMessages[$file['error']] : 'Unknown upload error';
    sendResponse(false, null, $message, 400);
}

// Validate file type
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedTypes)) {
    sendResponse(false, null, 'Invalid file type. Allowed: JPG, PNG, GIF, WebP', 400);
}

// Validate file size
if ($file['size'] > $maxFileSize) {
    sendResponse(false, null, 'File too large. Maximum size: 5MB', 400);
}

// Create upload directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Generate unique filename
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('img_') . '_' . time() . '.' . strtolower($extension);
$filepath = $uploadDir . $filename;

// Move uploaded file
if (move_uploaded_file($file['tmp_name'], $filepath)) {
    // Return the URL path (relative to website root)
    $imageUrl = '/uploads/' . $filename;
    
    sendResponse(true, [
        'url' => $imageUrl,
        'filename' => $filename
    ], 'Image uploaded successfully');
} else {
    sendResponse(false, null, 'Failed to save uploaded file', 500);
}
?>
