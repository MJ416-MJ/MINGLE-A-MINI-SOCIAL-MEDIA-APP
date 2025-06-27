<?php
require 'dbconnect.php';

// Set PHP timezone to EAT
date_default_timezone_set('Africa/Nairobi'); // Match with database

$token = $_POST['token'];
$new_password = $_POST['new_password'];

// Re-check token validity
$stmt = $pdo->prepare("SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()");
$stmt->execute([$token]);
$user = $stmt->fetch();

if ($user) {
    // Update password
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
    $update = $pdo->prepare("
        UPDATE users
        SET password = ?, reset_token = NULL, reset_token_expiry = NULL
        WHERE id = ?
    ");
    $update->execute([$hashed_password, $user['id']]);

    echo "Password has been reset. <a href='login.php'>Log in</a>";
} else {
    echo "Invalid or expired token.";
}
?>