DELIMITER //
CREATE  FUNCTION `calculate_overtime`(job_name varchar(50), hours_worked float) RETURNS float
BEGIN
	DECLARE overtime_hours FLOAT;
	DECLARE management_yn BOOLEAN;
	SET management_yn = job_name REGEXP '.*[Ss]upervisor';
	SET overtime_hours = 0;
	IF !management_yn THEN
		IF hours_worked > 5 THEN
			SET overtime_hours = hours_worked - 5;
		END IF;
	END IF;
	IF management_yn THEN
		IF hours_worked > 8 THEN
			SET overtime_hours = hours_worked - 8;
		END IF;
	END IF;

	RETURN overtime_hours;
END; //

DELIMITER ;