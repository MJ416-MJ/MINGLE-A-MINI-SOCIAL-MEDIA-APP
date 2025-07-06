$(function(){
  $('#loginForm').submit(function(e){
    e.preventDefault();
    $.ajax({
      url: $('#loginForm').attr('action'),
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      xhrFields: {
        withCredentials: true  // ✅ THIS is what saves the session
      },
      success: function(res) {
        if (res.status === 'success') {
          // ✅ Redirect to your homepage
          window.location = '/PROJECT/Homepage/HomePage.html';
        } else {
          $('#loginMessage').text(res.message);
        }
      },
      error: function(){
        $('#loginMessage').text('Server error. Try again.');
      }
    });
  });
});
