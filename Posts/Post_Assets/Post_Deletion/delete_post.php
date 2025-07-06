<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . '/../../../socialmedia/database/dbconnect.php';

if (!isset($_SESSION['user_id'])) {
  echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
  exit;
}

$post_id = $_POST['post_id'] ?? '';

if (empty($post_id)) {
  echo json_encode(['status' => 'error', 'message' => 'Missing post_id']);
  exit;
}

try {
  $stmt = $pdo->prepare("DELETE FROM posts WHERE post_id = ? AND user_id = ?");
  $stmt->execute([$post_id, $_SESSION['user_id']]);

  if ($stmt->rowCount() > 0) {
    echo json_encode(['status' => 'success']);
  } else {
    echo json_encode(['status' => 'error', 'message' => 'Post not found or unauthorized']);
  }
} catch (PDOException $e) {
  echo json_encode([
    'status' => 'error',
    'message' => 'Database error',
    'details' => $e->getMessage()
  ]);
}
