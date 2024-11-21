const connection = require("../../models/db");

module.exports.register = (req, res) => {
  const { first_name, last_name, email, username, password, role } = req.body;

  const consult = `INSERT INTO user (first_name, last_name, email, username, password, role)
                    VALUES (?, ?, ?, ?, ?, ?);`;

  try {
    connection.query(
      consult,
      [first_name, last_name, email, username, password, role],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .send({ message: "Email or username already exists." });
          }
          return res
            .status(500)
            .send({ message: "Internal server error", error: err });
        }

        return res.status(201).send({
          message: "User registered successfully",
          user: { first_name, last_name, email, username, password, role },
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
