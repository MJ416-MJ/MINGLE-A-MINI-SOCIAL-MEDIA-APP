function unfollowUser(targetId) {
  fetch('/Posts/Unfollow/unfollow_user.php', {
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
      updateFollowButton(targetId, false);
      const friendCountEl = document.getElementById("friendCount");
      let count = parseInt(friendCountEl.textContent) || 0;
      window.updateFriendCount(Math.max(count - 1, 0));

    } else {
      console.warn(data.message);
    }
  })
  .catch(err => {
    console.error('Unfollow error:', err);
  });
}
function updateFollowButton(targetId, isFollowing) {
  const btn = document.querySelector(`.followBtn[data-user-id="${targetId}"]`);
  if (btn) {
    btn.textContent = isFollowing ? 'Unfollow' : 'Follow';
    btn.classList.toggle('following', isFollowing);
    btn.onclick = () => {
      if (isFollowing) unfollowUser(targetId);
      else followUser(targetId);
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.followBtn');
  if (btn) {
    const targetId = btn.dataset.userId;
    btn.onclick = () => followUser(targetId); // default is "Follow"
  }
});
function updateFollowButton(targetId, isFollowing) {
  const btn = document.querySelector(`.followBtn[data-user-id="${targetId}"]`);
  if (btn) {
    btn.textContent = isFollowing ? 'Unfollow' : 'Follow';
    btn.classList.toggle('following', isFollowing);
    btn.onclick = () => {
      if (isFollowing) unfollowUser(targetId);
      else followUser(targetId);
    };
  }
}
