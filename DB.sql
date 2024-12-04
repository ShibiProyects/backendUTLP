-- MySQL Script generated by MySQL Workbench
-- Wed Nov 27 13:10:35 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS,
    UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE =
            'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema courses
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `courses`;
-- -----------------------------------------------------
-- Schema courses
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `courses`;
USE `courses`;
-- -----------------------------------------------------
-- Table `courses`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`user`;
CREATE TABLE IF NOT EXISTS `courses`.`user`
(
    `user_id`    INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50)  NOT NULL,
    `last_name`  VARCHAR(50)  NOT NULL,
    `email`      VARCHAR(50)  NOT NULL,
    `username`   VARCHAR(50)  NOT NULL,
    `password`   VARCHAR(250) NOT NULL,
    `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON
        UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`),
    UNIQUE INDEX `email` (`email` ASC),
    UNIQUE INDEX `username` (`username` ASC)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `courses`.`course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`course`;
CREATE TABLE IF NOT EXISTS `courses`.`course`
(
    `course_id`        INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    `teacher_user_id`  INT UNSIGNED     NOT NULL,
    `course_status_id` INT(10) UNSIGNED NOT NULL,
    `title`            VARCHAR(255)     NOT NULL,
    `description`      TEXT             NULL,
    `meet`             TEXT             NOT NULL,
    `created_at`       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON
        UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`course_id`),
    INDEX `username_id` (`teacher_user_id` ASC),
    INDEX `course_status_id` (`course_status_id` ASC),
    CONSTRAINT `fk_course_course_status` FOREIGN KEY (`course_status_id`) REFERENCES `course_status` (`course_status_id`) ON DELETE RESTRICT,
    CONSTRAINT `fk_course_user` FOREIGN KEY (`teacher_user_id`) REFERENCES `courses`.`user` (`user_id`) ON
        DELETE RESTRICT
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `courses`.`student_course_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`student_course_status`;
CREATE TABLE IF NOT EXISTS `courses`.`student_course_status`
(
    `student_course_status_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`                     VARCHAR(45)  NOT NULL,
    `created_at`               DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`               DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON
        UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`student_course_status_id`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `courses`.`student_has_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`student_has_course`;
CREATE TABLE IF NOT EXISTS `courses`.`student_has_course`
(
    `student_has_course_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `status_id`             INT UNSIGNED NOT NULL,
    `course_id`             INT UNSIGNED NOT NULL,
    `user_id`               INT UNSIGNED NOT NULL,
    `created_at`            DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`            DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON
        UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`student_has_course_id`),
    INDEX `fk_student_has_course_student_course_status1_idx` (`status_id` ASC),
    INDEX `student_course_ibfk_1_idx` (`course_id` ASC),
    INDEX `student_course_ibfk_2_idx` (`user_id` ASC),
    CONSTRAINT `student_course_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses`.`course` (`course_id`) ON
        DELETE CASCADE,
    CONSTRAINT `student_course_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `courses`.`user` (`user_id`) ON
        DELETE CASCADE,
    CONSTRAINT `fk_student_has_course_student_course_status1` FOREIGN KEY (`status_id`) REFERENCES `courses`.`student_course_status` (`student_course_status_id`) ON
        DELETE NO ACTION ON
        UPDATE NO ACTION
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `courses`.`course_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`course_status`;
CREATE TABLE IF NOT EXISTS `courses`.`course_status`
(
    `course_status_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`             VARCHAR(50)  NOT NULL,
    `created_at`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON
        UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`course_status_id`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `courses`.`accesibility_themes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`accesibility_themes`;
CREATE TABLE IF NOT EXISTS `courses`.`accesibility_themes`
(
    `idaccesibility_themes` INT         NOT NULL AUTO_INCREMENT,
    `name`                  VARCHAR(45) NOT NULL,
    PRIMARY KEY (`idaccesibility_themes`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `courses`.`accesibility`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`accesibility`;
CREATE TABLE IF NOT EXISTS `courses`.`accesibility`
(
    `accesibility_id`                           INT          NOT NULL AUTO_INCREMENT,
    `user_user_id`                              INT UNSIGNED NOT NULL,
    `accesibility_themes_idaccesibility_themes` INT          NOT NULL,
    `font_size`                                 INT          NOT NULL,
    PRIMARY KEY (`accesibility_id`),
    INDEX `fk_accesibility_accesibility_themes1_idx` (`accesibility_themes_idaccesibility_themes` ASC),
    INDEX `fk_accesibility_user1_idx` (`user_user_id` ASC),
    CONSTRAINT `fk_accesibility_accesibility_themes1` FOREIGN KEY (`accesibility_themes_idaccesibility_themes`) REFERENCES `courses`.`accesibility_themes` (`idaccesibility_themes`) ON
        DELETE NO ACTION ON
        UPDATE NO ACTION,
    CONSTRAINT `fk_accesibility_user1` FOREIGN KEY (`user_user_id`) REFERENCES `courses`.`user` (`user_id`) ON
        DELETE NO ACTION ON
        UPDATE NO ACTION
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `courses`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`role`;
CREATE TABLE IF NOT EXISTS `courses`.`role`
(
    `role_id`    INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(45)  NOT NULL,
    `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON
        UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`role_id`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `courses`.`user_role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`user_role`;
CREATE TABLE IF NOT EXISTS `courses`.`user_role`
(
    `user_user_id` INT UNSIGNED NOT NULL,
    `role_role_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`user_user_id`, `role_role_id`),
    INDEX `fk_user_has_role_role1_idx` (`role_role_id` ASC),
    INDEX `fk_user_has_role_user1_idx` (`user_user_id` ASC),
    CONSTRAINT `fk_user_has_role_user1` FOREIGN KEY (`user_user_id`) REFERENCES `courses`.`user` (`user_id`) ON
        DELETE NO ACTION ON
        UPDATE NO ACTION,
    CONSTRAINT `fk_user_has_role_role1` FOREIGN KEY (`role_role_id`) REFERENCES `courses`.`role` (`role_id`) ON
        DELETE NO ACTION ON
        UPDATE NO ACTION
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `courses`.`Notas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`Notas`;
CREATE TABLE IF NOT EXISTS `courses`.`Notas`
(
    `Notas_id`      INT        NOT NULL,
    `nota`          INT        NOT NULL,
    `identify_note` TINYINT(1) NOT NULL CHECK (
        identify_note BETWEEN 1 AND 9
        ),
    PRIMARY KEY (`Notas_id`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `courses`.`Notas_has_student_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`Notas_has_student_course`;
CREATE TABLE IF NOT EXISTS `courses`.`Notas_has_student_course`
(
    `Notas_Notas_id`    INT          NOT NULL,
    `student_course_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`Notas_Notas_id`, `student_course_id`),
    INDEX `fk_Notas_has_student_course_student_course1_idx` (`student_course_id` ASC),
    INDEX `fk_Notas_has_student_course_Notas1_idx` (`Notas_Notas_id` ASC),
    CONSTRAINT `fk_Notas_has_student_course_Notas1` FOREIGN KEY (`Notas_Notas_id`) REFERENCES `courses`.`Notas` (`Notas_id`) ON
        DELETE NO ACTION ON
        UPDATE NO ACTION,
    CONSTRAINT `fk_Notas_has_student_course_student_course1` FOREIGN KEY (`student_course_id`) REFERENCES `courses`.`student_has_course` (`student_has_course_id`) ON
        DELETE NO ACTION ON
        UPDATE NO ACTION
) ENGINE = InnoDB;
USE `courses`;
DELIMITER $$ USE `courses` $$
DROP TRIGGER IF EXISTS `courses`.`course_AFTER_INSERT` $$
USE `courses` $$
CREATE DEFINER = CURRENT_USER TRIGGER `courses`.`course_AFTER_INSERT`
    AFTER
        INSERT
    ON `course`
    FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1
               FROM student_has_course
               WHERE student_has_course.course_id = NEW.course_id
                 AND student_has_course.user_id = NEW.teacher_user_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
                'El usuario no puede ser profesor porque ya está inscrito como estudiante en este curso.';
    END IF;
END;
$$
USE `courses` $$
DROP TRIGGER IF EXISTS `courses`.`course_AFTER_UPDATE` $$
USE `courses` $$
CREATE DEFINER = CURRENT_USER TRIGGER `courses`.`course_AFTER_UPDATE`
    AFTER
        UPDATE
    ON `course`
    FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1
               FROM student_has_course
               WHERE student_has_course.course_id = NEW.course_id
                 AND student_has_course.user_id = NEW.teacher_user_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
                'El usuario no puede ser profesor porque ya está inscrito como estudiante en este curso.';
    END IF;
END $$
USE `courses` $$
DROP TRIGGER IF EXISTS `courses`.`student_has_course_AFTER_INSERT` $$
USE `courses` $$
CREATE DEFINER = CURRENT_USER TRIGGER `courses`.`student_has_course_AFTER_INSERT`
    AFTER
        INSERT
    ON `student_has_course`
    FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1
               FROM course
               WHERE course.course_id = NEW.course_id
                 AND course.teacher_user_id = NEW.user_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
                'El usuario no puede ser estudiante porque ya es profesor de este curso.';
    END IF;
END $$
USE `courses` $$
DROP TRIGGER IF EXISTS `courses`.`student_has_course_AFTER_UPDATE` $$
USE `courses` $$
CREATE DEFINER = CURRENT_USER TRIGGER `courses`.`student_has_course_AFTER_UPDATE`
    AFTER
        UPDATE
    ON `student_has_course`
    FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1
               FROM course
               WHERE course.course_id = NEW.course_id
                 AND course.teacher_user_id = NEW.user_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
                'El usuario no puede ser estudiante porque ya es profesor de este curso.';
    END IF;
END $$
DELIMITER ; SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;


-- INSERTS


INSERT INTO `courses`.`role`(`role_id`, `name`)
VALUES (1, 'Administrator');
INSERT INTO `courses`.`role`(`role_id`, `name`)
VALUES (2, 'Teacher');
INSERT INTO `courses`.`role`(`role_id`, `name`)
VALUES (3, 'Student');
INSERT INTO `courses`.`user`(`user_id`,
                             `first_name`,
                             `last_name`,
                             `email`,
                             `username`,
                             `password`)
VALUES (1,
        'Juan',
        'Pérez',
        'juan.perez@example.com',
        'juan.perez',
        '$2b$04$pshU8fGJxhK1nZ8/jz8x3OvP7jBspj0L9YRm9jQVWVghri/.Nu1IG');
INSERT INTO `courses`.`user`(`user_id`,
                             `first_name`,
                             `last_name`,
                             `email`,
                             `username`,
                             `password`)
VALUES (2,
        'Juan',
        'Pérez',
        'j2uan.perez@example.com',
        'j2uan.perez',
        '$2b$04$pshU8fGJxhK1nZ8/jz8x3OvP7jBspj0L9YRm9jQVWVghri/.Nu1IG');
INSERT INTO `courses`.`user_role`(`user_user_id`, `role_role_id`)
VALUES (1, 2);

-- course status
INSERT INTO `courses`.course_status(`name`)
VALUES ('En desarrollo');
INSERT INTO `courses`.course_status(`name`)
VALUES ('Terminado');
INSERT INTO `courses`.course_status(`name`)
VALUES ('Pausado');
INSERT INTO `courses`.course_status(`name`)
VALUES ('Cancelado');

-- course
INSERT INTO `courses`.`course`(`teacher_user_id`, `course_status_id`, `title`, `meet`)
VALUES (1, 2, 'SQL 0 a maestro', 'www.google.cl');

-- student_course status
INSERT INTO `courses`.`student_course_status`(`name`)
VALUES ('En desarrollo');
INSERT INTO `courses`.`student_course_status`(`name`)
VALUES ('Reprobado');
INSERT INTO `courses`.`student_course_status`(`name`)
VALUES ('Aprobado');

-- student has course
INSERT INTO `courses`.`student_has_course`(`status_id`, `course_id`, `user_id`)
VALUES (1, 1, 2)

