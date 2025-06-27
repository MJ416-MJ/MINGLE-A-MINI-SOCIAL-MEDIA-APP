<?php

// Show all PHP errors on the page
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require 'dbconnect.php';

$id   = trim($_POST['identifier']);
$pwd  = $_POST['password'];

// 1. Fetch user by email OR username
$stmt = $pdo->prepare(
  "SELECT id, username, password 
   FROM users 
   WHERE email = :id OR username = :id"
);
$stmt->execute(['id'=>$id]);
$user = $stmt->fetch();

if ($user && password_verify($pwd, $user['password'])) {
  // 2. Successful login ⇒ set session
  $_SESSION['user_id']  = $user['id'];
  $_SESSION['username'] = $user['username'];
  echo json_encode(['status'=>'success']);
  exit;
}

// 3. Failure
echo json_encode([
  'status'  => 'error',
  'message' => 'Invalid credentials.'
]);
