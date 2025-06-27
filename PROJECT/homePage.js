// Function to create and display a new post
function createPost() {
  const input = document.getElementById("postInput");//Gets the text input element
  const text = input.value.trim();//Input with trailing spaces is trimmed
  if (text === "") return;//No post is created if input is empty 

  const container = document.getElementById("postContainer");//Gets the container for posts

  // Create post wrapper
  const post = document.createElement("div");
  post.className = "post";

  // Creates and adds the profile picture
  const imgDiv = document.createElement("div");
  const img = document.createElement("img");
  img.src = "pp.jpg"; // Use your profile pic path
  img.alt = "profile pic";
  img.className = "userProfPics";
  imgDiv.appendChild(img);

  // Text content container
  const textDiv = document.createElement("div");
  textDiv.className = "postText";

  //Creates and adds the username
  const userName = document.createElement("div");
  userName.className = "userName";
  userName.innerHTML = "<b>@ Josh Cane</b>"; // Replace with dynamic username if needed

  //Adds the user's post content
  const content = document.createElement("div");
  content.innerHTML = text;

  //Action buttons, timeline text, and comment section
  const actionLine = document.createElement("div");
  actionLine.innerHTML = `
    <br><br>
    <button class="likeBtn">Like</button>
    <button class="commentBtn">Comment</button>
    <span>Timeline</span>
    <div class="commentSection" style="display:none;">
      <input type="text" class="commentInput" placeholder="Write a comment...">
      <button class="submitCommentBtn">Submit</button>
      <div class="commentsList"></div>
    </div>
  `;

  //Assembling all parts of the user post
  textDiv.appendChild(userName);
  textDiv.appendChild(content);
  textDiv.appendChild(actionLine);

  post.appendChild(imgDiv);
  post.appendChild(textDiv);

  // Inserts the new post at the top of all posts
  container.prepend(post);

  //Input field is cleared after post is made
  input.value = "";
}

// Event listener for all interactions
document.addEventListener("click", function (e) {

  //When the 'Like' button is clicked, the text changes from like to liked and vice versa
  if (e.target.classList.contains("likeBtn")) {
      e.target.textContent = e.target.textContent === "Like" ? "Liked" : "Like";
    }

  //When 'comment' button is clicked, the comment input section is shown or hidden
  if (e.target.classList.contains("commentBtn")) {
      const commentSection = e.target.closest(".postText").querySelector(".commentSection");
      commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
    }

  //When the 'submit' button is clicked
  if (e.target.classList.contains("submitCommentBtn")) {
      const commentInput = e.target.previousElementSibling;//Get the input field before the button
      const commentText = commentInput.value.trim();

      //If the input field is not empty, the comment is added to the comments list
      if (commentText !== "") {
        const commentsList = e.target.closest(".postText").querySelector(".commentsList");
        
        //A new div is created to hold a comment and append it to the list of comments
        const commentDiv = document.createElement("div");//New div
        commentDiv.textContent = commentText;//Comment content
        commentsList.appendChild(commentDiv);//Comment added to the list 
        
        //Clear the input field
        commentInput.value = "";
      }
    }
  });

//Function to toggle visibility of the navbar for smaller screens 
function toggleNavbar() {
  const navbar = document.getElementById('navbar');
  navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
}