<?php
require __DIR__ . '/../../../socialmedia/Database/dbconnect.php';
session_start();

header('Content-Type: application/json');

try {
    $username = $_GET['username'] ?? '';

    if (!$username) {
        echo json_encode(['status' => 'error', 'message' => 'No username specified.']);
        exit;
    }

    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Not logged in.']);
        exit;
    }

    $currentUserId = (int)$_SESSION['user_id'];

    // Fetch basic user info
    $stmt = $pdo->prepare("SELECT id, username, first_name, last_name, location, about, profile_pic FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['status' => 'error', 'message' => 'User not found.']);
        exit;
    }

    $userId = (int)$user['id'];

    // Fetch post count
    $postStmt = $pdo->prepare("SELECT COUNT(*) FROM posts WHERE user_id = ?");
    $postStmt->execute([$userId]);
    $user['post_count'] = (int)$postStmt->fetchColumn();

    // Fetch comment count (all comments on this user's posts)
    $commentStmt = $pdo->prepare("
        SELECT COUNT(*) FROM comments 
        WHERE post_id IN (SELECT post_id FROM posts WHERE user_id = ?)
    ");
    $commentStmt->execute([$userId]);
    $user['comment_count'] = (int)$commentStmt->fetchColumn();

    // Friend count (number of users following this user)
    $friendStmt = $pdo->prepare("SELECT COUNT(*) FROM followers WHERE following_id = ?");
    $friendStmt->execute([$userId]);
    $user['friend_count'] = (int)$friendStmt->fetchColumn();

    // Check if current user is following this user
    $isFollowing = false;
    if ($currentUserId !== $userId) {
        $checkFollowStmt = $pdo->prepare("SELECT 1 FROM followers WHERE follower_id = ? AND following_id = ?");
        $checkFollowStmt->execute([$currentUserId, $userId]);
        $isFollowing = $checkFollowStmt->fetch() ? true : false;
    }

    echo json_encode([
        'status' => 'success',
        'user' => array_merge($user, ['is_following' => $isFollowing]),
        'current_user_id' => $currentUserId
    ]);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
