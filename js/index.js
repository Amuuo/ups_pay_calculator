
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
  new Employee('Andrew Valderrama', 14.00),
  new Employee('Alex Maceido', 14.00),
  new Employee('Chris Ortiz', 14.00)
];
//adam.fullName = 'Adam Williams';
//adam.payRate  = 14.00;

let employee_records = d3.select('body').selectAll('div');
employee_records
  .data(employees)
  .enter()
  .append('div')
  .attr('class', 'employee_record')
  .on('mouseover', function() {
    d3.select(this).style('background-color', 'lightblue');
  })
  .on('mouseout', function() {
    d3.select(this).style('background-color', 'aliceblue');
  });

let records = d3.select('body').selectAll('.employee_record');

records
  .append('p')
  .attr('class', 'identifier')  
  .text('Name:');

records
  .append('p')
  .attr('class', 'value')
  .text(d => d.fullName);


records
  .append('p')
  .attr('class', 'identifier')
  .text('Pay Rate:');

records
  .append('p')
  .attr('class', 'value')
  .text(d => `${d.payRate}.00/hr`);

records  
.append('input')
  .attr('type', 'text')
  .attr('class', 'hours_input')


