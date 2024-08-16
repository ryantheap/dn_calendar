import React from "react";
import { constructCalendar } from "./utils/calendar/calendar";
import THead from "./Components/Calendar/THead";
import { useEffect, useRef, useState } from "react";
import TBody from "./Components/Calendar/TBody";

export default function Calendar({
  showType,
  currentDay,
  timeInterval,
  timeRange,
  eventsList,
  eventClick,
}) {
  const [calendarDatas, setCalendarDatas] = useState({}); // Datas du calendrier à afficher

  // Récupération des dates slots
  useEffect(() => {
    const calendar = constructCalendar(
      currentDay,
      showType,
      timeInterval,
      timeRange,
      eventsList
    );
    setCalendarDatas(calendar);
  }, [showType, currentDay, timeInterval]);
  const tableRef = useRef(null);
  return (
    calendarDatas?.datesList &&
    calendarDatas?.timesList && (
      <table
        ref={tableRef}
        className={`dn-calendar dnc-interval-${timeInterval}`}
      >
        <THead calendarDatas={calendarDatas} />
        <TBody
          tableRef={tableRef}
          calendarDatas={calendarDatas}
          timeInterval={timeInterval}
          eventClick={eventClick}
        />
      </table>
    )
  );
}
