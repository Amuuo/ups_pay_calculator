

class Shift {    

  shift_hours = 0.0

  static parseTimeArray = function(shift_time) {
      
    return (parseFloat(shift_time[0]) + parseFloat(shift_time[1])/60.0)
  }


  constructor(parent_workday, start_input_id, end_input_id) {
    
    this.parent_workday     = parent_workday                                    
    this.shift_start_input  = document.querySelector(start_input_id)
    this.shift_end_input    = document.querySelector(end_input_id)
    
    if (this.parent_workday.pay_rate_input == null)
      this.parent_workday.pay_rate_input  = document.querySelector('#hourly_rate_input')
    
    
    const updateShift = () => {
      
      let start_time = Shift.parseTimeArray(this.shift_start_input .value.split(':'))
      let end_time   = Shift.parseTimeArray(this.shift_end_input   .value.split(':'))                        
      
      if      (end_time   >  start_time) this.shift_hours = ( end_time       - start_time)      
      else if (start_time >  end_time  ) this.shift_hours = ((end_time + 24) - start_time)      
      else if (start_time == end_time  ) alert('Start time cannot equal end time')
      
      this.parent_workday.updateShifts()      
    }
    
    
    this.shift_start_input             .addEventListener('change', updateShift)
    this.shift_end_input               .addEventListener('change', updateShift)    
    this.parent_workday.pay_rate_input      .addEventListener('change', updateShift)
  }
}


class PayReportTable {    
  
  constructor(parent_workday) {
    
    this.parent_workday      = parent_workday;    
    this.regular_hours_cell  = document.querySelector('#reg_hours')    
    this.regular_pay_cell    = document.querySelector('#reg_pay')    
    this.overtime_hours_cell = document.querySelector('#ot_hours')    
    this.overtime_pay_cell   = document.querySelector('#ot_pay')    
    this.total_hours_cell    = document.querySelector('#tot_hours')
    this.total_pay_cell      = document.querySelector('#tot_pay')    
    this.avg_payrate_cell    = document.querySelector('#avg_payrate')
  }

  updateTable() {
  
    this.regular_hours_cell  .textContent =     this.parent_workday.regular_hours  .toFixed(2)
    this.regular_pay_cell    .textContent = `$${this.parent_workday.regular_pay    .toFixed(2)}`
    
    this.overtime_hours_cell .textContent =     this.parent_workday.overtime_hours .toFixed(2)
    this.overtime_pay_cell   .textContent = `$${this.parent_workday.overtime_pay   .toFixed(2)}`
    
    this.total_hours_cell    .textContent =     this.parent_workday.total_hours    .toFixed(2)
    this.total_pay_cell      .textContent = `$${this.parent_workday.total_pay      .toFixed(2)}`
    
    this.avg_payrate_cell    .textContent = `$${this.parent_workday.avg_payrate    .toFixed(2)}/hr`
  }
}


class Workday {
  
  payReportTable = new PayReportTable(this);

  resetWorkday() {

    this.total_hours    = 0.0
    this.regular_hours  = 0.0
    this.overtime_hours = 0.0
    this.regular_pay    = 0.0
    this.overtime_pay   = 0.0
    this.total_pay      = 0.0    
  }

  constructor() {
    this.pay_rate_input  = null
    this.main_shift      = new Shift(this, '#main_shift_start_input'  , '#main_shift_end_input')
    this.double_shift    = new Shift(this, '#double_shift_start_input', '#double_shift_end_input')    
    
  }

  calculateDayPay() {
    this.regular_pay  = this.regular_hours  *  this.pay_rate_input.value
    this.overtime_pay = this.overtime_hours * (this.pay_rate_input.value * 1.5)
    this.total_pay    = this.regular_pay    +  this.overtime_pay
    this.avg_payrate  = this.total_pay      /  this.total_hours
    this.payReportTable.updateTable();
    this.resetWorkday(); 
  }

  updateShifts() {

    if ((this.main_shift.shift_hours != 0) && 
        (this.double_shift.shift_hours != 0)) {    
      this.total_hours = this.main_shift.shift_hours + this.double_shift.shift_hours
      
      if (this.total_hours > 8) {      
        this.overtime_hours = this.total_hours - 8
        this.regular_hours = 8
      }
      else {
        this.overtime_hours = 0
        this.regular_hours = this.total_hours
      }
      this.calculateDayPay()
    }
    else if ((this.main_shift.shift_hours != 0) && 
              (this.double_shift.shift_hours == 0)) {      
      this.total_hours = this.main_shift.shift_hours
      
      if (this.total_hours >= OT_LIMIT_HOURS) {
        this.overtime_hours = this.total_hours - OT_LIMIT_HOURS
        this.regular_hours = OT_LIMIT_HOURS
      }
      else if (this.total_hours < OT_LIMIT_HOURS) {
        this.overtime_hours = 0
        this.regular_hours = this.total_hours
      }
      this.double_shift.shift_start_input.setAttribute('disabled', 'enabled')
      this.double_shift.shift_end_input.setAttribute('disabled', 'enabled')
      this.calculateDayPay()
    }
    
  }
}