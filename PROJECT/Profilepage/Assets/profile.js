


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
    year: "numeric"
  });
}

function openModal() {
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function confirmEdit() {
  if (confirm("Do you want to edit your profile information?")) {
    openModal();
  }
}


function toggleNavbar() {
  document.querySelector('.navbar').classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function () {
  // 🔐 Fetch session info
  fetch('/socialmedia/Database//Database_Sessions/session_info.php', { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        document.getElementById('profName').textContent = `@ ${data.username}`;
        const fullName = `${data.first_name} ${data.last_name}`;
        document.getElementById('displayFullName').textContent = fullName;
        document.getElementById('locationText').textContent = `📍${data.location}`;
        document.getElementById('aboutText').textContent = data.about || "N/A";

        document.getElementById('firstName').value = data.first_name;
        document.getElementById('lastName').value = data.last_name;
        document.getElementById('loc').value = data.location;
        document.getElementById('about').value = data.about;
      } else {
        window.location.href = '/Register/Login/login.html';
      }
    })
    .catch(err => console.error('Error fetching session info:', err));

  // 🛠 Attach edit profile modal handler
  const editBtn = document.querySelector(".editBtn");
  if (editBtn) {
    editBtn.addEventListener("click", confirmEdit);
  }

  // ➕ Toggle Create Post Box
  const toggleBtn = document.getElementById('togglePostBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const box = document.getElementById('createPostBox');
      if (box) {
        box.style.display = box.style.display === 'none' ? 'block' : 'none';
      }
    });
  }
});
