$(function () {
    $('#VerifyForm').submit(function (e) {
        e.preventDefault();

        const formData = {
            email: $('#emailBox').val().trim(),
            code: $('#codeBox').val().trim()
        };

        $.ajax({
            url: '/Register/Password_Reset/Verification_code/Assets/verification.php',
            method: 'POST',
            data: formData,
            dataType: 'json',
            success: function (res) {
                const msg = $('#feedbackMessage');

                if (res.status === 'success' && res.reset_link) {
                    msg.css('color', 'green').html(`
                        ${res.message}<br>
                        <a id="resetLink" href="${res.reset_link}" style="color: blue;">Reset Password</a>
                    `);

                    //Disable the Verify button
                    $('#VerifyButton').prop('disabled', true);

                    $('#resetLink').on('click', function (e) {
                        e.preventDefault(); // Open in same tab
                        window.location.href = $(this).attr('href');
                    });
                } else {
                    msg.css('color', 'red').html(res.message);
                }
            },
            error: function () {
                $('#feedbackMessage').css('color', 'red').html("Something went wrong. Try again.");
            }
        });
    });
});
