function deleteComment(commentId, postId) {
  if (!confirm("Delete this comment?")) return;

  fetch(`/Posts/Post_Assests/Comments/Comment_Deletion/delete_comment.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ comment_id: commentId })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        openCommentsModal(postId); // Refresh list
  
        const btn = document.querySelector(`.commentBtn[data-post-id="${postId}"]`);
        if (btn) {
          const match = btn.textContent.match(/\d+/);
          const oldCount = match ? parseInt(match[0]) : 1;
          const newCount = Math.max(0, oldCount - 1);
          btn.textContent = `💬 ${newCount} ${newCount === 1 ? "comment" : "comments"}`;
        }
      } else {
        alert("Failed to delete comment.");
      }
    })
    .catch(() => alert("Error deleting comment."));
}
