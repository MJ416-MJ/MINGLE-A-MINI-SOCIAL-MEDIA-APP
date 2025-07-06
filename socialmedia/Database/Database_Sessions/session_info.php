<?php
session_start();
require __DIR__ . '/../dbconnect.php'; 
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
  exit;
}

// Fetch user data from DB
$stmt = $pdo->prepare("
  SELECT 
    username,
    first_name,
    last_name,
    location,
    about,
    profile_pic
  FROM users
  WHERE id = ?
");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch();

if ($user) {
  echo json_encode([
    'status'      => 'success',
    'username'    => $user['username'],
    'first_name'  => $user['first_name'] ?? '',
    'last_name'   => $user['last_name'] ?? '',
    'location'    => $user['location'] ?? '',
    'about'       => $user['about'] ?? '',
    'profile_pic' => $user['profile_pic'] ?? '/PROJECT/pp.jpg'
  ]);
} else {
  echo json_encode(['status' => 'error', 'message' => 'User not found']);
}
