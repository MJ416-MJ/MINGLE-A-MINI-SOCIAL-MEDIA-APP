<?php
require 'dbconnect.php';

// Set PHP timezone to EAT (UTC+3)
date_default_timezone_set('Africa/Nairobi'); // EAT timezone

$email = trim($_POST['email']);

// Check if user exists
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user) {
    // Generate token and expiry time
    $token = bin2hex(random_bytes(32)); // 64-char secure token
    $expiry = date("Y-m-d H:i:s", time() + 3600); // 1 hour from now

    // Debug: Display token and times
    echo "Token: $token<br>";
    echo "Expiry: $expiry<br>";
    echo "Current server time: " . date("Y-m-d H:i:s") . "<br>";

    // Save token in DB
    $update = $pdo->prepare("
        UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?
    ");
    $update->execute([$token, $expiry, $email]);

    // Display reset link
    $link = "http://localhost/socialmedia/reset_password.php?token=$token";
    echo "Password reset link: <a href='$link'>$link</a>";
} else {
    echo "No account found with that email.";
}
?>