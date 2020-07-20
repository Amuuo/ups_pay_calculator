delimiter //

CREATE FUNCTION get_simple_time(time DATETIME)
RETURNS VARCHAR(16)
BEGIN
	DECLARE time_str varchar(16);
	SET time_str = DATE_FORMAT(CONVERT_TZ(time, '+00:00', '-05:00'), '%h:%i %p');
	RETURN time_str;
END; //

delimiter ;