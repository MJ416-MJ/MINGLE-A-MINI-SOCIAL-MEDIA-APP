<?php
session_start();
header('Content-Type: application/json');

require __DIR__ . '/../../../../socialmedia/database/dbconnect.php';


try {
    // Validate post ID
    if (!isset($_GET['post_id']) || !is_numeric($_GET['post_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Post ID missing or invalid']);
        exit;
    }

    $postId = (int) $_GET['post_id'];
    $currentUserId = $_SESSION['user_id'] ?? 0;

    $stmt = $pdo->prepare("
        SELECT 
            c.comment_id, 
            c.comment, 
            c.created_at, 
            u.username, 
            u.profile_pic,
            CASE 
                WHEN c.user_id = ? THEN 1 
                ELSE 0 
            END AS can_delete
        FROM comments c
        JOIN users u ON u.id = c.user_id
        WHERE c.post_id = ?
        ORDER BY c.created_at DESC
    ");
    $stmt->execute([$currentUserId, $postId]);

    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'comments' => $comments
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
