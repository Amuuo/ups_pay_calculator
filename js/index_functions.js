

const insert_register_link = () => {
  
  $register_link = $('<a>')
                    .text('Register')
                    .attr('href', './register.php')
                    .attr('id', 'register_link');
  
  $('#footer').prepend($register_link);
  //$register_link.insertBefore($('#footer'));
}



const setup_shift_submit_event_handler = () => {
  
  $('.shift_submit_button')
    .click(() => {
      CURRENT_WORKDAY.insertShiftAndCalculatePayBreakdown();                              
    });
}
