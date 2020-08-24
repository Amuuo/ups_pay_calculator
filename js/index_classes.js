

let PAY_RATE = 0.0



class Shift {    

  shift_hours = 0.0;
  shift_start = '';
  shift_end   = '';
  
  constructor(parent_workday) {
    
    this.parent_workday     = parent_workday
    this.$shift_start_input = $('#shift_start_input')
    this.$shift_end_input   = $('#shift_end_input'  )
    
    const updateShift = () => {
     
      this.parent_workday.shifts = []

      this.shift_start = this.$shift_start_input .val().split(':');
      this.shift_end   = this.$shift_end_input   .val().split(':');
      
      let start_hour = parseFloat(this.shift_start[0]) + (parseFloat(this.shift_end[1])/60);
      let end_hour   = parseFloat(this.shift_end[0])   + (parseFloat(this.shift_start[1])/60);
      
      
      if (end_hour > start_hour)
        this.shift_hours = end_hour - start_hour  
      
      else if (start_hour > end_hour)
        this.shift_hours = (end_hour + 24) - start_hour;  
      
      else if (start_hour == end_hour)
        alert('Start time cannot equal end time');  

      console.log(this);
      this.parent_workday.insertShiftAndCalculatePayBreakdown();
    }

    this.$shift_end_input.keydown(updateShift);
    this.$shift_start_input.keydown(updateShift);
    this.$shift_end_input.mouseenter(updateShift);
    this.$shift_start_input.mouseenter(updateShift);
  }
}


class PayReportTable {    
  
  constructor(parent_workday) {
    
    this.parent_workday       = parent_workday;
    
    this.$regular_hours_cell  = $('#reg_hours')
    this.$regular_pay_cell    = $('#reg_pay')
    this.$overtime_hours_cell = $('#ot_hours')
    this.$overtime_pay_cell   = $('#ot_pay')
    this.$total_hours_cell    = $('#tot_hours')
    this.$total_pay_cell      = $('#tot_pay')
    this.$avg_payrate_cell    = $('#avg_payrate')
  }

  updateTable() {
  
    this.$regular_hours_cell  .text(    this.parent_workday.regular_hours .toFixed(2))
    this.$regular_pay_cell    .text(`$${this.parent_workday.regular_pay   .toFixed(2)}`)      
    
    this.$overtime_hours_cell .text(    this.parent_workday.overtime_hours .toFixed(2))
    this.$overtime_pay_cell   .text(`$${this.parent_workday.overtime_pay   .toFixed(2)}`)      
    
    this.$total_hours_cell    .text(    this.parent_workday.total_hours .toFixed(2))      
    this.$total_pay_cell      .text(`$${this.parent_workday.total_pay   .toFixed(2)}`)
  }
}


class Workday {
  
  payReportTable = new PayReportTable(this);
  
  _total_hours    = 0.0
  _regular_hours  = 0.0
  _overtime_hours = 0.0
  _regular_pay    = 0.0
  _overtime_pay   = 0.0
  _total_pay      = 0.0
  _shifts         = []

  get total_hours    () {return this._total_hours    }
  get regular_hours  () {return this._regular_hours  }
  get overtime_hours () {return this._overtime_hours }
  get regular_pay    () {return this._regular_pay    }
  get overtime_pay   () {return this._overtime_pay   }
  get total_pay      () {return this._total_pay      }
  get shifts         () {return this._shifts         }

  set total_hours    (val) {this._total_hours    = val}
  set regular_hours  (val) {this._regular_hours  = val}
  set overtime_hours (val) {this._overtime_hours = val}
  set regular_pay    (val) {this._regular_pay    = val}
  set overtime_pay   (val) {this._overtime_pay   = val}
  set total_pay      (val) {this._total_pay      = val}
  set shifts         (val) {this._shifts         = val}


  insertShiftAndCalculatePayBreakdown() {

    
    this.shifts.push(MAIN_SHIFT);
    
    if (this.shifts.length > 1) {
    
      this._total_hours = this.shifts[0].shift_hours + this.shifts[1].shift_hours;
      
      if (this.total_hours > 8) {
        this.overtime_hours = this.total_hours - 8;
        this.regular_hours = 8;
      }
      else {
        this.overtime_hours = 0;
        this.regular_hours = this.total_hours;
      }
    }
    else if (this.shifts.length == 1) {
      this.total_hours += this.shifts[this.shifts.length -1].shift_hours;
      if (this.total_hours >= OT_LIMIT_HOURS) {
        this.overtime_hours = this.total_hours - OT_LIMIT_HOURS;
        this.regular_hours = OT_LIMIT_HOURS;
      }
      else if (this.total_hours < OT_LIMIT_HOURS) {
        this.overtime_hours = 0;
        this.regular_hours = this.total_hours;
      }
    }
    this.regular_pay  = this.regular_hours  * PAY_RATE;
    this.overtime_pay = this.overtime_hours * (PAY_RATE * 1.5);
    this.total_pay    = this.regular_pay    + this.overtime_pay;
    this.payReportTable.updateTable();
  }
}