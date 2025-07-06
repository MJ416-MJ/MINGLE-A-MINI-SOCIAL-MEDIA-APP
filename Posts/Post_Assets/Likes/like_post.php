<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . '/../../../socialmedia/database/dbconnect.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$userId = (int)$_SESSION['user_id'];
$postId = isset($_POST['post_id']) ? (int)$_POST['post_id'] : (int)($_GET['post_id'] ?? 0);
$action = $_POST['action'] ?? null;

if (!$postId) {
    echo json_encode(['status' => 'error', 'message' => 'Missing post_id']);
    exit;
}

try {
    // Get post owner for notification
    $stmt = $pdo->prepare("SELECT user_id FROM posts WHERE post_id = ?");
    $stmt->execute([$postId]);
    $postOwner = $stmt->fetchColumn();

    if (!$postOwner) {
        echo json_encode(['status' => 'error', 'message' => 'Post not found']);
        exit;
    }

    if ($action === 'like') {
        $stmt = $pdo->prepare("INSERT IGNORE INTO likes (user_id, post_id) VALUES (?, ?)");
        $stmt->execute([$userId, $postId]);

        if ($userId !== (int)$postOwner) {
            $stmt = $pdo->prepare("SELECT username FROM users WHERE id = ?");
            $stmt->execute([$userId]);
            $liker = $stmt->fetchColumn();

            $message = "@$liker liked your post";
            $stmt = $pdo->prepare("INSERT INTO notifications (user_id, from_user_id, type, post_id, message) VALUES (?, ?, 'like', ?, ?)");
            $stmt->execute([$postOwner, $userId, $postId, $message]);
        }

    } elseif ($action === 'unlike') {
        $stmt = $pdo->prepare("DELETE FROM likes WHERE user_id = ? AND post_id = ?");
        $stmt->execute([$userId, $postId]);

    } elseif ($action === null && $_SERVER['REQUEST_METHOD'] === 'GET') {
        // Toggle like
        $checkStmt = $pdo->prepare("SELECT 1 FROM likes WHERE user_id = ? AND post_id = ?");
        $checkStmt->execute([$userId, $postId]);
        $alreadyLiked = $checkStmt->fetch();

        if ($alreadyLiked) {
            $stmt = $pdo->prepare("DELETE FROM likes WHERE user_id = ? AND post_id = ?");
            $stmt->execute([$userId, $postId]);
        } else {
            $stmt = $pdo->prepare("INSERT IGNORE INTO likes (user_id, post_id) VALUES (?, ?)");
            $stmt->execute([$userId, $postId]);

            if ($userId !== (int)$postOwner) {
                $stmt = $pdo->prepare("SELECT username FROM users WHERE id = ?");
                $stmt->execute([$userId]);
                $liker = $stmt->fetchColumn();

                $message = "@$liker liked your post";
                $stmt = $pdo->prepare("INSERT INTO notifications (user_id, from_user_id, type, post_id, message) VALUES (?, ?, 'like', ?, ?)");
                $stmt->execute([$postOwner, $userId, $postId, $message]);
            }
        }
    }

    // Return updated like count and status
    $countStmt = $pdo->prepare("SELECT COUNT(*) as total FROM likes WHERE post_id = ?");
    $countStmt->execute([$postId]);
    $likeCount = $countStmt->fetchColumn();

    $checkStmt = $pdo->prepare("SELECT 1 FROM likes WHERE user_id = ? AND post_id = ?");
    $checkStmt->execute([$userId, $postId]);
    $isLiked = $checkStmt->fetch() ? true : false;

    echo json_encode([
        'status' => 'success',
        'like_count' => $likeCount,
        'is_liked' => $isLiked
    ]);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
