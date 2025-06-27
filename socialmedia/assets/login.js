$(function(){
  $('#loginForm').submit(function(e){
    e.preventDefault();
    $.ajax({
      url: 'login_process.php',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      success: function(res) {
        if (res.status === 'success') {
          window.location = 'dashboard.php';
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
