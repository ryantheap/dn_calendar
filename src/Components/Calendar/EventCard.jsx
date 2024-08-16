import moment from "moment";
import React, { useEffect, useState } from "react";

export default function EventCard({
  event,
  timeStart,
  timeInterval,
  currentBorderSpicing,
  eventClick,
}) {
  const [height, setHeight] = useState("");
  const [top, setTop] = useState("");

  const caseStartTime = moment(
    `${event.start.split(" ")[0]} ${timeStart}:00`,
    "YYYY-MM-DD HH:mm:ss"
  ); // Date & heure du début de la case du tableau

  const eventDateStart = moment(event.start, "YYYY-MM-DD HH:mm:ss"); // Date & heure du début de l'event
  const eventDateEnd = moment(event.start, "YYYY-MM-DD HH:mm:ss").add(
    +event.duration + +event.break,
    "minutes"
  ); // Date & heure de la fin de l'event

  // Calculez la différence en minutes entre les deux dates de l'évent
  const totalMinutes = eventDateEnd.diff(eventDateStart, "minutes");

  //     // Calculez combien de périodes de 30 minutes il y a
  const numberOfPeriods = totalMinutes / timeInterval;
  const minutesFromStart = eventDateStart.diff(caseStartTime, "minutes");

  // Calculez le pourcentage
  const percentage = (minutesFromStart / timeInterval) * 100;

  useEffect(() => {
    const top = percentage > 0 ? `${percentage}%` : 0;

    const height = `calc((100% * ${numberOfPeriods}) + (${currentBorderSpicing} * ${
      numberOfPeriods - 1
    }) ${top !== 0 ? `+ ${currentBorderSpicing}` : ""})`;
    console.log(height);
    setHeight(height);
    setTop(top);
  }, [currentBorderSpicing, timeStart]);
  return (
    currentBorderSpicing &&
    timeStart && (
      <div
        style={{ height: height, top: top, maxHeight: height }}
        className="dnc-event-card"
        onClick={() => eventClick(event)}
      >
        {event.text ? event.text : ""}
      </div>
    )
  );
}
