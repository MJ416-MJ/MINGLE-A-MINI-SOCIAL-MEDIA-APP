<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . '/../../../../socialmedia/database/dbconnect.php';

try {
    $username = $_GET['username'] ?? '';

    // Determine target user ID
    if (!empty($username)) {
        // Get user ID from username
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
            exit;
        }

        $userId = $user['id'];
    } elseif (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
        exit;
    }

    // Count all comments on posts belonging to this user
    $stmt = $pdo->prepare("
        SELECT COUNT(c.comment_id) AS count
        FROM comments c
        JOIN posts p ON c.post_id = p.post_id
        WHERE p.user_id = ?
    ");
    $stmt->execute([$userId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'count' => (int)($result['count'] ?? 0)
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error'
    ]);
}
?>
