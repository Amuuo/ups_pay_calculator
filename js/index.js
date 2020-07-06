
class Employee {

  _firstName = '';
  _lastName  = '';
  _payRate   = 0;
  
  constructor(fullName, payRate) {
    this.fullName = fullName;
    this.payRate  = payRate;
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


let employees = [
  new Employee('Adam Williams', 14.00), 
  /*
  new Employee('Andrew Valderrama', 14.00),
  new Employee('Alex Maceido', 14.00),
  new Employee('Chris Ortiz', 14.00)
  */
];

const convertToHours = shift_hours => {
  console.log(`Start hour: ${shift_hours['start'][0]}`);
  console.log(`End hour: ${shift_hours['end'][0]}`);

  let total_hours = 0.0;
  
  let start_hour = parseFloat(shift_hours['start'][0]) + 
                  (parseFloat(shift_hours['start'][1])/60);
  let end_hour   = parseFloat(shift_hours['end'][0]) + 
                  (parseFloat(shift_hours['end'][1])/60)

  
  if (end_hour > start_hour)
    total_hours = end_hour - start_hour  
  else if (start_hour > end_hour)
    total_hours = (end_hour + 24) - start_hour;  
  else if (start_hour == end_hour)
    alert('Start time cannot equal end time');  
  
  console.log(`Total hours: ${total_hours}`);
  
}


$('document').ready(() => {
  $('#Checkboxes1').buttonset();  

  
  $('#show_button').click(event => {    
    $('.employee_record').slideToggle(200);
    if ($(event.currentTarget).val() == 'Hide Employee Data'){
      $(event.currentTarget).val('Show Employee Data');      
    }
    else {
      $(event.currentTarget).val('Hide Employee Data');
    }    
  });

  $('#shift_submit_button').click(() => {
    
    let shift_start_hours = $('#shift_start_input').val().split(':');
    let shift_end_hours   = $('#shift_end_input').val().split(':');    

    convertToHours({'start': shift_start_hours, 'end': shift_end_hours });
    
  })
});