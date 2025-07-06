<?php
// fetch_likes.php
header('Content-Type: application/json');
require __DIR__ . '/../../../../socialmedia/database/dbconnect.php';
$post_id = $_GET['post_id'] ?? '';

if (empty($post_id)) {
    echo json_encode(['status' => 'error', 'message' => 'Post ID missing']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT u.username 
        FROM likes l
        JOIN users u ON l.user_id = u.id
        WHERE l.post_id = ?
    ");
    $stmt->execute([$post_id]);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 'success', 'users' => $users]);
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error',
        'details' => $e->getMessage()
    ]);
}
