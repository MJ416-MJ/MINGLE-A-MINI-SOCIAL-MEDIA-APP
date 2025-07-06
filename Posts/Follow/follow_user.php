<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');

try {
    require __DIR__ . '/../../socialmedia/database/dbconnect.php';
    require __DIR__ . '/../../PROJECT/Notifications/Notifications_Assets/Follower_notification.php';

    if (!isset($_SESSION['user_id']) || empty($_POST['target_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized or missing data']);
        exit;
    }

    $currentUser = (int)$_SESSION['user_id'];
    $targetId = (int)$_POST['target_id'];

    if ($currentUser === $targetId) {
        echo json_encode(['status' => 'error', 'message' => 'You cannot follow yourself']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT 1 FROM followers WHERE follower_id = ? AND following_id = ?");
    $stmt->execute([$currentUser, $targetId]);
    if ($stmt->fetch()) {
        echo json_encode(['status' => 'error', 'message' => 'Already following']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO followers (follower_id, following_id) VALUES (?, ?)");
    $stmt->execute([$currentUser, $targetId]);

    // Insert notification into notifications table with correct columns
    $type = 'follow';
    $stmt = $pdo->prepare("INSERT INTO notifications (user_id, from_user_id, type) VALUES (?, ?, ?)");
    $stmt->execute([$targetId, $currentUser, $type]);

    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
}
exit;
?>
