<?php
function Whocommentedonthis(string ...$comment): string {
    $count = count($comment);

    if ($count === 0) {
        return "No one has commented on this post yet.";
    } else if ($count === 1) {
        return "@{$comment[0]} commented on your post";
    } else if ($count === 2) {
        return "@{$comment[0]} and @{$comment[1]} commented on your post";
    } else if ($count === 3) {
        return "@{$comment[0]}, @{$comment[1]} and @{$comment[2]} commented on your post";
    } else {
        return "@{$comment[0]}, @{$comment[1]} and " . ($count - 2) . " others commented on your post";
    }
}
?>
