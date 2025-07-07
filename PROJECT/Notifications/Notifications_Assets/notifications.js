// Toggle navbar for smaller screens
function toggleNavbar() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".notifications-Container");

  if (!container) return;

  fetch('/PROJECT/Notifications/Notifications_Assets/fetch_notifications.php', { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      container.innerHTML = ''; // Clear placeholder

      if (
        data.status !== 'success' ||
        !Array.isArray(data.notifications) ||
        data.notifications.length === 0
      ) {
        container.innerHTML = `
          <p style="padding: 1rem; font-weight: bold;">You have no notifications yet.</p>
        `;
        return;
      }

      data.notifications.forEach(notification => {
        const username = notification.username || 'Unknown';
        const profilePic = notification.profile_pic || 'pp.jpg';
        const message = notification.message || 'You have a new notification';
        const link = notification.link || '#';
        const createdAt = notification.created_at || '';

        const notifBox = document.createElement('div');
        notifBox.className = 'notif-1';

        notifBox.innerHTML = `
          <div><img src="${profilePic}" alt="profile pic" class="userProfPics"></div>
          <div class="notif-Text">
            <b><a href="/PROJECT/OtherUsers/OtherUsers.html?username=${encodeURIComponent(username)}">@${username}</a></b> ${message}
            <div class="notif-Time" style="font-size: 12px; color: gray;">${createdAt}</div>
          </div>
          <a class="notif-Button" href="${link}">View</a>
        `;

        container.appendChild(notifBox);
      });

      markNotificationsAsRead();

    })
    .catch(err => {
      console.error("Failed to load notifications:", err);
      container.innerHTML = `
        <p style="padding: 1rem; color: red;">Error loading notifications.</p>
      `;
    });
});
