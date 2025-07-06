function loadFriendsPreview() {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");

  const endpoint = username
    ? `/Posts/All_ProfileStats/get_mutualfriends.php?username=${encodeURIComponent(username)}`
    : `/Posts/All_ProfileStats/get_mutualfriends.php`;

  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      const previewContainer = document.getElementById("friendListPreview");
      const modalList = document.getElementById("friendsList");

      if (!previewContainer || !modalList) {
        console.warn("Friend preview or modal list element is missing.");
        return;
      }

      previewContainer.innerHTML = "";
      modalList.innerHTML = "";

      const friends = data.friends || [];

      if (!Array.isArray(friends) || friends.length === 0) {
        previewContainer.innerHTML = "<p>No mutual friends yet.</p>";
        modalList.innerHTML = "<li>No mutual friends to show.</li>";
        return;
      }

      const previewLimit = 3;
      const previewFriends = friends.slice(0, previewLimit);

      // Render preview section
      previewFriends.forEach(friend => {
        const friendRow = document.createElement("div");
        friendRow.className = "friendRow";
        friendRow.innerHTML = `
          <img src="${friend.profile_pic || '/Assets/defaultpic.jpg'}" alt="profile picture" class="friendPP">
          <p class="friendName">
            <b><a href="PROJECT/OtherUsers/OtherUsers.html?username=${encodeURIComponent(friend.username)}">@${friend.username}</a></b>
          </p>`;
        previewContainer.appendChild(friendRow);
      });

      // Render modal list
      friends.forEach(friend => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${friend.profile_pic || '/Assets/defaultpic.jpg'}" class="friendPP">
          <a href="PROJECT/OtherUsers/OtherUsers.html?username=${encodeURIComponent(friend.username)}">@${friend.username}</a>`;
        modalList.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Error loading mutual friends:", err);
      const fallback = document.getElementById("friendListPreview");
      if (fallback) fallback.innerHTML = "<p>Error loading mutual friends.</p>";
    });
}

document.addEventListener("DOMContentLoaded", loadFriendsPreview);
