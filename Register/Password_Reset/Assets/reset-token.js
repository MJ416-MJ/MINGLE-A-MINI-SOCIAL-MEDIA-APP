$(function () {
    const token = new URLSearchParams(window.location.search).get('token');

    if (!token) {
        $('#ResetForm').html("<p style='color:red'>Missing or invalid token.</p>");
        return;
    }

    $('#tokenField').val(token); // Hidden input field

    $('#ResetForm').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: '/Register/Password_Reset/Assets/reset_password_process.php',
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (res) {
                const msg = $('#feedbackMessage');
                msg.css('color', res.status === 'success' ? 'green' : 'red').text(res.message);

                if (res.status === 'success') {
                    $('#ResetForm :input').prop('disabled', true);
                    setTimeout(() => {
                        window.location.href = '/Register/Login/login.html';
                    }, 3000);
                }
            },
            error: function () {
                $('#feedbackMessage').css('color', 'red').text('Something went wrong.');
            }
        });
    });
});
