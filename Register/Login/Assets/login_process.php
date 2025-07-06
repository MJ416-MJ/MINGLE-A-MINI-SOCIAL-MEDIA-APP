<?php
header('Content-type:application/json');
// Show all PHP errors on the page
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require __DIR__ . '/../../../socialmedia/Database/dbconnect.php';

$id   = isset($_POST['identifier'])? trim($_POST['identifier']):'';
$pwd  = isset($_POST['password'])?$_POST['password']:'';

if(empty($id)||empty($pwd)){
  echo json_encode(['status' =>'error','message'=>'Missing credentials']);
  exit;
}

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
