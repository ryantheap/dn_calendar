import moment from "moment";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

export default function TBody({
  calendarDatas,
  tableRef,
  timeInterval,
  eventClick,
}) {
  const [today, setToday] = useState(moment().format("DD/MM/YYYY"));
  const [currentBorderSpicing, setCurrentBorderSpicing] = useState("0px");

  // Récupération du border spacing du tableau
  useEffect(() => {
    if (tableRef.current) {
      const computedStyle = window.getComputedStyle(tableRef.current);
      const spacing = computedStyle.getPropertyValue("border-spacing");
      setCurrentBorderSpicing(spacing.split(" ")[1]);
    }
  }, []);
  return (
    <tbody>
      {calendarDatas.timesList.map((time) => (
        <tr>
          <td>{time.time}</td>
          {time.elements.map((element) => (
            <td
              className={`relative ${
                today === element.date ? "dnc-today" : ""
              }`}
            >
              {element?.events?.length
                ? element.events.map((event) => (
                    <EventCard
                      event={event}
                      timeInterval={timeInterval}
                      currentBorderSpicing={currentBorderSpicing}
                      timeStart={time.time}
                      eventClick={eventClick}
                    />
                  ))
                : ""}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
