
class Employee {

  _firstName = '';
  _lastName  = '';
  _payRate   = 0.0;
  work_history = []  
  
  constructor(fullName, payRate) {
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
  set lastName(lName)  { this._lastName  = lName; }
  set payRate(pRate)   { this._payRate   = pRate; }
  set fullName(name) { 
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
  regular_hours  = 0.0;
  overtime_hours = 0.0;
  regular_pay    = 0.0;
  overtime_pay   = 0.0;
  total_pay      = 0.0;
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
      if (this.total_hours >= 5) {
        this.overtime_hours = this.total_hours - 5;
        this.regular_hours = 5;
      }
      else if (this.total_hours < 5) {
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

let employees = [
  new Employee('Adam Williams', 14.00), 
  /*
  new Employee('Andrew Valderrama', 14.00),
  new Employee('Alex Maceido', 14.00),
  new Employee('Chris Ortiz', 14.00)
  */
];



let current_workday = new Workday();  

$('document').ready(() => {

  //$('#pay_data').hide();
    
  $('.shift_submit_button').click(() => {
    let first_shift = new Shift({
      'start': $('#shift_start_input').val(), 
      'end'  : $('#shift_end_input')  .val()
    });
    current_workday.addShift(first_shift);
    employees[0].insertWorkday(current_workday);
    employees[0].work_history[0].renderWorkdayPayData();
    
    //$('#pay_data').slideDown(400);    
    //$('.shift_input_container').hide(200);
    //$('.shift_input_container').del
    
    $('#shift_start_input').replaceWith($('<div>').text(
      `${employees[0].work_history[0].shifts[0].shift_start}`));    
    
    $('#shift_end_input').replaceWith($('<div>')
      .text(`${employees[0].work_history[0].shifts[0].shift_end}`));
    
    $('.shift_input_container').prepend($('<div>')
      .addClass('shift_start_container').text('Shift 1: '));
    
    $('label[for="shift_start_input"]').text('Start');
    $('label[for="shift_end_input"]').text('End');
    $('.shift_submit_button').remove();
    
    $('.employee_record').append($('<div>')
      .attr('id', 'second_shift_button').text('+ Add Double Shift').hide());
    
      $('#second_shift_button').slideDown(500);
    $('.shift_input_container').css('justify-content', 'center');    
  })

  $.ajax({
    type: 'GET',
    url: 'test.php',
    data: 'id=1',
    success: function(msg) {
      console.log(msg.first_name);
      console.log(msg.last_name);
    }

  });
  


});