DROP PROCEDURE IF EXISTS `add_purchase_date_column_to_order_table`;
DELIMITER //
CREATE PROCEDURE `add_purchase_date_column_to_order_table`()
BEGIN
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END;
  ALTER TABLE `order` ADD COLUMN `purchase_date` datetime;
END //
DELIMITER ;
CALL `add_purchase_date_column_to_order_table`();
DROP PROCEDURE `add_purchase_date_column_to_order_table`;
