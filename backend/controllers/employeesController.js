const db = require("../config/db");

// Get all employees
exports.getEmployees = (req, res) => {
  const sql = "SELECT * FROM Employees";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Add new employee
exports.addEmployee = (req, res) => {
  const { Name, Title, HireDate, Country, ReportsTo, EmployeeImage } = req.body;
  const sql =
    "INSERT INTO Employees (Name, Title, HireDate, Country, ReportsTo, EmployeeImage) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [Name, Title, HireDate, Country, ReportsTo, EmployeeImage],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee added successfully", id: result.insertId });
    }
  );
};

// Update employee
exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { Name, Title, HireDate, Country, ReportsTo, EmployeeImage } = req.body;
  const sql =
    "UPDATE Employees SET Name = ?, Title = ?, HireDate = ?, Country = ?, ReportsTo = ?, EmployeeImage = ? WHERE EmployeeID = ?";
  db.query(
    sql,
    [Name, Title, HireDate, Country, ReportsTo, EmployeeImage, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee updated successfully" });
    }
  );
};

// Delete employee
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Employees WHERE EmployeeID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee deleted successfully" });
  });
};
