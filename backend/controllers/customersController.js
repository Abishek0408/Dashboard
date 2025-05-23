const db = require("../config/db");

exports.getCustomers = (req, res) => {
  db.query("SELECT * FROM customers", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};
