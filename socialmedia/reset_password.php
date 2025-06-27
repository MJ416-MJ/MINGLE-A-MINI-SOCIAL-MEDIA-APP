<?php
require 'dbconnect.php';

// Set PHP timezone to EAT
date_default_timezone_set('Africa/Nairobi'); // Match with database

if (!isset($_GET['token'])) {
    die('Invalid link. Token missing.');
}

$token = $_GET['token'];

// Debug: Display received token and current time
echo "Received token: " . htmlspecialchars($token) . "<br>";
echo "Current server time: " . date("Y-m-d H:i:s") . "<br>";

// Check if token exists and is not expired
$stmt = $pdo->prepare("SELECT id, reset_token_expiry FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()");
$stmt->execute([$token]);
$user = $stmt->fetch();

// Debug: Display query results
if ($user) {
    echo "Token valid. Expiry: " . $user['reset_token_expiry'] . "<br>";
} else {
    // Check if token exists at all
    $stmt = $pdo->prepare("SELECT id, reset_token_expiry FROM users WHERE reset_token = ?");
    $stmt->execute([$token]);
    $debug_user = $stmt->fetch();
    if ($debug_user) {
        echo "Token exists but expired. Expiry: " . $debug_user['reset_token_expiry'] . "<br>";
    } else {
        echo "No user found with this token.<br>";
    }
    die('Invalid or expired reset link.');
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Reset Password</title>
</head>
<body>
  <h2>Reset Your Password</h2>
  <form method="POST" action="reset_password_process.php">
    <input type="hidden" name="token" value="<?= htmlspecialchars($token) ?>">
    <input type="password" name="new_password" placeholder="New Password" required>
    <button type="submit">Reset Password</button>
  </form>
</body>
</html>