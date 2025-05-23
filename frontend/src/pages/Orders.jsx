import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../components";

const Orders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    projectName: "",
    totalAmount: "",
    status: "Pending",
    location: "",
  });

  const statusBgMap = {
    Pending: "bg-yellow-500",
    Completed: "bg-green-500",
    InProgress: "bg-blue-500",
    Canceled: "bg-red-500",
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Invalid API response format:", response.data);
          setError("Invalid API response format.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = {
      projectName: formData.projectName,
      totalAmount: formData.totalAmount,
      status: formData.status,
      statusBg: statusBgMap[formData.status], // Assign statusBg dynamically
      location: formData.location,
    };

    try {
      await axios.post("http://localhost:5000/api/projects", newProject);
      setFormData({
        projectName: "",
        totalAmount: "",
        status: "Pending",
        location: "",
      });
      fetchProjects(); // Refresh the grid
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Projects" />
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
      >
        {showForm ? "Close Form" : "Add Projects"}
      </button>
      {/* Form to Add Projects */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-lg mb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Project Name"
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              placeholder="Total Amount"
              required
              className="p-2 border rounded"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="InProgress">In Progress</option>
              <option value="Canceled">Canceled</option>
            </select>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              required
              className="p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Project
          </button>
        </form>
      )}
      {/* Syncfusion Grid */}
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <GridComponent
          id="gridcomp"
          dataSource={data}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={{ allowDeleting: true, allowEditing: true }}
        >
          <ColumnsDirective>
            {ordersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              Edit,
              PdfExport,
            ]}
          />
        </GridComponent>
      )}
    </div>
  );
};

export default Orders;
