const db = require("../config/db");

// Get all events
exports.getEvents = (req, res) => {
  db.query("SELECT * FROM calendar_events", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Create new event
exports.createEvent = (req, res) => {
  const { title, start, end, description } = req.body;
  db.query(
    "INSERT INTO calendar_events (title, start, end, description) VALUES (?, ?, ?, ?)",
    [title, start, end, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, title, start, end, description });
    }
  );
};

// Update event
exports.updateEvent = (req, res) => {
  const { id } = req.params;
  const { title, start, end, description } = req.body;
  db.query(
    "UPDATE calendar_events SET title=?, start=?, end=?, description=? WHERE id=?",
    [title, start, end, description, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Event Updated" });
    }
  );
};

// Delete event
exports.deleteEvent = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM calendar_events WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Event Deleted" });
  });
};
