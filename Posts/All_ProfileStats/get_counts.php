<?php
session_start();
require __DIR__ . '/../../socialmedia/database/dbconnect.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$userId = $_SESSION['user_id'];

// Allow viewing another user's counts via ?username=...
if (isset($_GET['username'])) {
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$_GET['username']]);
    $targetUser = $stmt->fetch();
    if (!$targetUser) {
        echo json_encode(['status' => 'error', 'message' => 'User not found']);
        exit;
    }
    $userId = $targetUser['id'];
}

try {
    // ✅ Count posts by the user
    $stmt1 = $pdo->prepare("SELECT COUNT(*) FROM posts WHERE user_id = ?");
    $stmt1->execute([$userId]);
    $postCount = (int)$stmt1->fetchColumn();

    // ✅ Count followers (users who follow this user)
    $stmt2 = $pdo->prepare("SELECT COUNT(*) FROM followers WHERE following_id = ?");
    $stmt2->execute([$userId]);
    $followerCount = (int)$stmt2->fetchColumn();

    // ✅ Count comments received on this user's posts
    $stmt3 = $pdo->prepare("
        SELECT COUNT(c.comment_id)
        FROM comments c
        JOIN posts p ON c.post_id = p.post_id
        WHERE p.user_id = ?
    ");
    $stmt3->execute([$userId]);
    $commentCount = (int)$stmt3->fetchColumn();

    echo json_encode([
        'status' => 'success',
        'postCount' => $postCount,
        'friendCount' => $followerCount,
        'commentCount' => $commentCount
    ]);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Query failed']);
}
?>