import React, { useState } from "react";
import axios from "axios";

const AddEmployeeForm = ({ fetchEmployees }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Title: "",
    HireDate: "",
    Country: "",
    ReportsTo: "",
    EmployeeImage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employees", formData);
      fetchEmployees();
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

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="Name"
        value={formData.Name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        name="Title"
        value={formData.Title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="date"
        name="HireDate"
        value={formData.HireDate}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        name="Country"
        value={formData.Country}
        onChange={handleChange}
        placeholder="Country"
        required
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        name="ReportsTo"
        value={formData.ReportsTo}
        onChange={handleChange}
        placeholder="Reports To"
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        name="EmployeeImage"
        value={formData.EmployeeImage}
        onChange={handleChange}
        placeholder="Employee Image URL"
        className="border p-2 rounded w-full mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployeeForm;
