<?php
require_once "../config/db.php";
session_start();


$me = $_SESSION["user_id"];
$other = intval($_POST["user_id"]);

if ($me === $other) {
    http_response_code(400);
    echo "You cannot follow yourself Silly ";
    exit;
}

$check = $conn->prepare("SELECT id FROM followers WHERE follower_id = ? AND following_id = ?");
$check->bind_param("ii", $me, $other);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    
    $del = $conn->prepare("DELETE FROM followers WHERE follower_id = ? AND following_id = ?");
    $del->bind_param("ii", $me, $other);
    $del->execute();
    $del->close();

    echo "Unfollowed successfully.";
} else {
    
    $add = $conn->prepare("INSERT INTO followers (follower_id, following_id) VALUES (?, ?)");
    $add->bind_param("ii", $me, $other);
    $add->execute();
    $add->close();

    echo "Followed successfully.";
}

$check->close();
?>
