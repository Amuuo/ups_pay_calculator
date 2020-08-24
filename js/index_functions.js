

const insert_register_link = () => {
  
  $register_link = $('<a>')
                    .text('Register')
                    .attr('href', './register.php')
                    .attr('id', 'register_link');
  
  $('#footer').prepend($register_link);

}

