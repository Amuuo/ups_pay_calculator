const OT_LIMIT_HOURS = 5;



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
    workday.regular_pay  = workday.regular_hours * this._payRate;
    workday.overtime_pay = workday.overtime_hours * (this._payRate * 1.5);
    workday.total_pay    = workday.regular_pay + workday.overtime_pay;

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
  
  current_workday.addShift(new current_workday.Shift());
}

class Workday {
  
  total_hours    = 0.0
  regular_hours  = 0.0
  overtime_hours = 0.0
  regular_pay    = 0.0
  overtime_pay   = 0.0
  total_pay      = 0.0
  shifts         = []

  get total_hours    () {return this.total_hours   }
  get regular_hours  () {return this.regular_hours }
  get overtime_hours () {return this.overtime_hours}
  get regular_pay    () {return this.regular_pay   }
  get overtime_pay   () {return this.overtime_pay  }
  get total_pay      () {return this.total_pay     }

  set total_hours    (val) {this.total_hours    = val}
  set regular_hours  (val) {this.regular_hours  = val}
  set overtime_hours (val) {this.overtime_hours = val}
  set regular_pay    (val) {this.regular_pay    = val}
  set overtime_pay   (val) {this.overtime_pay   = val}
  get total_pay      (val) {this.total_pay      = val}


  Shift = class {    
  
    total_hours = 0.0;
    shift_start = '';
    shift_end   = '';
    
    constructor() {
  
      this.shift_start = $('#shift_start_input').val().split(':');
      this.shift_end   = $('#shift_end_input').val().split(':');      
      
      let start_hour = parseFloat(this.shift_start[0]) + (parseFloat(this.shift_end[1])/60);
      let end_hour   = parseFloat(this.shift_end[0])   + (parseFloat(this.shift_start[1])/60);
      
      
      if (end_hour > start_hour)
        super.total_hours = end_hour - start_hour  
      
      else if (start_hour > end_hour)
        super.total_hours = (end_hour + 24) - start_hour;  
      
      else if (start_hour == end_hour)
        alert('Start time cannot equal end time');  

    }
  }

  PayReportTable = new class {    
  
    constructor() {
      this.$regular_hours_cell  = $('#reg_hours')
      this.$regular_pay_cell    = $('#reg_pay')
      this.$overtime_hours_cell = $('#ot_hours')
      this.$overtime_pay_cell   = $('#ot_pay')
      this.$total_hours_cell    = $('#tot_hours')
      this.$total_pay_cell      = $('#tot_pay')
      this.$avg_payrate_cell    = $('#avg_payrate')
    }

    updateTable() {
    
      this.$regular_hours_cell  .text(super.regular_hours.toFixed(2))
      this.$regular_pay_cell    .text(`$${super.regular_pay.toFixed(2)}`)      
      
      this.$overtime_hours_cell .text(super.overtime_hours.toFixed(2))
      this.$overtime_pay_cell   .text(`$${super.overtime_pay.toFixed(2)}`)      
      
      this.$total_hours_cell    .text(super.total_hours.toFixed(2))      
      this.$total_pay_cell      .text(`$${super.total_pay.toFixed(2)}`)
    }
  }

  addShift() {

    this.shifts.push(new this.Shift());
    
    if (this.shifts.length > 1) {
    
      this.total_hours = this.shifts[0].total_hours + this.shifts[1].total_hours;
      
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
      this.total_hours = this.shifts[0].total_hours;
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
      .text(`${employees[0].work_history[0].shifts[0].shift_start}`));    
  
  $('#shift_end_input').replaceWith(
    $('<div>')
      .text(`${employees[0].work_history[0].shifts[0].shift_end}`));
  
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
      import_shift();
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
  


