-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: procode
-- Source Schemata: procoder
-- Created: Fri May 17 12:46:33 2019
-- Workbench Version: 8.0.16
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema procode
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `procode` ;
CREATE SCHEMA IF NOT EXISTS `procode` ;

-- ----------------------------------------------------------------------------
-- Table procode.category
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procode`.`category` (
  `id_category` INT(11) NOT NULL,
  `category_name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_category`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table procode.for_share
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procode`.`for_share` (
  `userid_from` INT(11) NOT NULL,
  `userid_to` INT(11) NOT NULL,
  `map_id` INT(11) NOT NULL,
  INDEX `userid_from_idx` (`userid_from` ASC) VISIBLE,
  INDEX `map_id` (`map_id` ASC) VISIBLE,
  CONSTRAINT `user_from`
    FOREIGN KEY (`userid_from`)
    REFERENCES `procode`.`users` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `which_map`
    FOREIGN KEY (`map_id`)
    REFERENCES `procode`.`maps` (`map_id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table procode.large_snippets
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procode`.`large_snippets` (
  `id` VARCHAR(50) NOT NULL,
  `snippet` VARCHAR(5000) NULL DEFAULT NULL,
  `map_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `map_id_large_snip_idx` (`map_id` ASC) VISIBLE,
  CONSTRAINT `map_id_large_snip`
    FOREIGN KEY (`map_id`)
    REFERENCES `procode`.`maps` (`map_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table procode.maps
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procode`.`maps` (
  `user_id` INT(11) NOT NULL,
  `map_id` INT(11) NOT NULL AUTO_INCREMENT,
  `map_category` VARCHAR(20) NULL DEFAULT NULL,
  `map_name` VARCHAR(60) NOT NULL,
  `create_data` DATETIME NOT NULL,
  `last_edit` DATETIME NOT NULL,
  `status` INT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`map_id`),
  INDEX `user_maps_key` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_maps_key`
    FOREIGN KEY (`user_id`)
    REFERENCES `procode`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table procode.maps_img
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procode`.`maps_img` (
  `map_id` INT(11) NOT NULL,
  `map_img` BINARY(255) NULL DEFAULT NULL,
  INDEX `map_id_img_idx` (`map_id` ASC) VISIBLE,
  CONSTRAINT `map_id_img`
    FOREIGN KEY (`map_id`)
    REFERENCES `procode`.`maps` (`map_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table procode.maps_nodes
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procode`.`maps_nodes` (
  `map_id` INT(11) NOT NULL,
  `pre_node_numb` VARCHAR(100) NULL DEFAULT NULL,
  `cur_node_numb` VARCHAR(100) NOT NULL,
  INDEX `mad_id_idx` (`map_id` ASC) VISIBLE,
  INDEX `maps_id_nodes_idx` (`map_id` ASC) VISIBLE,
  CONSTRAINT `maps_id_nodes`
    FOREIGN KEY (`map_id`)
    REFERENCES `procode`.`maps` (`map_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table procode.nodes_data
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procode`.`nodes_data` (
  `node_id` VARCHAR(50) NOT NULL,
  `node_name` VARCHAR(200) NULL DEFAULT NULL,
  `node_content` VARCHAR(1000) NULL DEFAULT NULL,
  `large_snippet` VARCHAR(20000) NULL DEFAULT NULL,
  `map_id` INT(11) NOT NULL,
  PRIMARY KEY (`node_id`, `map_id`),
  UNIQUE INDEX `map_id_UNIQUE` (`map_id` ASC, `node_id` ASC) VISIBLE,
  CONSTRAINT `map_id`
    FOREIGN KEY (`map_id`)
    REFERENCES `procode`.`maps` (`map_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table procode.users
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procode`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(40) NOT NULL,
  `last_name` VARCHAR(40) NULL DEFAULT NULL,
  `user_mail` VARCHAR(45) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `user_mail_UNIQUE` (`user_mail` ASC) VISIBLE,
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table procode.users_avatar
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `procode`.`users_avatar` (
  `id` INT(11) NOT NULL,
  `avatar_img` BINARY(225) NULL DEFAULT NULL,
  INDEX `id_avatar_idx` (`id` ASC) VISIBLE,
  CONSTRAINT `id_avatar`
    FOREIGN KEY (`id`)
    REFERENCES `procode`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Routine procode.add_node
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `procode`$$
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
-- Routine procode.add_user
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `procode`$$
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
-- Routine procode.new_map
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `procode`$$
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
