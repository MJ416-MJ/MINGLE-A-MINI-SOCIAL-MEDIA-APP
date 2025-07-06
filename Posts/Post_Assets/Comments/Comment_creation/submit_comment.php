<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . '/../../../../socialmedia/database/dbconnect.php';


if (!isset($_SESSION['user_id'], $_SESSION['username'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['post_id'], $data['comment']) || trim($data['comment']) === '') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
    exit;
}

$userId   = (int) $_SESSION['user_id'];
$username = $_SESSION['username'];
$postId   = (int) $data['post_id'];
$comment  = trim($data['comment']);

try {
    // === Insert comment ===
    $stmt = $pdo->prepare("
        INSERT INTO comments (user_id, post_id, comment, created_at)
        VALUES (?, ?, ?, NOW())
    ");
    $stmt->execute([$userId, $postId, $comment]);

    // === Get post owner (use post_id here) ===
    $ownerStmt = $pdo->prepare("SELECT user_id FROM posts WHERE post_id = ?");
    $ownerStmt->execute([$postId]);
    $postOwnerId = $ownerStmt->fetchColumn();

    // === Insert notification if not your own post ===
    if ($postOwnerId && $postOwnerId != $userId) {
        $notifMsg = "@$username commented on your post";

        $notifStmt = $pdo->prepare("
            INSERT INTO notifications (user_id, from_user_id, type, post_id, message)
            VALUES (?, ?, 'comment', ?, ?)
        ");
        $notifStmt->execute([$postOwnerId, $userId, $postId, $notifMsg]);
    }

    echo json_encode(['status' => 'success']);
    exit;
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error',
        'details' => $e->getMessage()
    ]);
    exit;
}
