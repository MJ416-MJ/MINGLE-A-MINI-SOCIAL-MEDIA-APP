document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");

    // Utility for pluralizing
    function plural(count, singular, plural) {
        return count === 1 ? singular : plural;
    }

    // Function to update friend count UI, exposed globally so follow.js can call it
    function updateFriendCount(count) {
        const friendCountEl = document.getElementById("friendCount");
        const friendLabelEl = document.getElementById("friendLabel");
        if (friendCountEl && friendLabelEl) {
            friendCountEl.textContent = count;
            friendLabelEl.textContent = plural(count, "Friend", "Friends");
        }
    }

    // Expose to global scope for follow/unfollow scripts to call
    window.updateFriendCount = updateFriendCount;

    // Posts Count
    fetch('/Posts/All_ProfileStats/get_counts.php' + (username ? `?username=${encodeURIComponent(username)}` : ''), { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                const postCount = data.postCount || 0;
                const postCountEl = document.getElementById("postCount");
                const postLabelEl = document.getElementById("postLabel");

                if (postCountEl && postLabelEl) {
                    postCountEl.textContent = postCount;
                    postLabelEl.textContent = plural(postCount, "Post", "Posts");
                }
            }
        });

    // Friends Count
    fetch('/Posts/All_ProfileStats/fetch_friends.php' + (username ? `?username=${encodeURIComponent(username)}` : ''))
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success' && Array.isArray(data.friends)) {
                const count = data.friends.length;
                updateFriendCount(count);
            } else {
                console.warn("Unexpected followers format:", data);
            }
        });

    // Comments Count (all comments on this user's posts)
    fetch('/Posts/Post_Assets/Comments/Comments_count/get_total_comments.php' + (username ? `?username=${encodeURIComponent(username)}` : ''), { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                const count = data.count || 0;
                const commentCountEl = document.getElementById("commentCount");
                const commentLabelEl = document.getElementById("commentLabel");

                if (commentCountEl && commentLabelEl) {
                    commentCountEl.textContent = count;
                    commentLabelEl.textContent = plural(count, "Comment", "Comments");
                }
            }
        });

    // Load individual post comment counts
    function loadCommentsCount(postId, buttonElement) {
        fetch(`/Posts/Post_Assets/Comments/Comments_count/get_comments_count.php?post_id=${postId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    const count = data.count || 0;
                    buttonElement.textContent = `💬 ${count} ${plural(count, "Comment", "Comments")}`;
                } else {
                    buttonElement.textContent = "💬 0 Comments";
                }
            })
            .catch(() => {
                buttonElement.textContent = "💬 0 Comments";
            });
    }

    // Observe dynamically added comment buttons
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    const buttons = node.querySelectorAll('.viewComments') || [];
                    buttons.forEach(button => {
                        const postId = button.dataset.postId;
                        if (postId) {
                            button.textContent = '💬 Loading...';
                            loadCommentsCount(postId, button);
                        }
                    });
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Load comments for existing buttons on first load
    setTimeout(() => {
        document.querySelectorAll('.viewComments').forEach(button => {
            const postId = button.dataset.postId;
            if (postId && (button.textContent.includes("undefined") || button.textContent.includes("Loading"))) {
                loadCommentsCount(postId, button);
            }
        });
    }, 100);
});
