// Toggle navbar for smaller screens
function toggleNavbar() {
  const navbar = document.getElementById('navbar');
  navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
}

// Global click handler for Like, Comment toggle, and Submit
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("likeBtn")) {
    const postId = e.target.dataset.id;
    if (postId) {
      fetch(`/Posts/Post_Assets/Likes/like_post.php?post_id=${postId}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            e.target.textContent = data.liked ? "❤️ Liked" : "🤍 Like";
            e.target.className = data.liked ? "likeBtn liked" : "likeBtn";

            const likeCount = e.target.nextElementSibling;
            if (likeCount) {
              likeCount.textContent = `${data.like_count} Likes`;
            }
          }
        });
    }
  }

  // Toggle comment section visibility
  if (e.target.classList.contains("commentBtn")) {
    const commentSection = e.target.closest(".postText").querySelector(".commentSection");
    commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
  }

});
document.addEventListener("DOMContentLoaded", () => {
  fetch('/socialmedia/Database/Database_Sessions/session_info.php', {
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      if (data.status !== 'success') {
        window.location.href = '/Register/Login/login.html';
      } else {
        if (typeof fetchPosts === "function") fetchPosts();
      }
    })
    .catch(err => {
      console.error("Error checking session:", err);
      window.location.href = '/Register/Login/login.html';
    });
});
