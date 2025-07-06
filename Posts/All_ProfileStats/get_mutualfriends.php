<?php
session_start();
require __DIR__ . '/../../socialmedia/database/dbconnect.php';
header('Content-Type: application/json');

try {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
        exit;
    }

    $currentUserId = $_SESSION['user_id'];
    $targetUsername = $_GET['username'] ?? '';

    // Determine whose mutual friends to fetch
    if (!empty($targetUsername)) {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$targetUsername]);
        $targetUser = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$targetUser) {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
            exit;
        }

        $targetUserId = $targetUser['id'];
    } else {
        $targetUserId = $currentUserId;
    }

    // Fetch mutual friends
    $stmt = $pdo->prepare("
        SELECT u.username, u.profile_pic
        FROM users u
        INNER JOIN followers f1 ON f1.following_id = u.id AND f1.follower_id = ?
        INNER JOIN followers f2 ON f2.follower_id = u.id AND f2.following_id = ?
    ");
    $stmt->execute([$targetUserId, $targetUserId]);
    $mutualFriends = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'friends' => $mutualFriends
    ]);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
}
