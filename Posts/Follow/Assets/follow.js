// === Parse username from URL (needed for refreshing friend count) ===
const followUrlParams = new URLSearchParams(window.location.search);
const followUsername = followUrlParams.get('username');

// === Follow User Function ===
function followUser(targetId) {
  fetch('/Posts/Follow/follow_user.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    credentials: 'include',
    body: `target_id=${encodeURIComponent(targetId)}`
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      updateFollowButton(targetId, true);
      // increment friend count
    const friendCountEl = document.getElementById("friendCount");
    let count = parseInt(friendCountEl.textContent) || 0;
    window.updateFriendCount(count + 1);


      // Call refreshFriendCount with correct username variable if it exists
      if (typeof refreshFriendCount === 'function') {
        refreshFriendCount(followUsername);
      }
    } else {
      console.warn(data.message);
    }
  })
  .catch(err => {
    console.error('Follow error:', err);
  });
}

// === Update Follow Button Label and Behavior ===
function updateFollowButton(targetId, isFollowing) {
  const btn = document.querySelector(`.followBtn[data-user-id="${targetId}"]`);
  if (btn) {
    btn.textContent = isFollowing ? 'Unfollow' : 'Follow';
    btn.classList.toggle('following', isFollowing);
    btn.onclick = () => {
      if (isFollowing) {
        if (typeof unfollowUser === 'function') {
          unfollowUser(targetId);
        } else {
          console.error('unfollowUser function is not defined');
        }
      } else {
        followUser(targetId);
      }
    };
  }
}

// === Set initial event listener ===
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.followBtn');
  if (btn) {
    const targetId = btn.dataset.userId;
    btn.onclick = () => followUser(targetId);
  }
});
