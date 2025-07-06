<?php
require __DIR__ . '/../../../socialmedia/Database/dbconnect.php';
date_default_timezone_set('Africa/Nairobi');

$token = $_GET['token'] ?? '';

if (empty($token)) {
    // Show error or redirect to error page
    echo "<script>alert('Invalid or missing token.'); window.location.href='/Register/Login/login.html';</script>";
    exit;
}

$stmt = $pdo->prepare("SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()");
$stmt->execute([$token]);
$user = $stmt->fetch();

if ($user) {
    // ✅ Token is valid, redirect to ChangePass.html with token
    header("Location: /Register/Password_Reset/Forgot_Password/ChangePassword/ChangePass.html?token=" . urlencode($token));
    exit;
} else {
    // ❌ Invalid or expired token
    echo "<script>alert('This reset link is invalid or has expired.'); window.location.href='/Register/Login/login.html';</script>";
    exit;
}
?>
