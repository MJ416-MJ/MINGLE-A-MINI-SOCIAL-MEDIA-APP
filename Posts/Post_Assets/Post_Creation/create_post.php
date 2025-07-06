<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . '/../../../socialmedia/database/dbconnect.php';

// Avoid extra whitespace before this line

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$content = trim($_POST['content'] ?? '');
$user_id = $_SESSION['user_id'];

if ($content === '') {
    echo json_encode(['status' => 'error', 'message' => 'Empty content']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO posts (user_id, content, created_at) VALUES (:user_id, :content, NOW())");
    $stmt->execute([
        'user_id' => $user_id,
        'content' => $content
    ]);

    // Important: Nothing else should be output
    echo json_encode(['status' => 'success']);
    exit;

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'DB Error: ' . $e->getMessage()]);
    exit;
}
?>
