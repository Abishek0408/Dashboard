const db = require("../config/db");

// Get all tasks
exports.getTasks = (req, res) => {
  db.query("SELECT * FROM kanban_tasks", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Create new task
exports.createTask = (req, res) => {
  const { title, status, priority, description } = req.body;
  db.query(
    "INSERT INTO kanban_tasks (title, status, priority, description) VALUES (?, ?, ?, ?)",
    [title, status, priority, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, title, status, priority, description });
    }
  );
};

// Update task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, status, priority, description } = req.body;
  db.query(
    "UPDATE kanban_tasks SET title=?, status=?, priority=?, description=? WHERE id=?",
    [title, status, priority, description, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task Updated" });
    }
  );
};

// Delete task
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM kanban_tasks WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task Deleted" });
  });
};
