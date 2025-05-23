const db = require("../config/db");

exports.getProjects = (req, res) => {
  db.query("SELECT * FROM Projects", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};
