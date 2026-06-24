document.addEventListener("DOMContentLoaded", function () {
  const userPostsContainer = document.getElementById("userPostsContainer");
  userPostsContainer.innerHTML = '<p class="no-posts-placeholder">Loading posts...</p>';

  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  const endpoint = username
    ? `/Posts/Post_Assets/Post_Fetch/Profilepage/get_user_posts.php?username=${encodeURIComponent(username)}`
    : `/Posts/Post_Assets/Post_Fetch/Profilepage/get_user_posts.php`;

  fetch(endpoint, { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      userPostsContainer.innerHTML = "";

      if (data.status !== "success" || data.posts.length === 0) {
        userPostsContainer.innerHTML = '<p class="no-posts-placeholder">No posts yet.</p>';
        return;
      }

      data.posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.setAttribute("data-post-id", post.post_id);

      
        const postHeader = document.createElement("div");
        postHeader.className = "post-header";

        const profilePic = document.createElement("img");
        profilePic.src = post.profile_pic || "/Assets/defaultpic.jpg";
        profilePic.alt = `${post.username}'s profile picture`;
        profilePic.className = "userProfPics";

        const userInfo = document.createElement("div");
        userInfo.className = "user-info";

        const usernameLink = document.createElement("a");
        usernameLink.href = `PROJECT/OtherUsers/OtherUsers.html?username=${encodeURIComponent(post.username)}`;
        usernameLink.className = "username";
        usernameLink.innerText = post.username;

        const timestamp = document.createElement("span");
        timestamp.className = "timeline";
        timestamp.innerText = formatRelativeTime(post.created_at);

        userInfo.appendChild(usernameLink);
        userInfo.appendChild(timestamp);
        postHeader.appendChild(profilePic);
        postHeader.appendChild(userInfo);

        
        const postTextDiv = document.createElement("div");
        postTextDiv.className = "postText";
        const postContent = document.createElement("p");
        postContent.innerText = post.content;

        
        const actionsWrapper = document.createElement("div");
        actionsWrapper.className = "post-actions";

        const likeBtn = document.createElement("button");
        likeBtn.className = "likeBtn" + (post.is_liked ? " liked" : "");
        likeBtn.setAttribute("data-post-id", post.post_id);
        likeBtn.innerHTML = `${post.is_liked ? "❤️" : "🤍"} ${post.like_count} ${post.like_count === 1 ? "like" : "likes"}`;

        const commentBtn = document.createElement("button");
        commentBtn.className = "commentBtn";
        commentBtn.setAttribute("data-post-id", post.post_id);
        commentBtn.innerText = `💬 ${post.comment_count} ${post.comment_count === 1 ? "comment" : "comments"}`;
        commentBtn.onclick = () => openCommentsModal(post.post_id);

        actionsWrapper.appendChild(likeBtn);
        actionsWrapper.appendChild(commentBtn);

        
        const linkWrapper = document.createElement("div");
        linkWrapper.className = "link-actions";
        linkWrapper.style.display = "flex";
        linkWrapper.style.justifyContent = "space-between";
        linkWrapper.style.alignItems = "center";
        linkWrapper.style.marginTop = "8px";

        const viewLikesLink = document.createElement("a");
        viewLikesLink.href = "#";
        viewLikesLink.className = "viewLikes";
        viewLikesLink.setAttribute("data-post-id", post.post_id);
        viewLikesLink.innerText = "View all likes →";
        viewLikesLink.onclick = () => openLikesModal(post.post_id);

        linkWrapper.appendChild(viewLikesLink);

        // Show delete button only if user owns the post
        if (post.can_delete === 1 || post.can_delete === "1") {
          const deleteBtn = document.createElement("button");
          deleteBtn.className = "deleteBtn";
          deleteBtn.innerHTML = "🗑️";
          deleteBtn.title = "Delete Post";
          deleteBtn.setAttribute("data-post-id", post.post_id);
          linkWrapper.appendChild(deleteBtn);
        }

        
        postTextDiv.appendChild(postContent);
        postTextDiv.appendChild(actionsWrapper);
        postTextDiv.appendChild(linkWrapper);

        postDiv.appendChild(postHeader);
        postDiv.appendChild(postTextDiv);
        userPostsContainer.appendChild(postDiv);
      });
    })
    .catch((err) => {
      console.error("Error loading user posts:", err);
      userPostsContainer.innerHTML = '<p class="no-posts-placeholder">Failed to load posts.</p>';
    });
});

function formatRelativeTime(dateString) {
  const now = new Date();
  const postDate = new Date(dateString);
  const diff = now - postDate;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
  if (weeks < 5) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;

  return postDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
