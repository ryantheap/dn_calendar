import React from "react";

export default function THead({ calendarDatas }) {
  return (
    <thead>
      <tr>
        <th className="dnc-first-cell"></th>
        {calendarDatas.datesList.map((date) => (
          <th>
            <div>
              <div>{date.short_name}.</div>
              <div>{date.date.slice(0, 5)}</div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
