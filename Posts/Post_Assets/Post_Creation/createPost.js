function createPost() {
  const input = document.getElementById("postInput");
  const content = input.value.trim();
  if (content === "") return;

  fetch('/Posts/Post_Assets/Post_Creation/create_post.php', {
    method: 'POST',
    credentials: 'include', // ✅ THIS is required for session to work
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `content=${encodeURIComponent(content)}`
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        input.value = "";

        // Call whichever function is defined depending on page
        if (typeof fetchUserPosts === "function") fetchUserPosts();
        if (typeof fetchPosts === "function") fetchPosts();
      } else {
        console.error("Post creation failed:", data.message);
        alert("Post failed: " + data.message);
      }
    })
    .catch(err => {
      console.error("Error posting:", err);
      alert("Network error while posting.");
    });
}
