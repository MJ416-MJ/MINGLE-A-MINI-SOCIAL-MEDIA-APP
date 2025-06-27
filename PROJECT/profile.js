//Function to open the edit profile modal
function openModal(){
    document.getElementById('modal').style.display = 'block';
}

//Function to close the edit profile modal
function closeModal(){
    document.getElementById('modal').style.display = 'none';
}

//Function to save the edited profile and update the information being displayed
function saveProfile(){
    const fName = document.getElementById('fName').value;
    const about = document.getElementById('about').value;
    const location = document.getElementById('loc').value;

    document.getElementById("profName").textContent = fName;
    document.getElementById("aboutText").textContent = about;
    document.getElementById('locationText').textContent = location;
    closeModal();//Closes the modal after saving
}

//DOM is fully loaded before attaching event listeners 
document.addEventListener("DOMContentLoaded", function () {
    //Event listener is added 
    document.querySelector(".editBtn").addEventListener("click", openModal);
});

//Function to open modal showing friends list
function openFriendsModal() {
  document.getElementById('FriendsListContainer').style.display = 'flex';
}

//Function to open the modal showing likes list
function openLikesModal() {
  document.getElementById('likesListContainer').style.display = 'flex';
}

//Function to open the modal showing comments list
function openCommentsModal() {
  document.getElementById('commentsListContainer').style.display = 'flex';
}

//Function to toggle visibility of the navbar for smaller screens 
function toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}
