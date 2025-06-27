document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("commentForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("commentfunction.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.text();
      const container = document.getElementById("commentsContainer");

      if (container) {
        container.insertAdjacentHTML("beforeend", data);
        form.reset();
      }
    } catch (error) {
      alert("There was a problem posting your comment.");
      console.error("Fetch error:", error);
    }
  });
});
