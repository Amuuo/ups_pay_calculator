
const OT_LIMIT_HOURS   = 5

<<<<<<< HEAD

let   CURRENT_WORKDAY  = new Workday()
let   MAIN_SHIFT       = new Shift(CURRENT_WORKDAY)

  
let register_link = document.createElement('a')
register_link.href = './register.php'
register_link.id   = 'register_link'


register_link.textContent  = 'Register'
document.querySelector('footer').prepend(register_link)

=======
const OT_LIMIT_HOURS   = 5
let   PAY_RATE         = 0.0
let   CURRENT_WORKDAY  = new Workday()
let   MAIN_SHIFT       = new Shift(CURRENT_WORKDAY)






function modify_form_divs() {    
  
  $('#hourly_rate_input').replaceWith( 
    $('<div>')
      .addClass('after_input')
      .text('$' + PAY_RATE + '/hr'));
  
  $('#shift_start_input').replaceWith( 
    $('<div>')
      .text(`${CURRENT_WORKDAY.shifts[0].shift_start}`));    
  
  $('#shift_end_input').replaceWith(
    $('<div>')
      .text(`${CURRENT_WORKDAY.shifts[0].shift_end}`));
  
  $('.shift_input_container').prepend(
    $('<div>')
      .addClass('shift_start_container')
      .text('Shift 1: '));
  
  $('label[for="shift_start_input"]')
    .text('Start');
  
    $('label[for="shift_end_input"]')
    .text('End');
  
    $('.shift_submit_button')
    .remove();
  
  $('.employee_record').append(
    $('<div>')
      .attr('id', 'second_shift_button')
      .text('+ Add Double Shift')
  );
}



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
      //modify_form_divs();            
    });
}





$('document').ready(() => {
  
  PAY_RATE = $('#hourly_rate_input').val();
  insert_register_link();
  setup_shift_submit_event_handler();
 
  
  $('#hide_employee_button')
    .click(() => {
        $('#employee_table2').remove();
      }
    )
    .attr('id', 'show_employee_button');
});
>>>>>>> 066ca68... bigger formatting changes, moved Class definitions to their own file
  


