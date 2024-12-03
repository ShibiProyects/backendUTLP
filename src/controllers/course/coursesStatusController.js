const createConnection = require("../../models/db");

module.exports.getAllCourseStatus = async (req, res) => {
    const consult = "SELECT `course_status_id` as course_status_id,`name` as course_name FROM `courses`.`course_status`;";
    const connection = createConnection(); // Crea una nueva conexión

    try {
        connection.query(consult, (err, result) => {
            if (err) {
                console.error("Error ejecutando la consulta:", err.message);
                return res.status(500).json({ error: "Error ejecutando la consulta" });
            }
            if (result.length === 0) {
                return res
                    .status(404)
                    .json({ error: "Not found" });
            }
            res.json(result);
        });
    } catch (err) {
        console.error("Error en el controlador:", err.message);
        res.status(500).json({ error: "Ocurrió un error en el servidor" });
    } finally {
        connection.end((err) => {
            if (err) console.error("Error cerrando la conexión:", err.message);
        });
    }
};

module.exports.getCourseStatusByID = (req, res) => {
    const id = Number(req.params.id);
    console.log(id)
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Bad Request" });
    }

    if (id === 0) {
        return res.status(404).json({ message: "Not found" });
    }

    const consult = "SELECT `course_status_id` as course_status_id,`name` as course_name FROM `courses`.`course_status` AS cs WHERE cs.course_status_id = ?;";
    const connection = createConnection(); // Crea una nueva conexión

    try {
        connection.query(consult, [id], (err, result) => {
            if (err) {
                console.error("Error ejecutando la consulta:", err.message);
                return res.status(500).json({ error: "Error ejecutando la consulta" });
            }
            if (result.length === 0) {
                return res
                    .status(404)
                    .json({ error: "Not found" });
            }
            res.json(result);
        });
    } catch (err) {
        console.error("Error en el controlador:", err.message);
        res.status(500).json({ error: "Ocurrió un error en el servidor" });
    } finally {
        connection.end((err) => {
            if (err) console.error("Error cerrando la conexión:", err.message);
        });
    }
};

module.exports.createCourseStatus = (req,res) => {
    const name = req.body.name;

    if(!name || name.trim().length === 0) {
        return res.status(422).json({ error: "Bad Request" });
    }

    const consult = 'INSERT INTO `courses`. course_status(name) VALUE (?);';
    const connection = createConnection();

    try{
        connection.query(consult, [name], (err, result) => {
             if (err) {
                 console.error("Error ejecutando la consulta:", err.message);
                 return res.status(500).json({error:"Internal server error"});
             }
             return res.status(201).json({ message: "Success create course status" });
        })
    }catch(err){
        console.error(err.message);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports.updateCourseStatus = (req,res) => {
    const id = Number(req.params.id);
    const name = req.body.name;
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Bad Request" });
    }

    if (id === 0) {
        return res.status(404).json({ message: "Not found" });
    }
    if (!name || name.trim().length === 0) {
        return res.status(422).json({ error: "Bad Request" });
    }

    const consult = 'UPDATE `courses`.course_status SET name=? WHERE course_status_id= ?;';
    const connection = createConnection();

    try{
        connection.query(consult, [name,id], (err, result) => {
            if (err) {
                console.error("Error ejecutando la consulta:", err.message);
                return res.status(500).json({error:"Internal server error"});
            }
            return res.status(201).json({ message: "Success update course status" });
        })
    }catch(err){
        console.error(err.message);
        res.status(500).json({error: "Internal server error"});
    }


}