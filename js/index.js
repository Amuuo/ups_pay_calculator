

const OT_LIMIT_HOURS   = 5
let   PAY_RATE         = 0.0
let   CURRENT_WORKDAY  = new Workday()
let   MAIN_SHIFT       = new Shift(CURRENT_WORKDAY)




$('#hourly_rate_input').focusout(() => {
  CURRENT_WORKDAY.insertShiftAndCalculatePayBreakdown();  
})


$('document').ready(() => {

  PAY_RATE = $('#hourly_rate_input').val()
  insert_register_link()
 
})
  


