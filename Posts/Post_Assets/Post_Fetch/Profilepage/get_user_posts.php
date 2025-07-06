<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . '/../../../../socialmedia/database/dbconnect.php';

try {
    // Determine whose posts to fetch
    if (isset($_GET['username']) && !empty($_GET['username'])) {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$_GET['username']]);
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

    $sessionUserId = $_SESSION['user_id'] ?? 0;

    // ✅ Subqueries to avoid row multiplication
    $stmt = $pdo->prepare("
        SELECT 
            p.post_id,
            p.user_id,
            p.content,
            p.created_at,
            u.username,
            u.profile_pic,

            -- 🧮 Accurate like count
            (SELECT COUNT(*) FROM likes WHERE post_id = p.post_id) AS like_count,

            -- 🧮 Accurate comment count
            (SELECT COUNT(*) FROM comments WHERE post_id = p.post_id) AS comment_count,

            -- ❤️ Check if the session user liked this post
            EXISTS (
                SELECT 1 FROM likes WHERE post_id = p.post_id AND user_id = :session_user
            ) AS is_liked,

            -- 🗑️ Can delete if this is user's own post
            CASE 
                WHEN p.user_id = :session_user THEN 1
                ELSE 0
            END AS can_delete

        FROM posts p
        JOIN users u ON u.id = p.user_id
        WHERE p.user_id = :target_user
        ORDER BY p.created_at DESC
    ");

    $stmt->execute([
        'session_user' => $sessionUserId,
        'target_user' => $userId
    ]);

    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 'success', 'posts' => $posts]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Server error: ' . $e->getMessage()]);
}
