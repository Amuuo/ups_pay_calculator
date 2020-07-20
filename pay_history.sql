SELECT 
	CONCAT(e.first_name, ' ', e.last_name) 
	AS 'name',
	CONCAT('$', p.pay_rate) 
	AS 'pay rate',
	DATE_FORMAT(start_datetime, "%m/%d/%Y") 
	AS 'date',
	calculate_hours_worked(start_datetime, end_datetime) 
	AS 'hours worked',
	calculate_overtime(job_name, calculate_hours_worked(start_datetime, end_datetime)) 
	AS 'overtime worked',
	get_simple_time(start_datetime) 
	AS 'shift start', 
	get_simple_time(end_datetime) 
	AS 'shift end'
FROM ups.work_shift ws
INNER JOIN ups.employee e ON ws.employee_id = e.id
INNER JOIN ups.position p ON e.position_id = p.id;