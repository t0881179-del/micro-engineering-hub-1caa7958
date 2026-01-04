<?php
/**
 * Password Reset Helper
 * Visit this file in browser to generate a new password hash
 * Then update the admin_users table with the new hash
 * DELETE THIS FILE AFTER USE!
 */

$newPassword = 'admin123';
$hash = password_hash($newPassword, PASSWORD_DEFAULT);

echo "<h2>Password Hash Generator</h2>";
echo "<p><strong>Password:</strong> " . $newPassword . "</p>";
echo "<p><strong>Hash:</strong> " . $hash . "</p>";
echo "<br>";
echo "<p>Copy the hash above and run this SQL in phpMyAdmin:</p>";
echo "<pre>UPDATE admin_users SET password = '" . $hash . "' WHERE username = 'admin';</pre>";
echo "<br>";
echo "<p style='color:red;'><strong>IMPORTANT:</strong> Delete this file after use for security!</p>";
?>
