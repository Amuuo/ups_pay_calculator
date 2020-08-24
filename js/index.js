

const OT_LIMIT_HOURS   = 5
let   PAY_RATE         = 0.0
let   CURRENT_WORKDAY  = new Workday()
let   MAIN_SHIFT       = new Shift(CURRENT_WORKDAY)






$('document').ready(() => {
  
  PAY_RATE = $('#hourly_rate_input').val()
  insert_register_link()
  setup_shift_submit_event_handler()
 
})
  


