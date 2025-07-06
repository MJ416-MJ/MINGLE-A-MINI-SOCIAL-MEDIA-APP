<?php
function Follower_notification(string ...$follower): string {
    if (count($follower) === 1) {
        return $follower[0] . " started following you";
    } elseif (count($follower) === 2) {
        return $follower[0] . " and " . $follower[1] . " started following you";
    } elseif (count($follower) === 3) {
        return $follower[0] . ", " . $follower[1] . " and " . $follower[2] . " started following you";
    } elseif (count($follower) >= 4) {
        return $follower[0] . ", " . $follower[1] . " and " . (count($follower) - 2) . " others started following you";
    }
    return "";
}
?>