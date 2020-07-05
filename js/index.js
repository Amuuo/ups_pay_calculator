
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
    let shift_start = new Date();
    let shift_time = shift_start.getTime();
    shift_start.setTime($('#shift_start_input').val());
    let shift_end   = new Date($('#shift_end_input').val());
    console.log(shift_start.getTime());
    console.log(shift_end);
    console.log(shift_start.getHours());

    console.log(shift_end-shift_start)

  })
});