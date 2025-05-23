import React, { useEffect, useState } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import axios from "axios";
import { Header } from "../components";

const Kanban = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch Tasks from Backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/kanban");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  // Add, Update, Delete Tasks
  const onActionComplete = async (args) => {
    if (args.requestType === "cardCreated") {
      await axios.post(
        "http://localhost:5000/api/kanban",
        args.addedRecords[0]
      );
    } else if (args.requestType === "cardChanged") {
      await axios.put(
        `http://localhost:5000/api/kanban/${args.changedRecords[0].id}`,
        args.changedRecords[0]
      );
    } else if (args.requestType === "cardRemoved") {
      await axios.delete(
        `http://localhost:5000/api/kanban/${args.deletedRecords[0].id}`
      );
    }
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Kanban Board" />
      <KanbanComponent
        id="kanban"
        keyField="status"
        dataSource={tasks}
        cardSettings={{ contentField: "description", headerField: "title" }}
        actionComplete={onActionComplete}
      >
        <ColumnsDirective>
          <ColumnDirective headerText="To Do" keyField="To Do" />
          <ColumnDirective headerText="In Progress" keyField="In Progress" />
          <ColumnDirective headerText="Done" keyField="Done" />
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};

export default Kanban;
