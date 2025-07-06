<?php
require __DIR__ . '/../../../socialmedia/Database/dbconnect.php';
header('Content-Type: application/json');
date_default_timezone_set('Africa/Nairobi');

function respond($status, $message) {
    echo json_encode([
        'status' => $status,
        'message' => $message
    ]);
    exit;
}

$token = $_POST['token'] ?? '';
$new_password = $_POST['new_password'] ?? '';
$confirm_password = $_POST['confirm_password'] ?? '';

if (empty($token)) {
    respond("error", "Reset token is missing. Please use the link from your email.");
}

if (empty($new_password) || empty($confirm_password)) {
    respond("error", "All fields are required");
}

if ($new_password !== $confirm_password) {
    respond("error", "Passswords do not Match");
}

if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/', $new_password)) {
    respond("error", "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
}

$stmt = $pdo->prepare("SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()");
$stmt->execute([$token]);
$user = $stmt->fetch();

if ($user) {
    $current = $pdo->prepare("SELECT password FROM users WHERE id = ?");
    $current->execute([$user['id']]);
    $currentPassword = $current->fetch();

    if ($current && password_verify($new_password, $currentPassword['password'])) {
        respond("error", "New password cannot be the same as your current password.");
    }

    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
    $update = $pdo->prepare("
        UPDATE users
        SET password = ?, reset_token = NULL, reset_token_expiry = NULL
        WHERE id = ?
    ");
    $update->execute([$hashed_password, $user['id']]);

    respond("success", "Password has been reset successfully. Redirecting...");
} else {
    respond("error", "Invalid or expired token.");
}
?>
