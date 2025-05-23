import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Toolbar,
  Edit,
} from "@syncfusion/ej2-react-grids";
import { GrLocation } from "react-icons/gr";
import { Header } from "../components";

// Employee Grid Configuration
export const employeesGrid = [
  {
    headerText: "Employee",
    width: "150",
    template: (props) => (
      <div className="flex items-center">
        <img
          src={props.EmployeeImage}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-2"
        />
        <span>{props.Name}</span>
      </div>
    ),
    textAlign: "Center",
  },
  { field: "Name", headerText: "", width: "0", textAlign: "Center" },
  {
    field: "Title",
    headerText: "Designation",
    width: "170",
    textAlign: "Center",
  },
  {
    headerText: "Country",
    width: "120",
    textAlign: "Center",
    template: (props) => (
      <div className="flex items-center justify-center gap-2">
        <GrLocation />
        <span>{props.Country}</span>
      </div>
    ),
  },
  {
    field: "HireDate",
    headerText: "Hire Date",
    width: "135",
    format: "yMd",
    textAlign: "Center",
  },
  {
    field: "ReportsTo",
    headerText: "Reports To",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "EmployeeID",
    headerText: "Employee ID",
    width: "125",
    textAlign: "Center",
  },
  {
    field: "KPI_Score",
    headerText: "Performance Score",
    width: "125",
    textAlign: "Center",
  },
];

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Title: "",
    HireDate: "",
    Country: "",
    ReportsTo: "",
    EmployeeImage: "",
  });

  // Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for adding a new employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employees", formData);
      fetchEmployees(); // Refresh data
      setShowForm(false); // Hide form after submission
      setFormData({
        Name: "",
        Title: "",
        HireDate: "",
        Country: "",
        ReportsTo: "",
        EmployeeImage: "",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Handle delete employee
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Employee Management</h1>

        {/* Add Employee Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          {showForm ? "Close Form" : "Add Employee"}
        </button>

        {/* Add Employee Form (Hidden Initially) */}
        {showForm && (
          <form
            onSubmit={handleAddEmployee}
            className="mb-4 p-4 border rounded shadow bg-white"
          >
            <h2 className="text-lg font-semibold mb-2">Add Employee</h2>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
              placeholder="Designation"
              required
            />
            <input
              type="date"
              name="HireDate"
              value={formData.HireDate}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="Country"
              value={formData.Country}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
              placeholder="Country"
              required
            />
            <input
              type="text"
              name="ReportsTo"
              value={formData.ReportsTo}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
              placeholder="Reports To"
            />
            <input
              type="text"
              name="EmployeeImage"
              value={formData.EmployeeImage}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
              placeholder="Image URL"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded w-full"
            >
              Save Employee
            </button>
          </form>
        )}

        {/* Employees Grid Table */}
        <GridComponent
          dataSource={employees}
          allowPaging={true}
          toolbar={["Delete"]}
          editSettings={{ allowDeleting: true }}
          actionComplete={(args) => {
            if (args.requestType === "delete") {
              handleDeleteEmployee(args.data[0].EmployeeID);
            }
          }}
          className="shadow-lg border"
        >
          <ColumnsDirective>
            {employeesGrid.map((col, index) => (
              <ColumnDirective key={index} {...col} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Employees;
