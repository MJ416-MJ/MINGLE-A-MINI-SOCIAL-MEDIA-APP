// markNotifications.js
function markNotificationsAsRead() {
  fetch('/PROJECT/Notifications/Notifications_Assets/mark_notifications_read.php', {
    method: 'POST',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        console.log("✅ Notifications marked as read.");
        // Clear notification badge
        const badge = document.getElementById('notifBadge');
        if (badge) {
          badge.textContent = '';
          badge.style.display = 'none';
        }
      } else {
        console.warn("⚠️ Failed to mark notifications:", data.message);
      }
    })
    .catch(error => {
      console.error("❌ Error marking notifications as read:", error);
    });
}
