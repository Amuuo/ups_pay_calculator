
const OT_LIMIT_HOURS   = 5

const poop = 'THIS IS A TEST'

let   CURRENT_WORKDAY  = new Workday()
let   MAIN_SHIFT       = new Shift(CURRENT_WORKDAY)


$('document').ready(() => {

  $('#hourly_rate_input').on('change', () => {
      
  });
  PAY_RATE = $('#hourly_rate_input').val()
  insert_register_link()
 
})
  


