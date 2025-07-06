document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('userPostsContainer').addEventListener('click', function (e) {
    if (e.target.classList.contains('deleteBtn')) {
      const postId = e.target.getAttribute('data-post-id');

      if (confirm('Are you sure you want to delete this post?')) {
        fetch('/Posts/Post_Assets/Post_Deletion/delete_post.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `post_id=${encodeURIComponent(postId)}`
        })
          .then(res => res.json())
          .then(data => {
            console.log('Delete response:', data); // Debug

            if (data.status === 'success') {
              // Remove the post element
              const postElement = e.target.closest('.post');
              if (postElement) postElement.remove();

              // Update post count
              const postCount = document.querySelectorAll('.post').length;
              document.getElementById('postCount').textContent = postCount;
            } else {
              alert(`Failed to delete post: ${data.message || 'No error message provided.'}`);
            }
          })
          .catch(err => {
            console.error('Fetch failed:', err);
            alert('Could not connect to server.');
          });
      }
    }
  });
});
