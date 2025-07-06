<?php
session_start();
header('Content-Type: application/json; charset=UTF-8');
require __DIR__ . '/../../../socialmedia/Database/dbconnect.php';
require __DIR__ . '/../Notifications_Assets/Follower_Notification.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

function timeAgo($datetime) {
    $time = strtotime($datetime);
    $diff = time() - $time;

    if ($diff < 60) return $diff . 's ago';
    if ($diff < 3600) return floor($diff / 60) . 'm ago';
    if ($diff < 86400) return floor($diff / 3600) . 'h ago';
    if ($diff < 604800) return floor($diff / 86400) . 'd ago';
    return date("M j, Y", $time);
}

$userId = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("
        SELECT 
            n.type, 
            n.created_at, 
            n.post_id, 
            u.username, 
            u.profile_pic,
            p.content AS post_content,
            (
                SELECT c.comment
                FROM comments c
                WHERE c.post_id = n.post_id AND c.user_id = n.from_user_id
                ORDER BY c.created_at DESC
                LIMIT 1
            ) AS comment_text
        FROM notifications n
        JOIN users u ON u.id = n.from_user_id
        LEFT JOIN posts p ON p.post_id = n.post_id
        WHERE n.user_id = ?
        ORDER BY n.created_at DESC
    ");
    $stmt->execute([$userId]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $notifications = [];

    foreach ($rows as $row) {
        $username = htmlspecialchars($row['username']);
        $type = $row['type'];
        $postContent = $row['post_content'] ?? '';
        $commentText = $row['comment_text'] ?? '';
        $profilePic = !empty($row['profile_pic']) ? $row['profile_pic'] : '/Assets/defaultpic.jpg';
        $createdAt = $row['created_at'];
        $time = timeAgo($createdAt);
        $link = "/PROJECT/OtherUsers/OtherUsers.html?username=" . urlencode($username);

        $postSnippet = $postContent ? mb_strimwidth(strip_tags($postContent), 0, 40, '...') : '';
        $message = '';

        switch ($type) {
            case 'follow':
                $message = Follower_notification($username);
                break;

            case 'like':
                $message = "likes your post";
                if ($postSnippet) {
                    $message .= ' on “' . htmlspecialchars($postSnippet) . '”';
                }
                break;

            case 'comment':
                $shortComment = mb_strimwidth(strip_tags($commentText), 0, 80, '...');
                $message = 'commented: “' . htmlspecialchars($shortComment) . '”';
                if ($postSnippet) {
                    $message .= ' on “' . htmlspecialchars($postSnippet) . '”';
                }
                break;

            default:
                $message = "sent you a notification";
        }

        $notifications[] = [
            'username'    => $username,
            'profile_pic' => $profilePic,
            'message'     => $message,
            'link'        => $link,
            'type'        => $type,
            'created_at'  => $time
        ];
    }

    echo json_encode([
        'status' => 'success',
        'notifications' => $notifications
    ]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
