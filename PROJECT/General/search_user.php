<?php
require __DIR__ . '/../../socialmedia/database/dbconnect.php';
header('Content-Type: application/json');

$query = trim($_GET['query'] ?? '');

if (strlen($query) < 2) {
    echo json_encode(['status' => 'error', 'message' => 'Query too short']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT username FROM users WHERE username LIKE ? LIMIT 10");
    $stmt->execute(["%$query%"]);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 'success', 'users' => $users]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>