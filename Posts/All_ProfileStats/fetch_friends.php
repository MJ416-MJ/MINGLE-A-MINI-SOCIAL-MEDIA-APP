<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . '/../../socialmedia/database/dbconnect.php';

try {
    // Get username from URL if present
    $username = $_GET['username'] ?? '';

    // Determine target user ID
    if (!empty($username)) {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
            exit;
        }

        $targetUserId = $user['id'];
    } elseif (isset($_SESSION['user_id'])) {
        $targetUserId = $_SESSION['user_id'];
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
        exit;
    }

    // Fetch followers (people who follow the target user)
    $stmt = $pdo->prepare("
        SELECT u.username, u.profile_pic
        FROM followers f
        JOIN users u ON u.id = f.follower_id
        WHERE f.following_id = ?
    ");
    $stmt->execute([$targetUserId]);
    $followers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'friends' => $followers // 'friends' used for compatibility with frontend
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
