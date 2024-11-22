# :construction: :book: Notas de Backend

> :construction_worker: :book: **Todavia no modifico la base de datos por lo que la estructura de las SQL no es valido o no es como se espera**

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

> :book: Recuerde que el archivo se encuentra temporalmente en la carpeta config.

## :lion: Sql Utilizada

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
