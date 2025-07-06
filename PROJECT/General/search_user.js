document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");

  if (!input || !results) return console.error("Search input or results container not found!");

  input.addEventListener("input", function () {
    const query = input.value.trim();
    if (query.length < 2) {
      results.classList.remove("visible");
      return;
    }

    fetch(`/PROJECT/General/search_user.php?query=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        results.innerHTML = "";
        if (data.status === "success" && Array.isArray(data.users)) {
          if (data.users.length === 0) {
            results.innerHTML = "<div style='padding:10px;'>No matches</div>";
          } else {
            data.users.forEach(user => {
              const item = document.createElement("div");
              item.className = "search-result-item";

              const username = document.createElement("span");
              username.textContent = "@" + user.username;
              username.className = "search-result-username";

              item.appendChild(username);

              item.addEventListener("click", () => {
                window.location.href = `/PROJECT/OtherUsers/OtherUsers.html?username=${encodeURIComponent(user.username)}`;
              });

              results.appendChild(item);
            });
          }
          results.classList.add("visible");
        } else {
          results.classList.remove("visible");
        }
      })
      .catch(err => {
        console.error("Search error:", err);
        results.classList.remove("visible");
      });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".searchBar")) {
      results.classList.remove("visible");
    }
  });
});
