DROP FUNCTION ups.calculate_hours_worked;

delimiter //

CREATE  FUNCTION `calculate_hours_worked`(start_time DATETIME, end_time DATETIME) RETURNS float
BEGIN
	DECLARE hours_worked FLOAT;
	SET hours_worked = 0.0;
	SET hours_worked = TIMESTAMPDIFF(MINUTE, start_time, end_time)/60;
	RETURN ROUND(hours_worked, 2);
END; //

delimiter ;