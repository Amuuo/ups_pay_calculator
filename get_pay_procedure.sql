USE ups;

DROP PROCEDURE GetPay;

DELIMITER //

CREATE  PROCEDURE `GetPay`()
BEGIN
	WITH hours_worked AS (
		SELECT 
			id,
			calculate_hours_worked(start_datetime, end_datetime) AS 'hours_worked'
		FROM work_shift
	)
	SELECT 
    CONCAT(first_name, ' ', last_name)          AS 'name',
		CONCAT('$', pay_rate)                       AS 'pay rate',
		DATE_FORMAT(start_datetime, "%m/%d/%Y")     AS 'date',
		hours_worked                                AS 'hours worked',
		calculate_overtime(job_name, hours_worked)  AS 'overtime worked',
		get_simple_time(start_datetime)             AS 'shift start', 
		get_simple_time(end_datetime)               AS 'shift end'
	FROM       work_shift    ws
	INNER JOIN employee      e  ON ws.employee_id = e.id
	INNER JOIN position      p  ON e.position_id  = p.id
	INNER JOIN hours_worked  hs ON hs.id          = ws.id;
END; //

DELIMITER ;