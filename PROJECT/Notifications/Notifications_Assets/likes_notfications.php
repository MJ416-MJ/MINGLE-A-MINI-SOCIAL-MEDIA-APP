<?php
function Wholikesthis(array $likers, string $postPreview = ''): string {
    $count = count($likers);

    // Escape inputs
    $likers = array_map('htmlspecialchars', $likers);
    $postPreview = htmlspecialchars($postPreview);

    $postPart = $postPreview ? ' on “' . mb_strimwidth(strip_tags($postPreview), 0, 40, '...') . '”' : '';

    if ($count === 0) {
        return "No one liked this$postPart";
    } elseif ($count === 1) {
        return "{$likers[0]} likes your post$postPart";
    } elseif ($count === 2) {
        return "{$likers[0]} and {$likers[1]} liked your post$postPart";
    } elseif ($count === 3) {
        return "{$likers[0]}, {$likers[1]} and {$likers[2]} liked your post$postPart";
    } else {
        $others = $count - 2;
        return "{$likers[0]}, {$likers[1]} and {$others} others liked your post$postPart";
    }
}
?>
