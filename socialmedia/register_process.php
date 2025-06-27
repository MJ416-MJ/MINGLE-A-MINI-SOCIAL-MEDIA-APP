<?php
require 'dbconnect.php';
$data = [
  'username' => trim($_POST['username']),
  'email'    => trim($_POST['email']),
];
$pwdHash = password_hash($_POST['password'], PASSWORD_DEFAULT);

$stmt = $pdo->prepare(
  "INSERT INTO users (username, email, password)
   VALUES (:username, :email, :password)"
);
try {
  $stmt->execute([...$data, 'password'=>$pwdHash]);
  echo json_encode(['status'=>'success','message'=>'Registered!']);
} catch (PDOException $e) {
  echo json_encode(['status'=>'error','message'=>'User exists or invalid input.']);
}
