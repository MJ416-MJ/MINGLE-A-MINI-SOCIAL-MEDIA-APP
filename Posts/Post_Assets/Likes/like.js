// like.js

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("likeBtn")) return;

  const button = e.target;
  const postId = button.getAttribute("data-post-id");
  const isLiked = button.classList.contains("liked");

  console.log("🔘 Like clicked on post_id:", postId, "Action:", isLiked ? 'unlike' : 'like');

  fetch('/Posts/Post_Assets/Likes/like_post.php', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `post_id=${encodeURIComponent(postId)}&action=${isLiked ? 'unlike' : 'like'}`
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        // Update like count and button label
        button.innerHTML = data.is_liked 
          ? `❤️ ${data.like_count} ${data.like_count === 1 ? 'like' : 'likes'}`
          : `🤍 ${data.like_count} ${data.like_count === 1 ? 'like' : 'likes'}`;

        // Toggle liked class
        button.classList.toggle("liked", data.is_liked);
      } else {
        console.error("❌ Server error:", data.message);
      }
    })
    .catch(err => {
      console.error("❗ Fetch error:", err);
    });
});
