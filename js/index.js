
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
//adam.fullName = 'Adam Williams';
//adam.payRate  = 14.00;

let employee_records = d3.select('body').selectAll('div');
employee_records
  .data(employees)
  .enter()
  .append('div')
  .attr('class', 'employee_record');


let d3_records = d3.select('body').selectAll('.employee_record');


const setup_inputs = employee_data => {
  
  const add_input_button = employee_data => {
    employee_data
    .append('input')
    .attr('type', 'button')
    .attr('id', 'input_button')
    .attr('value', 'Enter');
  }
  const add_placeholder = (employee_data, text) => {
    employee_data  
    .append('input')
    .attr('type', 'text')
    .attr('class', 'hours_input')
    .attr('placeholder', text);
  }
  
  add_placeholder(employee_data, 'enter 1st shift hours');
  add_input_button(employee_data);
  
};
const display_data = employee_data => {
  
  const append_identifier = (employee_data, text) => {
    employee_data.append('div').attr('class', 'identifier').text(text);
  }

  append_identifier(employee_data, 'Name');  
  employee_data
    .append('div').attr('class', 'value').text(d => d.fullName);

  append_identifier(employee_data, 'Hourly Rate');  
  employee_data
    .append('div').attr('class', 'value').text(d => `$${d.payRate}.00`);

  setup_inputs(employee_data);
};
const setup_click_event = employee_data => {
  let button = d3.select('body').select('#input_button');
  button
    .on('click', function() {    
      let inputs = document.getElementsByClassName('hours_input');      
      console.log(inputs[0].value);    
      if (inputs[0].value != 0) {
        let element = document.querySelector('input');
        let new_div = document.createElement('div');
        new_div.setAttribute('class', 'hours_input')
        new_div.innerHTML = `${inputs[0].value} hours`;
        new_div.setAttribute('style', 'margin: 2rem 1rem 0 1rem');     
        element.replaceWith(new_div);
      }
      
      d3.select(this).remove();
      
      d3.select(this).attr('value', 'clicked');    
      console.log('clicked');

    });
}


display_data(d3_records);
setup_click_event(d3_records)

console.log(d3_records);