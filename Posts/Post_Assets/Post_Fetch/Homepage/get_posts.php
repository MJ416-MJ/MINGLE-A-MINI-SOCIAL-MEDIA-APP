<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . '/../../../../socialmedia/database/dbconnect.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$userId = $_SESSION['user_id'];

$sql = "
    SELECT 
        posts.post_id,
        posts.content,
        posts.created_at,
        posts.user_id,
        users.username,
        users.profile_pic,
        EXISTS (
            SELECT 1 
            FROM likes 
            WHERE likes.post_id = posts.post_id 
              AND likes.user_id = :user_id
        ) AS is_liked,
        (
            SELECT COUNT(*) 
            FROM likes 
            WHERE likes.post_id = posts.post_id
        ) AS like_count,
        (
            SELECT COUNT(*) 
            FROM comments 
            WHERE comments.post_id = posts.post_id
        ) AS comment_count
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
";

$stmt = $pdo->prepare($sql);
$stmt->execute(['user_id' => $userId]);
$posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Add is_owner flag
foreach ($posts as &$post) {
    $post['is_liked'] = (bool) $post['is_liked'];
    $post['is_owner'] = ($post['user_id'] == $userId);
}

echo json_encode($posts);
?>