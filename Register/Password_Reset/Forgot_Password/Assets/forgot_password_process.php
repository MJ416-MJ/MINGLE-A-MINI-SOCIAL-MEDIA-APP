<?php
require __DIR__ . '/../../../../socialmedia/Database/dbconnect.php';
header('Content-type: application/json');

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);
date_default_timezone_set('Africa/Nairobi');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

$email = isset($_POST['email']) ? trim($_POST['email']) : '';

if (empty($email)) {
    echo json_encode(['status' => 'error', 'message' => 'Please enter your email.']);
    exit;
}

$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user) {
    $code = mt_rand(100000, 999999);
    $expiry = date("Y-m-d H:i:s", time() + 300); // 5 minutes from now

    $update = $pdo->prepare("
        UPDATE users 
        SET reset_code = ?, reset_code_expiry = ?, reset_token = NULL, reset_token_expiry = NULL 
        WHERE email = ?
    ");
    $update->execute([$code, $expiry, $email]);

    echo json_encode([
        'status' => 'success',
        'message' => 'A verification code has been sent.',
        'code' => $code  
    ]);
} else {
    // Now returns an error for invalid email (DEV only)
    echo json_encode([
        'status' => 'error',
        'message' => 'Email not found in our records.'
    ]);
}
?>
