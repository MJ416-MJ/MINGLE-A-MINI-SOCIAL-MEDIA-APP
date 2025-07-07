fetch('/PROJECT/Notifications/Notifications_Assets/get_unread_notifications.php', {
  credentials: 'include'
})
  .then(res => res.json())
  .then(data => {
    console.log("🔔 Full data:", data);
    if (data.status === 'success') {
      const count = data.count;
      const badge = document.getElementById('notifBadge');
      if (count > 0) {
        badge.textContent = count > 9 ? '9+' : count;
        badge.style.display = 'inline';
      } else {
        badge.style.display = 'none';
      }
    } else {
      console.warn("🔕 Notification status not success:", data.message);
    }
  })
  .catch(err => console.error("Notification fetch error:", err));
