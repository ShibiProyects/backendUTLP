const createConnection = require("../../models/db");

module.exports.getAllRoles = async (req, res) => {
    const query = `SELECT role_id AS id,name FROM role`
    const connection = await createConnection();

    try{
        connection.query(query, (err, result) => {
            if(err){
                console.error('Error al ejecutar la consulta : ', err);
                return res.status(500).json({error: 'Internal Server Error'});
            }
            console.log(result);
            return res.status(200).json({message: result});
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports.getRoleById = async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Bad Request" });
    }

    if (id === 0) {
        return res.status(404).json({ message: "Not found" });
    }

    const query = `SELECT role_id AS id,name FROM role where role_id=?;`
    const connection = await createConnection();

    try{
        connection.query(query,[id], (err, result) => {
            if(err){
                console.error('Error al ejecutar la consulta : ', err);
                return res.status(500).json({error: 'Internal Server Error'});
            }
            console.log(result);
            return res.status(200).json({message: result});
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}
module.exports.createRole = async (req, res) => {}
module.exports.updateRole = async (req, res) => {}
module.exports.deleteRole = async (req, res) => {}