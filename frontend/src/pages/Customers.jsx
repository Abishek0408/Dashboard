import React, { useEffect, useState } from "react";
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
import { customersGrid } from "../data/dummy";

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [showForm, setShowForm] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    projectName: "",
    status: "",
    weeks: "",
    budget: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Invalid API response format:", response.data);
          setData([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
        setLoading(false);
      });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/customers", newCustomer)
      .then((response) => {
        setData([...data, response.data]);
        setNewCustomer({
          name: "",
          projectName: "",
          status: "",
          weeks: "",
          budget: "",
        });
      })
      .catch((error) => console.error("Error adding customer:", error));
  };

  const handleDeleteCustomer = (id) => {
    axios
      .delete(`http://localhost:5000/api/customers/${id}`)
      .then(() => {
        setData(data.filter((customer) => customer.id !== id));
      })
      .catch((error) => console.error("Error deleting customer:", error));
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-4 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
      >
        {showForm ? "Close Form" : "Add Customers"}
      </button>

      {/* Add Customer Form */}
      {showForm && (
        <form
          onSubmit={handleAddCustomer}
          className="mb-6 p-4 bg-gray-100 rounded-lg"
        >
          <h2 className="text-lg font-semibold mb-2">Add New Customer</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Customer Name"
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
              required
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Project Name"
              value={newCustomer.projectName}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, projectName: e.target.value })
              }
              required
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Status"
              value={newCustomer.status}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, status: e.target.value })
              }
              required
              className="p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Weeks"
              value={newCustomer.weeks}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, weeks: e.target.value })
              }
              required
              className="p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Budget"
              value={newCustomer.budget}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, budget: e.target.value })
              }
              required
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              value={newCustomer.image}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, image: e.target.value })
              }
              placeholder="Image URL"
              required
              className="p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Customer
          </button>
        </form>
      )}

      {/* Customers Table */}
      <GridComponent
        dataSource={data}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {customersGrid.map((col, index) => (
            <ColumnDirective key={index} {...col} />
          ))}
        </ColumnsDirective>
        <ColumnDirective
          headerText="Actions"
          width="120"
          textAlign="Center"
          template={(props) => (
            <button
              onClick={() => handleDeleteCustomer(props.id)}
              className="px-3 py-1 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          )}
        />

        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default Customers;
