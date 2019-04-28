-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: procoder
-- Source Schemata: db
-- Created: Sun Apr 28 17:36:41 2019
-- Workbench Version: 8.0.15
-- ----------------------------------------------------------------------------

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- ----------------------------------------------------------------------------
-- Schema procoder
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `procoder` ;
CREATE SCHEMA IF NOT EXISTS `procoder` ;

-- ----------------------------------------------------------------------------
-- Table procoder.authentication
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procoder`.`authentication` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(40) NOT NULL,
  `last_name` VARCHAR(40) NULL DEFAULT NULL,
  `user_mail` VARCHAR(45) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `avatar_img_url` VARCHAR(1000) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `user_mail_UNIQUE` (`user_mail` ASC) VISIBLE,
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table procoder.forshare
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procoder`.`forshare` (
  `userid_from` INT(11) NOT NULL,
  `userid_to` INT(11) NOT NULL,
  `map_id` INT(11) NOT NULL,
  INDEX `userid_from_idx` (`userid_from` ASC) VISIBLE,
  INDEX `map_id` (`map_id` ASC) VISIBLE,
  CONSTRAINT `userid_from`
    FOREIGN KEY (`userid_from`)
    REFERENCES `procoder`.`authentication` (`id`),
  CONSTRAINT `which_map`
    FOREIGN KEY (`map_id`)
    REFERENCES `procoder`.`mapslist` (`map_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table procoder.mapslist
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procoder`.`mapslist` (
  `user_id` INT(11) NOT NULL,
  `map_id` INT(11) NOT NULL AUTO_INCREMENT,
  `map_img_url` VARCHAR(1000) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `map_name` VARCHAR(60) NOT NULL,
  `edit_data` DATETIME NOT NULL,
  `last_edit` DATETIME NOT NULL,
  PRIMARY KEY (`map_id`),
  INDEX `user_maps_key` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_maps_key`
    FOREIGN KEY (`user_id`)
    REFERENCES `procoder`.`authentication` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table procoder.mapsnode
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procoder`.`mapsnode` (
  `map_id` INT(11) NOT NULL,
  `pre_node_numb` INT(11) NULL DEFAULT NULL,
  `cur_node_numb` INT(11) NOT NULL,
  `next_node_numb` VARCHAR(10) NULL DEFAULT NULL,
  UNIQUE INDEX `node_id_UNIQUE` (`cur_node_numb` ASC) VISIBLE,
  INDEX `map_id_idx` (`map_id` ASC) VISIBLE,
  CONSTRAINT `map_id`
    FOREIGN KEY (`map_id`)
    REFERENCES `procoder`.`mapslist` (`map_id`),
  CONSTRAINT `node_id`
    FOREIGN KEY (`cur_node_numb`)
    REFERENCES `procoder`.`nodedata` (`node_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table procoder.nodedata
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procoder`.`nodedata` (
  `node_id` INT(11) NOT NULL,
  `node_name` VARCHAR(100) NULL DEFAULT NULL,
  `node_text` VARCHAR(5000) NULL DEFAULT NULL,
  `map_id` INT(11) NOT NULL,
  PRIMARY KEY (`node_id`, `map_id`),
  UNIQUE INDEX `map_id_UNIQUE` (`map_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Routine procoder.add_node
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `procoder`$$
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
-- Routine procoder.add_user
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `procoder`$$
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
-- Routine procoder.new_map
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `procoder`$$
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

-- ----------------------------------------------------------------------------
SET SQL_MODE = '';
DROP USER IF EXISTS Administrator;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'Administrator' IDENTIFIED BY 'P@ssw0rd';

GRANT ALL ON `mydb`.* TO 'Administrator';
SET SQL_MODE = '';
DROP USER IF EXISTS root;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'root' IDENTIFIED BY '12';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
