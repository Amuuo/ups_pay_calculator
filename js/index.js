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


const addIdentifier = ($employee_record, text) => {
  $employee_record.append($('<div>').addClass('identifier').text(text));
}
const addValue = ($employee_record, text) => {
  $employee_record.append($('<div>').addClass('value').text(text));
}

$('document').ready(() => {
  
  $('main').prepend($('<div>').attr('class', 'employee_record'));
  let $employee_record = $('.employee_record');

  addIdentifier ($employee_record, 'Name');  
  addValue      ($employee_record, employees[0].fullName);
  
  addIdentifier ($employee_record, 'Hourly Rate');
  addValue      ($employee_record, employees[0].payRate);  
  
  $employee_record.hide();
  
  $('main').append($('<input>')
    .attr('type', 'button')
    .attr('id', 'show_button')
    .attr('value', 'Show Employee Data'));
  $('#show_button').click(function() {
    $employee_record.slideToggle();
  })
  

  $('input[type="checkbox"]').click(function() {
    let $label1 = $('label[for="Checkbox1"]');
    let $label2 = $('label[for="Checkbox2"]');
    if($('#Checkbox1').prop('checked') == true) {
      console.log(`${$label1.textContent} checked`);
      $employee_record.slideToggle();
      $('#show_button').text('Hide Employee Data');
    }
    else {
      console.log(`${$label2.textContent} unchecked`);
    }
  });
});