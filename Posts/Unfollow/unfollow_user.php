<?php
session_start();
require __DIR__ . '/../../socialmedia/database/dbconnect.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || empty($_POST['target_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized or missing data']);
    exit;
}

$currentUser = (int)$_SESSION['user_id'];
$targetId = (int)$_POST['target_id'];

$stmt = $pdo->prepare("DELETE FROM followers WHERE follower_id = ? AND following_id = ?");
$stmt->execute([$currentUser, $targetId]);

echo json_encode(['status' => 'success']);
