import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import { Header } from "../components";

const PropertyPane = ({ children }) => <div className="mt-5">{children}</div>;

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const scheduleRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/calendar");
        setEvents(response.data);
      } catch (error) {
        console.error(
          "Error fetching events:",
          error.response?.data || error.message
        );
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setSelectedDate(new Date()),
      24 * 60 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, []);

  const change = (args) => {
    setSelectedDate(args.value);
    if (scheduleRef.current) {
      scheduleRef.current.selectedDate = args.value;
      scheduleRef.current.dataBind();
    }
  };

  const onDragStart = (arg) => {
    arg.navigation.enable = true;
  };

  const onActionComplete = async (args) => {
    if (args.requestType === "eventCreated") {
      try {
        const newEvent = {
          ...args.data[0],
          Id: args.data[0]?.Id || Date.now(),
        };
        const response = await axios.post(
          "http://localhost:5000/api/calendar",
          newEvent
        );
        setEvents([...events, response.data]);
      } catch (error) {
        console.error(
          "Error adding event:",
          error.response?.data || error.message
        );
      }
    }

    if (args.requestType === "eventRemoved") {
      try {
        const eventId = args.data[0]?.Id;
        if (!eventId) return;
        await axios.delete(`http://localhost:5000/api/calendar/${eventId}`);
        setEvents(events.filter((event) => event.Id !== eventId));
      } catch (error) {
        console.error(
          "Error deleting event:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        height="650px"
        ref={scheduleRef}
        selectedDate={selectedDate}
        eventSettings={{ dataSource: events }}
        dragStart={onDragStart}
        actionComplete={onActionComplete}
      >
        <ViewsDirective>
          {["Day", "Week", "WorkWeek", "Month", "Agenda"].map((item) => (
            <ViewDirective key={item} option={item} />
          ))}
        </ViewsDirective>
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
      <PropertyPane>
        <table style={{ width: "100%", background: "white" }}>
          <tbody>
            <tr style={{ height: "50px" }}>
              <td style={{ width: "100%" }}>
                <DatePickerComponent
                  value={selectedDate}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Calendar;
