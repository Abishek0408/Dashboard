const db = require("../config/db");

exports.getExpenses = (req, res) => {
  const sql = "SELECT * FROM expenses";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(result);
  });
};

exports.deleteExpense = (req, res) => {
  const sql = "DELETE FROM expenses WHERE ExpenseID = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete expense" });
    }
    res.json({ message: "Expense deleted successfully" });
  });
};
