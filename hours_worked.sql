SELECT 
	CONCAT(e.first_name, ' ', e.last_name) 
	AS 'name',
	CONCAT('$', p.pay_rate) 
	AS 'pay rate',
	DATE_FORMAT(
		start_datetime, "%m/%d/%Y"
	) AS 'date',
	ROUND(
		TIMESTAMPDIFF(MINUTE, start_datetime, end_datetime)/60 , 2
	) AS 'hours worked',
	calculate_overtime(p.job_name`overtime hours`,
	DATE_FORMAT(
		CONVERT_TZ(start_datetime, '+00:00', '-05:00'), '%h:%i %p'
	) AS 'shift start', 
	DATE_FORMAT(
		CONVERT_TZ(end_datetime, '+00:00', '-05:00'), '%h:%i %p'	
	) AS 'shift end'
FROM ups.work_shift ws
INNER JOIN ups.employee e ON ws.employee_id = e.id
INNER JOIN ups.position p ON e.position_id = p.id;