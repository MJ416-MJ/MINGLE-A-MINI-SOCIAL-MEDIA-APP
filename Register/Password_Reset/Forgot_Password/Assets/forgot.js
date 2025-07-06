$(function(){
    $('#ForgotForm').submit(function(e){
        e.preventDefault();

        $.ajax({
            url: $('#ForgotForm').attr('action'),
            method:'POST',
            data:$(this).serialize(),
            dataType:'json',
           
            success: function(res) {
                console.log("Server Res",res)

        if (res.status === 'success') {
          $('#message').html(res.message);
          setTimeout(() => {
            const email = $('#emailBox').val().trim();//inline access
            window.location.href = `/Register/Password_Reset/Verification_code/verify_code.html?email=${encodeURIComponent(email)}`;
            }, 2000); // show message for 2 seconds
        }else{
            $('#message').html(res.message);
        }
      },
      error: function(){
        $('#message').html('Server error. Try again.');
      }
    });
});
});