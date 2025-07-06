<?php
session_start();
require __DIR__ . '/../../socialmedia/database/dbconnect.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || empty($_GET['target_id'])) {
    echo json_encode(['status' => 'error']);
    exit;
}

$currentUser = $_SESSION['user_id'];
$targetId = (int)$_GET['target_id'];

$stmt = $pdo->prepare("SELECT * FROM followers WHERE follower_id = ? AND following_id = ?");
$stmt->execute([$currentUser, $targetId]);

$isFollowing = $stmt->fetch() ? true : false;

echo json_encode(['status' => 'success', 'following' => $isFollowing]);
