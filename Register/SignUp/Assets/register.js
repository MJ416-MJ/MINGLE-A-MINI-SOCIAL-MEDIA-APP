$(function () {
  $('#SignUpForm').submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/Register/SignUp/Assets/register_process.php',
      data: $(this).serialize(),
      dataType: 'json',
      success: function (res) {
        // Handle known response
        if (res && typeof res.message !== 'undefined') {
          if (res.status === 'success') {
            // Optionally show a message (but this will disappear due to redirect)
            $('#regMessage').text(res.message).css('color', 'green');

            // Immediate redirect
            window.location.href = '/PROJECT/Homepage/HomePage.html';
          } else {
            $('#regMessage').text(res.message).css('color', 'red');
          }
        } else {
          $('#regMessage').text('Unexpected response.').css('color', 'red');
        }
      },
      error: function (xhr, status, error) {
        console.error('AJAX error:', status, error);
        let msg = 'Something went wrong. Please try again.';

        try {
          const response = JSON.parse(xhr.responseText);
          if (response.message) msg = response.message;
        } catch (e) {
          console.warn('Non-JSON response');
        }

        $('#regMessage').text(msg).css('color', 'red');
      }
    });
  });
});
