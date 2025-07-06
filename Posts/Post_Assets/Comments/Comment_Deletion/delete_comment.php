<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . '/../../../../socialmedia/database/dbconnect.php';

$data = json_decode(file_get_contents("php://input"), true);
$commentId = $data['comment_id'] ?? null;
$userId = $_SESSION['user_id'] ?? null;

if (!$userId || !$commentId) {
  echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
  exit;
}

// Ensure user owns the comment
$stmt = $pdo->prepare("DELETE FROM comments WHERE comment_id = ? AND user_id = ?");
if ($stmt->execute([$commentId, $userId])) {
  echo json_encode(['status' => 'success']);
  exit;
} else {
  echo json_encode(['status' => 'error', 'message' => 'Failed to delete comment']);
  exit;
}
?>
