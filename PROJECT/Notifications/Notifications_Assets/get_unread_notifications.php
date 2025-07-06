<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . '/../../socialmedia/database/dbconnect.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$userId = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("SELECT COUNT(*) as unread_count FROM notifications WHERE user_id = :user_id AND is_read = 0");
    $stmt->execute(['user_id' => $userId]);
    $count = $stmt->fetch(PDO::FETCH_ASSOC)['unread_count'];

    echo json_encode(['status' => 'success', 'count' => $count]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'DB error']);
}
