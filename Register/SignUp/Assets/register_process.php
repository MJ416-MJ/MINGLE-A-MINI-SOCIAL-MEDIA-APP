<?php
require __DIR__ . '/../../../socialmedia/Database/dbconnect.php';
session_start();
header('Content-Type: application/json');

try {
    // Sanitize and retrieve POST values
    $data = [
        'username'     => trim($_POST['username'] ?? ''),
        'email'        => trim($_POST['email'] ?? ''),
        'password'     => $_POST['password'] ?? '',
        'retype_pass'  => $_POST['retype_pass'] ?? '',
        'first_name'   => trim($_POST['first_name'] ?? ''),
        'last_name'    => trim($_POST['last_name'] ?? ''),
        'gender'       => $_POST['gender'] ?? '',
    ];

    // Validate required fields
    foreach (['username', 'email', 'password', 'retype_pass', 'first_name', 'last_name', 'gender'] as $field) {
        if (empty($data[$field])) {
            echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
            exit;
        }
    }

    // Password match check
    if ($data['password'] !== $data['retype_pass']) {
        echo json_encode(['status' => 'error', 'message' => 'Passwords do not match.']);
        exit;
    }

    // Password strength validation
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/', $data['password'])) {
        echo json_encode(['status' => 'error', 'message' => 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.']);
        exit;
    }

    // Hash the password (before saving)
    $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
    unset($data['retype_pass']); // Remove the retype field before insert

    // Prepare and execute INSERT
    $stmt = $pdo->prepare("
        INSERT INTO users (
            username, email, password, first_name, last_name, gender, created_at,
            reset_token, reset_token_expiry, reset_code, reset_code_expiry
        ) VALUES (
            :username, :email, :password, :first_name, :last_name, :gender, NOW(),
            NULL, NULL, NULL, NULL
        )
    ");
    $stmt->execute($data);

   $user_id = $pdo->lastInsertId();
    $_SESSION['user_id']  = $user_id;
    $_SESSION['username'] = $data['username'];

    // Respond with success
    echo json_encode(['status' => 'success', 'message' => 'Registration complete. Redirecting...']);
} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        echo json_encode(['status' => 'error', 'message' => 'User already exists.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
