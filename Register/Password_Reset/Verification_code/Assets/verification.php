<?php
require __DIR__ . '/../../../../socialmedia/Database/dbconnect.php';
header('Content-Type: application/json');
ini_set('display_errors', 1); 
error_reporting(E_ALL);
date_default_timezone_set('Africa/Nairobi');

$email = trim($_POST['email'] ?? '');
$code = trim($_POST['code'] ?? '');

if (empty($email) || empty($code)) {
    echo json_encode(['status' => 'error', 'message' => 'Email and code are required.']);
    exit;
}

$stmt = $pdo->prepare("SELECT id, reset_code_expiry FROM users WHERE email = ? AND reset_code = ?");
$stmt->execute([$email, $code]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid email or verification code.'
    ]);
    exit;
}

if (strtotime($user['reset_code_expiry']) < time()) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Verification code has expired.'
    ]);
    exit;
}

$token = bin2hex(random_bytes(32));
$expiry = date("Y-m-d H:i:s", time() + 3600); // 1 hour validity

$update = $pdo->prepare("
    UPDATE users 
    SET reset_token = ?, reset_token_expiry = ?, reset_code = NULL, reset_code_expiry = NULL 
    WHERE email = ?
");
$update->execute([$token, $expiry, $email]);

$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];
$path = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
$link = "$protocol://$host/Register/Password_Reset/Assets/reset_password.php?token=$token";


echo json_encode([
    'status' => 'success',
    'message' => "Click the link below to reset your password.",
    'reset_link' => $link
]);
exit;
?>
