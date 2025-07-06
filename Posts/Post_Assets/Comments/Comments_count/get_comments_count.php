<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . '/../../../../socialmedia/database/dbconnect.php';

try {
    if (!isset($_GET['post_id']) || !is_numeric($_GET['post_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid post ID']);
        exit;
    }
    
    $postId = (int) $_GET['post_id'];
    
    $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM comments WHERE post_id = ?");
    $stmt->execute([$postId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'status' => 'success',
        'count' => (int)$result['count']
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error'
    ]);
}
?>