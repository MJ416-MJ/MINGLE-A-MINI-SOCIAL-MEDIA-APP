function saveProfile() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const about = document.getElementById('about').value.trim();
  const location = document.getElementById('loc').value.trim();

  fetch('/PROJECT/Profilepage/Assets/save_profile.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&location=${encodeURIComponent(location)}&about=${encodeURIComponent(about)}`
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        const fullName = `${firstName} ${lastName}`;

        const fullNameElem = document.getElementById("displayFullName");
        if (fullNameElem) fullNameElem.textContent = fullName;

        const aboutElem = document.getElementById("aboutText");
        if (aboutElem) aboutElem.textContent = about || "N/A";

        const locationElem = document.getElementById("locationText");
        if (locationElem) locationElem.textContent = `📍${location}`;

        closeModal();
      } else {
        alert("Failed to save profile.");
      }
    })
    .catch(err => {
      console.error('Error saving profile:', err);
      alert("Failed to save profile.");
    });
}
