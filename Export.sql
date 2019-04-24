-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: db
-- Source Schemata: db1
-- Created: Mon Apr 22 16:09:26 2019
-- Workbench Version: 8.0.15
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema db
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `db` ;
CREATE SCHEMA IF NOT EXISTS `db` ;

-- ----------------------------------------------------------------------------
-- Table db.authentication
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`authentication` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(40) NOT NULL,
  `user_mail` VARCHAR(45) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `user_mail_UNIQUE` (`user_mail` ASC) VISIBLE,
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table db.forshare
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`forshare` (
  `userid_from` INT(11) NOT NULL,
  `userid_to` INT(11) NOT NULL,
  `map_id` INT(11) NOT NULL,
  INDEX `userid_from_idx` (`userid_from` ASC) VISIBLE,
  INDEX `map_id` (`map_id` ASC) VISIBLE,
  CONSTRAINT `userid_from`
    FOREIGN KEY (`userid_from`)
    REFERENCES `db`.`authentication` (`id`),
  CONSTRAINT `which_map`
    FOREIGN KEY (`map_id`)
    REFERENCES `db`.`mapslist` (`map_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table db.mapslist
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`mapslist` (
  `user_id` INT(11) NOT NULL,
  `map_id` INT(11) NOT NULL AUTO_INCREMENT,
  `map_name` VARCHAR(60) NOT NULL,
  `data` DATETIME NOT NULL,
  `last_edit` DATETIME NOT NULL,
  PRIMARY KEY (`map_id`),
  INDEX `user_maps_key` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_maps_key`
    FOREIGN KEY (`user_id`)
    REFERENCES `db`.`authentication` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table db.mapsnode
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`mapsnode` (
  `map_id` INT(11) NOT NULL,
  `pre_node_numb` INT(11) NULL DEFAULT NULL,
  `cur_node_numb` INT(11) NOT NULL,
  `next_node_numb` VARCHAR(10) NULL DEFAULT NULL,
  UNIQUE INDEX `node_id_UNIQUE` (`cur_node_numb` ASC) VISIBLE,
  INDEX `map_id_idx` (`map_id` ASC) VISIBLE,
  CONSTRAINT `map_id`
    FOREIGN KEY (`map_id`)
    REFERENCES `db`.`mapslist` (`map_id`),
  CONSTRAINT `node_id`
    FOREIGN KEY (`cur_node_numb`)
    REFERENCES `db`.`nodedata` (`node_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table db.nodedata
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`nodedata` (
  `node_id` INT(11) NOT NULL,
  `node_name` VARCHAR(100) NULL DEFAULT NULL,
  `node_text` VARCHAR(5000) NULL DEFAULT NULL,
  `map_id` INT(11) NOT NULL,
  PRIMARY KEY (`node_id`, `map_id`),
  UNIQUE INDEX `map_id_UNIQUE` (`map_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Routine db.add_node
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_node`(map_id int(11), nodename varchar(100), nodetext varchar(5000), parentnode_id int(11))
BEGIN


set @allnodes=(SELECT MAX(node_id) FROM nodedata WHERE map_id=map_id);
set @newnode=@allnodes+1;

insert into nodedata (`node_id`, `node_name`, `node_text`, `map_id`)
values (@newnode, nodename, nodetext, map_id);


update mapsnode
set `next_node_numb`=CASE
WHEN `next_node_numb`= null AND `map_id`= map_id AND `cur_node_numb`= parentnode_id
THEN `next_node_numb`=@newnode
WHEN `next_node_numb`!= NULL AND `map_id`= map_id AND `cur_node_numb`=parentnode_id
THEN `next_node_numb`=CONCAT(`next_node_numb`,"; ",@newnode)
END;

insert into mapsnode (`map_id`, `pre_node_numb`, `cur_node_numb`, `next_node_numb`)
values (map_id, parentnode_id, @newnode, null);


END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine db.add_user
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_user`(
userName varchar(40),
userMail  varchar(45),
password varchar(20)
)
BEGIN
-- create row for new  user
insert into authentication (`user_name`, `user_mail`, `password`)
values (userName, userMail, password);


END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine db.new_map
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_map`(userID int(11), mapName varchar(60))
BEGIN

set @data=NOW();

insert into `mapslist`(`user_id`, `map_name`, `data`, `last_edit`) values (userID, mapName, @data, @data);

set @cur_map_id:=LAST_INSERT_ID();
-- set @allnodes=(SELECT MAX(node_id) FROM nodedata WHERE map_id=@cur_map_id);
-- set @newnode=@allnodes+1;
set @newnode=1;
insert into `nodedata`(`node_id`, `node_name`, `node_text`, `map_id`) 
values (@newnode, CONCAT("Node №",@newnode), null, @cur_map_id);

insert into `mapsnode`(`map_id`, `pre_node_numb`, `cur_node_numb`, `next_node_numb`)
values (@cur_map_id, null, @newnode, null );
END$$

DELIMITER ;
SET FOREIGN_KEY_CHECKS = 1;
