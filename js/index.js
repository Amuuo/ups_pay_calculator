const OT_LIMIT_HOURS = 5;

const poop = 'THIS IS A TEST'

class Employee {

  _firstName = '';
  _lastName  = '';
  _payRate   = 0.0;
  work_history = []  
  
  constructor(fullName = 'Enter Name Here', payRate = 0.0) {
    this.fullName = fullName;
    this.payRate  = payRate;
  }

  insertWorkday(workday) {
    workday.regular_pay  = workday.regular_hours  * this._payRate;
    workday.overtime_pay = workday.overtime_hours * (this._payRate * 1.5);
    workday.total_pay    = workday.regular_pay    + workday.overtime_pay;

    this.work_history.push(workday);

    console.log('Workday inserted: ');
    
  }

  set firstName(fName) { this._firstName = fName; }
  set lastName (lName) { this._lastName  = lName; }
  set payRate  (pRate) { this._payRate   = pRate; }
  set fullName (name)  { 
    [this._firstName, this._lastName] = name.split(' ');
  }
  
  get firstName() { return this._firstName; }
  get lastName()  { return this._lastName;  }
  get payRate()   { return this._payRate;   }
  get fullName()  { 
    return `${this._firstName} ${this._lastName}`; 
  }
};

function import_shift() {
  
  current_workday.calculatePayBreakdown();
}


class Shift {    

  shift_hours = 0.0;
  shift_start = '';
  shift_end   = '';
  
  constructor(parent_workday) {

    this.parent_workday = parent_workday;
    this.shift_start = $('#shift_start_input').val().split(':');
    this.shift_end   = $('#shift_end_input').val().split(':');      
    
    let start_hour = parseFloat(this.shift_start[0]) + (parseFloat(this.shift_end[1])/60);
    let end_hour   = parseFloat(this.shift_end[0])   + (parseFloat(this.shift_start[1])/60);
    
    
    if (end_hour > start_hour)
      this.shift_hours = end_hour - start_hour  
    
    else if (start_hour > end_hour)
      this.shift_hours = (end_hour + 24) - start_hour;  
    
    else if (start_hour == end_hour)
      alert('Start time cannot equal end time');  
    
  }
}


class PayReportTable {    
  
  constructor(parent_workday) {
    this.parent_workday = parent_workday;
    this.$regular_hours_cell  = $('#reg_hours')
    this.$regular_pay_cell    = $('#reg_pay')
    this.$overtime_hours_cell = $('#ot_hours')
    this.$overtime_pay_cell   = $('#ot_pay')
    this.$total_hours_cell    = $('#tot_hours')
    this.$total_pay_cell      = $('#tot_pay')
    this.$avg_payrate_cell    = $('#avg_payrate')
  }

  updateTable() {
  
    this.$regular_hours_cell  .text(    this.parent_workday.regular_hours.toFixed(2))
    this.$regular_pay_cell    .text(`$${this.parent_workday.regular_pay  .toFixed(2)}`)      
    
    this.$overtime_hours_cell .text(    this.parent_workday.overtime_hours.toFixed(2))
    this.$overtime_pay_cell   .text(`$${this.parent_workday.overtime_pay  .toFixed(2)}`)      
    
    this.$total_hours_cell    .text(super.total_hours.toFixed(2))      
    this.$total_pay_cell      .text(`$${super.total_pay.toFixed(2)}`)
  }
}


class Workday {
  
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




  calculatePayBreakdown() {

    
    this.shifts.push(new Shift(this));
    
    if (this._shifts.length > 1) {
    
      this.total_hours = this.shifts[0].shift_hours + this.shifts[1].shift_hours;
      
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
    this.PayReportTable.updateTable();
  }
}







async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'text/html'
    },
    body: toString(data)
  });
  return response;
}



function modify_form_divs() {

  let tmp_name = $('#name_input').val();
  let tmp_rate = $('#hourly_rate_input').val();

  $('#name_input').replaceWith(
    $('<div>')
      .addClass('after_input')
      .text(tmp_name));
  
  $('#hourly_rate_input').replaceWith(
    $('<div>')
      .addClass('after_input')
      .text('$' + tmp_rate + '/hr'));
  
  $('#shift_start_input').replaceWith(
    $('<div>')
      .text(`${employees[0].work_history[0]._shifts[0].shift_start}`));    
  
  $('#shift_end_input').replaceWith(
    $('<div>')
      .text(`${employees[0].work_history[0]._shifts[0].shift_end}`));
  
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







function create_new_employee() {

  employees.push(
    new Employee(
      $('#name_input').val(), 
      parseFloat($('#hourly_rate_input').val())
    )
  );

  employees[0].insertWorkday(current_workday);
  employees[0].work_history[0].updateReportTable();
}

const fetch_employee_data = () => {

  fetch('http://localhost/test.php')
  .then(response => {
    response.text().then(text => {
      console.log('fetch response');
      $(text).insertBefore($('footer'));
      
    });
    $('#show_employee_button')
      .attr('id', 'hide_employee_button')
      .attr('value', 'Hide Employee Data');          
  });  
  
  fetch('http://localhost/to_json.php')
  .then(response => {
    response.text().then(text => {
      console.log(text);
      $('<p>').insertBefore($('footer'))
      .text(text);
    })
  });
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
      current_workday.calculatePayBreakdown();
      create_new_employee();                      
      modify_form_divs();            
    });
}

let employees = [];
let current_workday = new Workday();  

//$('#pay_data').hide();

$('document').ready(() => {
    
  insert_register_link();
  setup_shift_submit_event_handler();


  $('#show_employee_button').click(fetch_employee_data);  
  
  $('#hide_employee_button')
    .click(() => {
        $('#employee_table2').remove();
      }
    )
    .attr('id', 'show_employee_button');
});
  


