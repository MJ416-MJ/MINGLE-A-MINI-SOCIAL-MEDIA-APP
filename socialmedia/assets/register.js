$(function(){
  $('#registerForm').submit(function(e){
    e.preventDefault();
    console.log('Form submitted'); // Test if this logs
    $.post('register_process.php', $(this).serialize(), function(res){
      $('#regMessage').text(res.message);
    }, 'json');
  });
});