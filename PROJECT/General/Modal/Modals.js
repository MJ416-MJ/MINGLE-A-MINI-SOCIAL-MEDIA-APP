let currentPostId = null;

// === FRIENDS MODAL ===
function openFriendsModal() {
  const modal = document.getElementById('friendsModal');
  const list = document.getElementById('friendsList');
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");

  document.getElementById("friendsModalTitle").textContent = "Friends";

  if (!modal || !list) return;

  list.innerHTML = '<li>Loading friends...</li>';
  modal.style.display = 'block';

  const endpoint = username 
    ? `/Posts/All_ProfileStats/fetch_friends.php?username=${encodeURIComponent(username)}`
    : '/Posts/All_ProfileStats/fetch_friends.php';

  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      list.innerHTML = '';
      if (data.status === 'success' && Array.isArray(data.friends)) {
        if (data.friends.length === 0) {
          list.innerHTML = '<li>No friends found.</li>';
          return;
        }
        data.friends.forEach(friend => {
          const li = document.createElement('li');
          const profileUrl = friend.username === loggedInUsername
            ? '/PROJECT/Profilepage/ProfilePage.html'
            : `/PROJECT/OtherUsers/OtherUsers.html?username=${encodeURIComponent(friend.username)}`;
          li.innerHTML = `<a href="${profileUrl}">@${friend.username}</a>`;
          list.appendChild(li);
        });
      } else {
        list.innerHTML = '<li>Error loading friends.</li>';
      }
    })
    .catch(() => {
      list.innerHTML = '<li>Server error loading friends.</li>';
    });
}

function openMutualFriendsModal() {
  document.getElementById("friendsModalTitle").textContent = "Mutual Friends";
  const modal = document.getElementById('friendsModal');
  const list = document.getElementById('friendsList');
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");

  if (!modal || !list) return;

  list.innerHTML = '<li>Loading mutual friends...</li>';
  modal.style.display = 'block';

  const endpoint = username 
    ? `/Posts/All_ProfileStats/get_mutualfriends.php?username=${encodeURIComponent(username)}`
    : '/Posts/All_ProfileStats/get_mutualfriends.php';

  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      list.innerHTML = '';

      // ✅ Fix this part to access data.friends properly
      if (data.status !== "success" || !Array.isArray(data.friends) || data.friends.length === 0) {
        list.innerHTML = '<li>No mutual friends found.</li>';
        return;
      }

      data.friends.forEach(friend => {
        const li = document.createElement('li');
        const profileUrl = friend.username === loggedInUsername
          ? '/PROJECT/Profilepage/ProfilePage.html'
          : `/PROJECT/OtherUsers/OtherUsers.html?username=${encodeURIComponent(friend.username)}`;
        li.innerHTML = `<a href="${profileUrl}">@${friend.username}</a>`;
        list.appendChild(li);
      });
    })
    .catch(() => {
      list.innerHTML = '<li>Server error loading mutual friends.</li>';
    });
}


function closeFriendsModal() {
  const modal = document.getElementById('friendsModal');
  if (modal) modal.style.display = 'none';
}

function closeCommentsModal() {
  const modal = document.getElementById('commentsModal');
  if (modal) modal.style.display = 'none';
}

// === COMMENTS MODAL ===
function openCommentsModal(postId) {
  currentPostId = postId;

  const modal = document.getElementById("commentsModal");
  const commentsList = document.getElementById("commentsList");
  const commentInput = document.getElementById("newCommentInput");
  const deleteDropdown = document.getElementById("deleteCommentDropdown");

  commentInput.value = "";
  commentsList.innerHTML = "<li>Loading comments...</li>";
  modal.style.display = "block";

  if (deleteDropdown) {
    deleteDropdown.style.display = "none";
    deleteDropdown.innerHTML = '';
  }

  fetch(`/Posts/Post_Assets/Comments/Comment_creation/fetch_comments.php?post_id=${postId}`, {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      commentsList.innerHTML = "";

      if (data.status !== "success" || data.comments.length === 0) {
        commentsList.innerHTML = "<li>No comments yet.</li>";
        return;
      }

      data.comments.forEach(comment => {
        const li = document.createElement("li");
        li.innerHTML = `
        <strong><a href="/PROJECT/OtherUsers.html?username=${encodeURIComponent(comment.username)}">
         @${comment.username}
        </a></strong>: ${comment.comment}`;

        commentsList.appendChild(li);
      });
    })
    .catch(() => {
      commentsList.innerHTML = "<li>Failed to load comments.</li>";
    });
}

function loadTotalCommentsCount() {
  fetch('/Posts/Post_Assets/Comments/Comments_count/get_total_comments.php', { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        const count = data.count || 0;
        const commentCountEl = document.getElementById("commentCount");
        const commentLabelEl = document.getElementById("commentLabel");

        if (commentCountEl && commentLabelEl) {
          commentCountEl.textContent = count;
          commentLabelEl.textContent = count === 1 ? "Comment" : "Comments";
        }
      }
    });
}

function updatePerPostCommentCount(postId) {
  const btn = document.querySelector(`.commentBtn[data-post-id="${postId}"]`);
  if (!btn) return;

  fetch(`/Posts/Post_Assets/Comments/Comments_count/get_comments_count.php?post_id=${postId}`)
    .then(res => res.json())
    .then(data => {
      const count = data.status === 'success' ? data.count : 0;
      btn.textContent = `💬 ${count} ${count === 1 ? "Comment" : "Comments"}`;
    })
    .catch(() => {
      btn.textContent = "💬 0 Comments";
    });
}

// === COMMENT SUBMIT ===
document.getElementById("submitCommentBtn").addEventListener("click", () => {
  const commentText = document.getElementById("newCommentInput").value.trim();
  if (!commentText || !currentPostId) return;
console.log("📤 Sending comment:", {
  post_id: currentPostId,
  comment: commentText
});

  fetch("/Posts/Post_Assets/Comments/Comment_creation/submit_comment.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ post_id: currentPostId, comment: commentText })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        console.log("🔁 Server response:", data);
        openCommentsModal(currentPostId);
        updatePerPostCommentCount(currentPostId);
        loadTotalCommentsCount();
      } else {
        alert("Failed to post comment.");
      }
    })
    .catch(() => alert("Error posting comment."));
});

// === DELETE DROPDOWN TOGGLE + DELETE ===
document.getElementById("deleteCommentBtn").addEventListener("click", () => {
  const deleteDropdown = document.getElementById("deleteCommentDropdown");

  if (deleteDropdown.style.display === "inline-block") {
    const selectedCommentId = deleteDropdown.value;
    if (!selectedCommentId) {
      alert("Please select a comment to delete.");
      return;
    }

    if (!confirm("Are you sure you want to delete this comment?")) return;

    fetch("/Posts/Post_Assets/Comments/Comment_Deletion/delete_comment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ comment_id: selectedCommentId })
    })
      .then(async res => {
        const data = await res.json();
        if (res.ok && data.status === "success") {
          openCommentsModal(currentPostId);
          updatePerPostCommentCount(currentPostId);
          loadTotalCommentsCount();
          deleteDropdown.style.display = "none";
        } else {
          alert("Failed to delete comment.");
        }
      })
      .catch(() => alert("Error deleting comment."));

  } else {
    fetch(`/Posts/Post_Assets/Comments/Comment_creation/fetch_comments.php?post_id=${currentPostId}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        const deletable = data.comments.filter(c => c.can_delete);
        const dropdown = document.getElementById("deleteCommentDropdown");

        dropdown.innerHTML = "";

        if (deletable.length === 0) {
          alert("No comments to delete.");
          return;
        }

        const placeholder = document.createElement("option");
        placeholder.text = "Select comment to delete";
        placeholder.disabled = true;
        placeholder.selected = true;
        dropdown.appendChild(placeholder);

        deletable.forEach(c => {
          const option = document.createElement("option");
          option.value = c.comment_id;
          option.textContent = c.comment.length > 60 ? c.comment.slice(0, 60) + "..." : c.comment;
          dropdown.appendChild(option);
        });

        dropdown.style.display = "inline-block";
      })
      .catch(() => alert("Failed to load deletable comments."));
  }
});

// === Event Delegation ===
document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (e) {
    const postId = e.target.getAttribute("data-post-id");

    if (e.target.matches('.closeCommentsModalBtn')) {
      closeCommentsModal();
    }

    if (e.target.matches('.viewComments')) {
      e.preventDefault();
      if (postId) openCommentsModal(postId);
    }

    if (e.target.matches('.viewAllFriends')) {
      openFriendsModal();
    }

    if (e.target.matches('.closeFriendsModalBtn')) {
      closeFriendsModal();
    }
  });
});
