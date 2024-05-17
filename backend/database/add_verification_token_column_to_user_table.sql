DROP PROCEDURE IF EXISTS `add_verification_token_column_to_user_table`;
DELIMITER //
CREATE PROCEDURE `add_verification_token_column_to_user_table`()
BEGIN
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END;
  ALTER TABLE user ADD COLUMN `verification_token` varchar(36) NOT NULL;
END //
DELIMITER ;
CALL `add_verification_token_column_to_user_table`();
DROP PROCEDURE `add_verification_token_column_to_user_table`;
