# :construction: :book: Notas de Backend

> :construction_worker: :book: **Notas**
>
> - Recuerde usar **npm install** no se almacenan los archivos node_modules para evitar sobrecargar github con datos inútiles.
> - Todavía no modifico la base de datos por lo que la estructura de las SQL no es valido o no es como se espera
> - Falta ordenar el tema de las excepciones y el tratamiento global de estas, pensaba utilizar alguna librería para dejar registro de estas excepciones
> - Algunos EndPoints aún no han sido implementados como tal y falta definir su documentación con **swagger**

:books: Swagger se encuentra en la URL **/apis/api-docs**

:warning: :books: **Recuerde configurar las variables de entorno**

Estructura del archivo **.env**

```plaintext
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=

SERVER_PORT=
```

> :book: Recuerde que el archivo debe ser creado en la carpeta config que deberia estar en src, si no se encuentra la carpeta o el archivo debe crearlo

:warning: Recuerde que no se almacena en el registro de git por motivos seguridad

## :construction_worker: Diagrama basico

Esta bastante simplificado pero asi esta funcionando ahora mismo las rutas con authentificacion.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant Middleware
    participant RouteHandler

    Client->>Server: Enviar petición HTTP
    Server->>Middleware: Pasa al Middleware
    Middleware->>Middleware: Valida la petición
    Middleware-->>Server: Validación OK
    Server->>RouteHandler: Llama al controlador de la ruta
    RouteHandler-->>Server: Responde la petición
    Server-->>Client: Enviar respuesta HTTP
```

## JWT

Sitio web donde puede debug el token, recuerde que para validar la autenticidad del token debe usar **JWT_SECRET** definida en el archivo **.env**
<https://jwt.io/>

> :book: **Recuerde que este token probablemente este vencido por la fecha de creacion.**

JWT de ejemplo.

```text

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiVGVhY2hlciIsIlN0dWRlbnQiXSwiaWF0IjoxNzMyNzQzMDk2LCJleHAiOjE3MzI3NTAyOTZ9.XbsGPeXW7vmg0vRdUac1HjBtJC975e2AOHty6FOSas8
```

## :lion: Sql Utilizada

Igualmente el ultimo update de la DB se encuentra en el archivo DB.sql (este archivo contiene algunos datos (estan al final))

>:book: Falta crear un archivo seeds.sql que contenga datos de prueba.

```sql
DROP DATABASE IF EXISTS courses;
CREATE DATABASE IF NOT EXISTS courses;
USE courses;


CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    role ENUM('student', 'teacher', 'admin') NOT NULL DEFAULT 'student',
    data_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) DEFAULT 0.00,
    date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    username_id INT,
    FOREIGN KEY (username_id) REFERENCES user(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS student_course(
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    user_id INT,
    date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state ENUM('active', 'completed', 'pending') DEFAULT 'pending',
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);



-- Insertar datos de ejemplo en la tabla de usuarios (user)
INSERT INTO user (first_name, last_name, email, username, password, role) VALUES
('John', 'Doe', 'john.doe@example.com', 'johndoe', 'password123', 'student'),
('Jane', 'Smith', 'jane.smith@example.com', 'janesmith', 'password456', 'teacher'),
('Alex', 'Johnson', 'alex.johnson@example.com', 'alexjohnson', 'password789', 'admin');

-- Insertar datos de ejemplo en la tabla de cursos (course)
INSERT INTO course (title, description, price, username_id) VALUES
('Intro to Programming', 'Learn the basics of programming with Python.', 49.99, 2), -- Profesor es Jane (id=2)
('Advanced Web Development', 'Master modern web development with React and Node.js.', 99.99, 2); -- Profesor es Jane (id=2)

-- Insertar datos de ejemplo en la tabla de inscripciones de estudiantes a cursos (student_course)
INSERT INTO student_course (course_id, user_id, state) VALUES
(1, 1, 'active'), -- John (id=1) inscrito en el curso 'Intro to Programming'
(2, 1, 'pending'), -- John (id=1) inscrito en el curso 'Advanced Web Development'
(1, 3, 'completed'); -- Alex (id=3) inscrito en el curso 'Intro to Programming'


-- CREATE TABLE IF NOT EXISTS comentario_curso ( 
--    id INT AUTO_INCREMENT PRIMARY KEY,
--    curso_id INT,
--    usuario_id INT,
--    comentario TEXT,
--    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
--    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    FOREIGN KEY (curso_id) REFERENCES curso(id) ON DELETE CASCADE,
--    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
-- );

```

temp new database model

```sql
-- MySQL Script generated by MySQL Workbench
-- Wed Nov 27 11:37:13 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema courses
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `courses` ;

-- -----------------------------------------------------
-- Schema courses
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `courses` ;
USE `courses` ;

-- -----------------------------------------------------
-- Table `courses`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`user` ;

CREATE TABLE IF NOT EXISTS `courses`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username` (`username` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4;


-- -----------------------------------------------------
-- Table `courses`.`course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`course` ;

CREATE TABLE IF NOT EXISTS `courses`.`course` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `teacher_user_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `meet` TEXT NOT NULL,
  `create_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `username_id` (`teacher_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_course_user`
    FOREIGN KEY (`teacher_user_id`)
    REFERENCES `courses`.`user` (`user_id`)
    ON DELETE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 3;


-- -----------------------------------------------------
-- Table `courses`.`student_course_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`student_course_status` ;

CREATE TABLE IF NOT EXISTS `courses`.`student_course_status` (
  `student_course_status_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`student_course_status_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `courses`.`student_has_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`student_has_course` ;

CREATE TABLE IF NOT EXISTS `courses`.`student_has_course` (
  `student_has_course_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `status_id` INT UNSIGNED NOT NULL,
  `course_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`student_has_course_id`),
  INDEX `course_id` (`course_id` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `fk_student_has_course_student_course_status1_idx` (`status_id` ASC) VISIBLE,
  CONSTRAINT `student_course_ibfk_1`
    FOREIGN KEY (`course_id`)
    REFERENCES `courses`.`course` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `student_course_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `courses`.`user` (`user_id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_student_has_course_student_course_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `courses`.`student_course_status` (`student_course_status_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4;


-- -----------------------------------------------------
-- Table `courses`.`course_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`course_status` ;

CREATE TABLE IF NOT EXISTS `courses`.`course_status` (
  `course_status_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `course_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`course_status_id`),
  INDEX `fk_course_status_course1_idx` (`course_id` ASC) VISIBLE,
  CONSTRAINT `fk_course_status_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `courses`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `courses`.`accesibility_themes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`accesibility_themes` ;

CREATE TABLE IF NOT EXISTS `courses`.`accesibility_themes` (
  `idaccesibility_themes` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idaccesibility_themes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `courses`.`accesibility`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`accesibility` ;

CREATE TABLE IF NOT EXISTS `courses`.`accesibility` (
  `accesibility_id` INT NOT NULL AUTO_INCREMENT,
  `user_user_id` INT UNSIGNED NOT NULL,
  `accesibility_themes_idaccesibility_themes` INT NOT NULL,
  `font_size` INT NOT NULL,
  PRIMARY KEY (`accesibility_id`),
  INDEX `fk_accesibility_accesibility_themes1_idx` (`accesibility_themes_idaccesibility_themes` ASC) VISIBLE,
  INDEX `fk_accesibility_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_accesibility_accesibility_themes1`
    FOREIGN KEY (`accesibility_themes_idaccesibility_themes`)
    REFERENCES `courses`.`accesibility_themes` (`idaccesibility_themes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_accesibility_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `courses`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `courses`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`role` ;

CREATE TABLE IF NOT EXISTS `courses`.`role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `courses`.`user_role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`user_role` ;

CREATE TABLE IF NOT EXISTS `courses`.`user_role` (
  `user_user_id` INT UNSIGNED NOT NULL,
  `role_role_id` INT NOT NULL,
  PRIMARY KEY (`user_user_id`, `role_role_id`),
  INDEX `fk_user_has_role_role1_idx` (`role_role_id` ASC) VISIBLE,
  INDEX `fk_user_has_role_user1_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_role_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `courses`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_role_role1`
    FOREIGN KEY (`role_role_id`)
    REFERENCES `courses`.`role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `courses`.`Notas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`Notas` ;

CREATE TABLE IF NOT EXISTS `courses`.`Notas` (
  `Notas_id` INT NOT NULL,
  `nota` INT NOT NULL,
  `identify_note` TINYINT(1) NOT NULL DEFAULT CHECK(identify_note BETWEN 1 AND 9),
  PRIMARY KEY (`Notas_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `courses`.`Notas_has_student_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `courses`.`Notas_has_student_course` ;

CREATE TABLE IF NOT EXISTS `courses`.`Notas_has_student_course` (
  `Notas_Notas_id` INT NOT NULL,
  `student_course_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`Notas_Notas_id`, `student_course_id`),
  INDEX `fk_Notas_has_student_course_student_course1_idx` (`student_course_id` ASC) VISIBLE,
  INDEX `fk_Notas_has_student_course_Notas1_idx` (`Notas_Notas_id` ASC) VISIBLE,
  CONSTRAINT `fk_Notas_has_student_course_Notas1`
    FOREIGN KEY (`Notas_Notas_id`)
    REFERENCES `courses`.`Notas` (`Notas_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Notas_has_student_course_student_course1`
    FOREIGN KEY (`student_course_id`)
    REFERENCES `courses`.`student_has_course` (`student_has_course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `courses`;

DELIMITER $$

USE `courses`$$
DROP TRIGGER IF EXISTS `courses`.`course_AFTER_INSERT` $$
USE `courses`$$
CREATE DEFINER = CURRENT_USER TRIGGER `courses`.`course_AFTER_INSERT` AFTER INSERT ON `course` FOR EACH ROW
BEGIN
 IF EXISTS (
   SELECT 1
   FROM student_course
   WHERE student_course.course_id = NEW.id
   AND student_course.user_id = NEW.teacher_user_id
  ) THEN
   SIGNAL SQLSTATE '45000'
   SET MESSAGE_TEXT = 'El usuario no puede ser profesor porque ya está inscrito como estudiante en este curso.';
  END IF;
END;$$


USE `courses`$$
DROP TRIGGER IF EXISTS `courses`.`course_AFTER_UPDATE` $$
USE `courses`$$
CREATE DEFINER = CURRENT_USER TRIGGER `courses`.`course_AFTER_UPDATE` AFTER UPDATE ON `course` FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM student_has_course
        WHERE student_has_course.course_id = NEW.id
        AND student_has_course.user_id = NEW.teacher_user_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El usuario no puede ser profesor porque ya está inscrito como estudiante en este curso.';
    END IF;
END$$


USE `courses`$$
DROP TRIGGER IF EXISTS `courses`.`student_has_course_AFTER_INSERT` $$
USE `courses`$$
CREATE DEFINER = CURRENT_USER TRIGGER `courses`.`student_has_course_AFTER_INSERT` AFTER INSERT ON `student_has_course` FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM course
        WHERE course.id = NEW.course_id
        AND course.teacher_user_id = NEW.user_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El usuario no puede ser estudiante porque ya es profesor de este curso.';
    END IF;
END$$


USE `courses`$$
DROP TRIGGER IF EXISTS `courses`.`student_has_course_AFTER_UPDATE` $$
USE `courses`$$
CREATE DEFINER = CURRENT_USER TRIGGER `courses`.`student_has_course_AFTER_UPDATE` AFTER UPDATE ON `student_has_course` FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM course
        WHERE course.id = NEW.course_id
        AND course.teacher_user_id = NEW.user_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El usuario no puede ser estudiante porque ya es profesor de este curso.';
    END IF;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```
