<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  header('Location: login.php');
  exit;
}
?>
<!DOCTYPE html>
<html>
<head><title>Welcome</title></head>
<body>
  <h1>Hi, <?= htmlspecialchars($_SESSION['username']) ?>!</h1>
  <p>This is your dashboard.</p>
  <a href="logout.php">Log out</a>
</body>
</html>
