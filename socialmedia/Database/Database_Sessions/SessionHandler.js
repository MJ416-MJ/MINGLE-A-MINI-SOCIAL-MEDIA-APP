let username = 'Guest';

fetch('/socialmedia/Database/Database_Sessions/session_info.php', {
  credentials: 'include' 
})
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      username = data.username;

      // Replace all elements with class .userName dynamically
      document.querySelectorAll('.userName').forEach(el => {
        el.innerHTML = `<b>@ ${username}</b>`;
      });
    } else {
      window.location.href = '/Register/Login/login.html'; // redirect if not logged in
    }
  })
  .catch(err => {
    console.error('Session check failed:', err);
    window.location.href = '/Register/Login/login.html'; // fallback redirect
  });
