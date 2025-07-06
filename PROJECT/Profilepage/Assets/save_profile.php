<?php
session_start();
header('Content-Type: application/json');
include __DIR__ . '/../../../socialmedia/Database/dbconnect.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$location = $_POST['location'] ?? '';
$about = $_POST['about'] ?? '';

try {
    $stmt = $pdo->prepare("UPDATE users SET first_name = ?, last_name = ?, location = ?, about = ? WHERE id = ?");
    $success = $stmt->execute([$firstName, $lastName, $location, $about, $user_id]);

    if ($success) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update profile']);
    }
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Query failed',
        'details' => $e->getMessage()
    ]);
}
?>
