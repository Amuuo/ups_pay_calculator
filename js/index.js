const OT_LIMIT_HOURS = 8;



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
    this.work_history[this.work_history.length - 1].displayWorkday();
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



class Workday {
  
  total_hours    = 0.0
  regular_hours  = 0.0
  overtime_hours = 0.0
  regular_pay    = 0.0
  overtime_pay   = 0.0
  total_pay      = 0.0
  shifts         = []

  addShift(shift) {

    this.shifts.push(shift)
    
    if (this.shifts.length > 1) {
    
      this.total_hours = this.shifts[0].total_hours + this.shifts[1].total_hours;
      
      if (this.total_hours > 8){
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
  }

  constructor() {}
  

  displayWorkday() {
    console.log(`Total hours: ${this.total_hours}`);
    console.log(`Regular hours: ${this.regular_hours}`);
    console.log(`Overtime hours: ${this.overtime_hours}`);
  }

  renderWorkdayPayData() {
    
    $('#reg_hours')
      .text(employees[0].work_history[0].regular_hours.toFixed(2))

    $('#reg_pay')
      .text(`$${employees[0].work_history[0].regular_pay.toFixed(2)}`)
      
    $('#ot_hours')
      .text(employees[0].work_history[0].overtime_hours.toFixed(2))

    $('#ot_pay')
      .text(`$${employees[0].work_history[0].overtime_pay.toFixed(2)}`)
      
    $('#tot_hours')
      .text(employees[0].work_history[0].total_hours.toFixed(2))
      
    $('#tot_pay')
      .text(`$${employees[0].work_history[0].total_pay.toFixed(2)}`)
      

  }
}



class Shift {
  
  total_hours = 0.0;
  shift_start = '';
  shift_end   = '';
  
  constructor(shift_hours) {

    this.shift_start = shift_hours['start'];
    this.shift_end   = shift_hours['end'];

    let start_time = shift_hours['start'].split(':');
    let end_time   = shift_hours['end']  .split(':');
    
    let start_hour = parseFloat(start_time[0]) + (parseFloat(start_time[1])/60);
    let end_hour   = parseFloat(end_time[0])   + (parseFloat(end_time[1])/60);
    
    if (end_hour > start_hour)
      this.total_hours = end_hour - start_hour  
    else if (start_hour > end_hour)
      this.total_hours = (end_hour + 24) - start_hour;  
    else if (start_hour == end_hour)
      alert('Start time cannot equal end time');  

    console.log(`From constructor:\nTotal hours: ${this.total_hours}`);
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



function import_shift() {
  
  let first_shift = new Shift({
    'start': $('#shift_start_input').val(), 
    'end'  : $('#shift_end_input')  .val()
  });
  
  current_workday.addShift(first_shift);
}



function create_new_employee() {

  employees.push(
    new Employee(
      $('#name_input').val(), 
      parseFloat($('#hourly_rate_input').val())
    )
  );

  employees[0].insertWorkday(current_workday);
  employees[0].work_history[0].renderWorkdayPayData();
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
  


