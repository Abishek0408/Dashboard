import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { Header } from "../components";

const Expenses = () => {
  const [expensesData, setExpensesData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    ExpenseCategory: "",
    Description: "",
    Amount: "",
    Date: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    axios
      .get("http://localhost:5000/api/expenses")
      .then((response) => setExpensesData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/expenses", newExpense)
      .then((response) => {
        setExpensesData([...expensesData, response.data]);
        setNewExpense({
          ExpenseCategory: "",
          Description: "",
          Amount: "",
          Date: "",
        });
      })
      .catch((error) => console.error("Error adding expense:", error));
  };

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-4 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Expenses" />
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
      >
        {showForm ? "Close Form" : "Add Expenses"}
      </button>

      {/* Add Expense Form */}
      {showForm && (
        <form
          onSubmit={handleAddExpense}
          className="mb-6 p-4 bg-gray-100 rounded-lg"
        >
          <h2 className="text-lg font-semibold mb-2">Add New Expense</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Category"
              value={newExpense.ExpenseCategory}
              onChange={(e) =>
                setNewExpense({
                  ...newExpense,
                  ExpenseCategory: e.target.value,
                })
              }
              required
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Description"
              value={newExpense.Description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, Description: e.target.value })
              }
              required
              className="p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.Amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, Amount: e.target.value })
              }
              required
              className="p-2 border rounded-md"
            />
            <input
              type="date"
              value={newExpense.Date}
              onChange={(e) =>
                setNewExpense({ ...newExpense, Date: e.target.value })
              }
              required
              className="p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Expense
          </button>
        </form>
      )}
      {/* Expenses Table */}
      <GridComponent
        dataSource={expensesData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          <ColumnDirective
            field="ExpenseID"
            headerText="ID"
            width="100"
            textAlign="Center"
            isPrimaryKey={true}
          />
          <ColumnDirective
            field="ExpenseCategory"
            headerText="Category"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            field="Description"
            headerText="Description"
            width="250"
            textAlign="Left"
          />
          <ColumnDirective
            field="Amount"
            headerText="Amount (₹)"
            width="120"
            textAlign="Right"
            format="C2"
          />
          <ColumnDirective
            field="Date"
            headerText="Date"
            width="120"
            textAlign="Center"
            type="date"
            format="yMd"
          />
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Expenses;
