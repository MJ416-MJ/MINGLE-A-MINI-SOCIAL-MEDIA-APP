function fetchPosts() {
  fetch('/Posts/Post_Assets/Post_Fetch/Homepage/get_posts.php')
    .then(res => res.json())
    .then(posts => {
      const container = document.getElementById("postContainer");
      container.innerHTML = "";

      posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.setAttribute("data-post-id", post.post_id);

        const isLiked = post.is_liked;
        const likeText = isLiked
          ? `❤️ ${post.like_count} ${post.like_count === 1 ? "like" : "likes"}`
          : `🤍 ${post.like_count} ${post.like_count === 1 ? "like" : "likes"}`;
        const likeClass = isLiked ? "likeBtn liked" : "likeBtn";

        postDiv.innerHTML = `
  <div style="display: flex; gap: 10px;">
    <img src="${post.profile_pic}" class="userProfPics">
    <div class="postText" style="flex: 1;">
      <div class="userName-Timeline">
        <div class="userName">
          <a href="${post.is_owner ? '/PROJECT/Profilepage/ProfilePage.html' : '/PROJECT/OtherUsers/OtherUsers.html?username=' + encodeURIComponent(post.username)}" class="profile-link"><b>@${post.username}</b></a>
        </div>
        <span class="postTimestamp">• ${formatRelativeTime(post.created_at)}</span>
      </div>
      <p>${post.content}</p>

      <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-top: 8px;">
        <button class="${likeClass}" data-post-id="${post.post_id}">${likeText}</button>
        <button class="commentBtn commentToggleBtn" data-post-id="${post.post_id}">
          <span class="comment-icon">💬</span>
          <span class="comment-text">${post.comment_count || 0} ${post.comment_count === 1 ? "Comment" : "Comments"}</span>
        </button>
      </div>

      <div class="commentSection" style="display: none; margin-top: 8px;">
        <input type="text" class="commentInput" placeholder="Write a comment...">
        <button class="submitCommentBtn" data-post-id="${post.post_id}">Submit</button>
        <div class="commentsList"></div>
      </div>
    </div>
  </div>
`;

        container.appendChild(postDiv);
      });

      attachCommentHandlers();
    })
    .catch(err => console.error("Failed to fetch posts:", err));
}

function attachCommentHandlers() {
  document.querySelectorAll(".commentToggleBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const postId = btn.getAttribute("data-post-id");
      const section = btn.closest(".postText").querySelector(".commentSection");
      section.style.display = section.style.display === "none" ? "block" : "none";

      const list = section.querySelector(".commentsList");
      if (!list.hasChildNodes()) {
        loadComments(postId, list, btn);
      }
    });
  });

  document.querySelectorAll(".submitCommentBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const postId = btn.getAttribute("data-post-id");
      const section = btn.closest(".commentSection");
      const input = section.querySelector(".commentInput");
      const text = input.value.trim();
      if (!text) return;

      fetch('/Posts/Post_Assets/Comments/Comment_creation/submit_comment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ post_id: postId, comment: text })
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            input.value = "";
            loadComments(postId, section.querySelector(".commentsList"), section.closest(".post").querySelector(".commentToggleBtn"));
          } else {
            alert("Failed to submit comment");
          }
        });
    });
  });
}

function loadComments(postId, container, countBtn) {
  fetch(`/Posts/Post_Assets/Comments/Comment_creation/fetch_comments.php?post_id=${postId}`, { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      if (data.status === 'success') {
        const comments = data.comments;

        const label = countBtn.querySelector(".comment-text");
        if (label) {
          label.textContent = `${comments.length} ${comments.length === 1 ? "Comment" : "Comments"}`;
        }

        if (comments.length === 0) {
          container.innerHTML = "<p style='font-size: 14px; color: gray;'>No comments yet.</p>";
          return;
        }

        comments.forEach(comment => {
          const div = document.createElement("div");
          div.className = "commentItem";
          div.innerHTML = `
            <strong><a href="PROJECT/OtherUsers/OtherUsers.html?username=${encodeURIComponent(comment.username)}">@${comment.username}</a></strong>: ${comment.comment}
            ${comment.can_delete ? `<button class="deleteCommentBtn" data-id="${comment.comment_id}" data-post-id="${postId}" style="margin-left: 8px; font-size: 12px;">🗑️</button>` : ""}
          `;
          container.appendChild(div);
        });

        container.querySelectorAll(".deleteCommentBtn").forEach(btn => {
          btn.addEventListener("click", () => {
            const commentId = btn.getAttribute("data-id");

            if (!confirm("Delete this comment?")) return;

            fetch("/Posts/Post_Assets/Comments/Comment_Deletion/delete_comment.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ comment_id: commentId })
            })
              .then(res => res.json())
              .then(data => {
                if (data.status === "success") {
                  loadComments(postId, container, countBtn);
                } else {
                  alert("Failed to delete comment.");
                }
              })
              .catch(() => alert("Error deleting comment."));
          });
        });
      } else {
        container.innerHTML = "<p style='color:red;'>Failed to load comments</p>";
      }
    })
    .catch(() => {
      container.innerHTML = "<p style='color:red;'>Failed to load comments</p>";
    });
}

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
