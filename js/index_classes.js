

let PAY_RATE = 0.0



class Shift {    

  shift_hours = 0.0
  shift_start = ''
  shift_end   = ''
  
  constructor(parent_workday) {
    
    this.parent_workday     = parent_workday                                    
    this.shift_start_input = document.querySelector('#main_shift_start_input')
    this.shift_end_input   = document.querySelector('#main_shift_end_input')
    this.shift_pay_rate    = document.querySelector('#hourly_rate_input')

    const updateShift = () => {
     
      PAY_RATE = parseFloat(this.shift_pay_rate.value)

      this.shift_start = this.shift_start_input .value.split(':')
      this.shift_end   = this.shift_end_input   .value.split(':')
      
      let start_time = parseFloat(this.shift_start[0]) + 
                          parseFloat(this.shift_start[1])/60.0
      let end_time   = parseFloat(this.shift_end[0])   + 
                          parseFloat(this.shift_end[1])/60.0
      
      
      if (end_time > start_time)
        this.shift_hours = (end_time - start_time)
      
      else if (start_time > end_time)
        this.shift_hours = ((end_time + 24) - start_time)
      
      else if (start_time == end_time)
        alert('Start time cannot equal end time')

      console.log(this);
      this.parent_workday.updateShifts()      
    }

    this.shift_start_input .addEventListener('keyup', updateShift)
    this.shift_end_input   .addEventListener('keyup', updateShift)
    this.shift_pay_rate    .addEventListener('keyup', updateShift)
  }
}


class PayReportTable {    
  
  constructor(parent_workday) {
    
    this.parent_workday       = parent_workday;    
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
    this.main_shift     = null;
    this.double_shift   = null;
    this.total_pay      = 0.0
  }

  updateShifts() {

    if (this.main_shift == null) this.main_shift = MAIN_SHIFT;
    
    if (this.main_shift && this.double_shift) {    
      this._total_hours = this.main_shift.shift_hours + this.double_shift.shift_hours
      
      if (this.total_hours > 8) {      
        this.overtime_hours = this.total_hours - 8
        this.regular_hours = 8
      }
      else {
      
        this.overtime_hours = 0
        this.regular_hours = this.total_hours
      }
    }
    else if (this.main_shift && !this.double_shift) {      
      this.total_hours = this.main_shift.shift_hours
      
      if (this.total_hours >= OT_LIMIT_HOURS) {
        this.overtime_hours = this.total_hours - OT_LIMIT_HOURS
        this.regular_hours = OT_LIMIT_HOURS
      }
      else if (this.total_hours < OT_LIMIT_HOURS) {
        this.overtime_hours = 0
        this.regular_hours = this.total_hours
      }
    }
    this.regular_pay  = this.regular_hours  * PAY_RATE
    this.overtime_pay = this.overtime_hours * (PAY_RATE * 1.5)
    this.total_pay    = this.regular_pay    + this.overtime_pay
    this.avg_payrate  = this.total_pay      / this.total_hours
    this.payReportTable.updateTable();
    this.resetWorkday(); 
  }
}