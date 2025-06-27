<?php
require_once "../config/db.php";
session_start();

if (!empty($_POST["comment"])) {
    $stmt = $conn->prepare("INSERT INTO comments (user_id, post_id, comment) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $_SESSION["user_id"], $_POST["post_id"], $_POST["comment"]);

    if ($stmt->execute()) {
        
        echo "<div class='comment'><strong>You:</strong> " . htmlspecialchars($_POST["comment"]) . "</div>";
    } else {
        http_response_code(500);
        echo "Failed to save comment.";
    }

    $stmt->close();
}
?>
