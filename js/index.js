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

  let $main = $('main');  
  $main.prepend($('<div>').attr('class', 'employee_record'));
  let $employee_record = $('.employee_record');
  $employee_record.append($('<div>').attr('class', 'identifier').text('Name'));
  $employee_record.append($('<div>').attr('class', 'value').text(employees[0].fullName));
  $employee_record.append($('<div>').attr('class', 'identifier').text('Hourly Rate'));
  $employee_record.append($('<div>').attr('class', 'value').text(`$${employees[0].payRate}.00`));

  $('input[type="checkbox"]').click(function() {
    let $this = $(this);
    if($this.prop('checked') == true) {
      console.log(`${$this[0].text()} checked`);
    }
    else {
      console.log(`${$this[0].text()} unchecked`);
    }
  });
});