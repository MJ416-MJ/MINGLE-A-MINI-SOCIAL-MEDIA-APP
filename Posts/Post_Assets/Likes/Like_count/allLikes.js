let loggedInUsername = '';

// Fetch logged-in username once on page load
fetch('/socialmedia/Database/Database_Sessions/session_info.php', { credentials: 'include' })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      loggedInUsername = data.username;
    }
  })
  .catch(err => {
    console.warn("Could not fetch logged-in username:", err);
  });

function openLikesModal(postId) {
  const modal = document.getElementById('likesModal');
  const list = document.getElementById('likesList');
  list.innerHTML = '<li>Loading...</li>';

  modal.style.display = 'block';

  fetch(`/Posts/Post_Assets/Likes/Likes_Fetch/fetch_likes.php?post_id=${postId}`)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success' && Array.isArray(data.users)) {
        if (data.users.length === 0) {
          list.innerHTML = '<li>No likes yet.</li>';
        } else {
          list.innerHTML = '';
          data.users.forEach(user => {
            const li = document.createElement('li');

            // Conditional link: if user is logged-in user, go to own profile page
            let profileUrl = '';
            if (user.username === loggedInUsername) {
              profileUrl = '/PROJECT/ProfilePage/ProfilePage.html'; // your own profile page
            } else {
              profileUrl = `/PROJECT/OtherUsers/OtherUsers.html?username=${encodeURIComponent(user.username)}`;
            }

            li.innerHTML = `<a href="${profileUrl}">@${user.username}</a>`;
            list.appendChild(li);
          });
        }
      } else {
        list.innerHTML = '<li>Error loading likes.</li>';
      }
    })
    .catch(err => {
      console.error("❌ Failed to load likes:", err);
      list.innerHTML = '<li>Server error.</li>';
    });
}

function closeLikesModal() {
  const modal = document.getElementById('likesModal');
  modal.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener('click', function (e) {
    if (e.target.matches('.viewLikes')) {
      e.preventDefault();
      const postId = e.target.dataset.postId;
      if (postId) openLikesModal(postId);
    }
    if (e.target.matches('.closeLikesModalBtn')) {
      closeLikesModal();
    }
  });
});
