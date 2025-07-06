// === Get Username from URL ===
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

document.addEventListener('DOMContentLoaded', function () {
  if (username) {
    loadUserProfile(username);
  } else {
    document.querySelector(".container").innerHTML = "<p>No username specified.</p>";
  }
});

// === Load User Profile ===
function loadUserProfile(username) {
  // Set placeholders
  document.getElementById('profileHeading').textContent = `@${username}`;
  document.getElementById('profName').textContent = `@${username}`;
  document.getElementById('postHeader').textContent = `Posts by @${username}`;

  fetch(`/PROJECT/OtherUsers/OtherUsers_Assets/viewProfile.php?username=${encodeURIComponent(username)}`)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        const user = data.user;

        document.getElementById('displayFullName').textContent =
          `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || 'N/A';
        document.getElementById('aboutText').textContent = user.about || 'N/A';
        document.getElementById('locationText').textContent =
          `📍${user.location || 'Location not specified'}`;
        document.getElementById('postCount').textContent = user.post_count || 0;
        document.getElementById('friendCount').textContent = user.friend_count || 0;
        document.getElementById('commentCount').textContent = user.comment_count || 0;

        if (user.profile_pic) {
          document.getElementById('profilePic').src = user.profile_pic;
        }

        // === Follow Button Logic ===
        const followBtn = document.getElementById('followBtn');
        if (user.id && user.id !== data.current_user_id) {
          followBtn.dataset.userId = user.id;

          if (user.is_following) {
            followBtn.textContent = 'Unfollow';
            followBtn.classList.add('following');
            followBtn.onclick = () => unfollowUser(user.id);
          } else {
            followBtn.textContent = 'Follow';
            followBtn.classList.remove('following');
            followBtn.onclick = () => followUser(user.id);
          }

          followBtn.style.display = 'inline-block';
        } else {
          followBtn.style.display = 'none'; // Hide button if it's your own profile
        }

      } else {
        throw new Error(data.message);
      }
    })
    .catch(error => {
      console.error('Error loading profile:', error);
      document.querySelector(".container").innerHTML =
        `<p>Failed to load user profile.</p>`;
    });
}
