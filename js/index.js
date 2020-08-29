
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
  


