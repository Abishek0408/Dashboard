require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/employees", require("./routes/employees"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/calendar", require("./routes/calendar"));
app.use("/api/kanban", require("./routes/kanban"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
