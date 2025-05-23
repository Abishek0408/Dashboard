const express = require("express");
const router = express.Router();
const {
  getExpenses,
  deleteExpense,
} = require("../controllers/expensesController");

router.get("/", getExpenses);
router.delete("/:id", deleteExpense);

module.exports = router;
