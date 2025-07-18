
import React from "react";
import SlotCell from "./SlotCell";
import { format, addDays } from "date-fns";

const Calendar = ({
  role,
  bookings,
  onBook,
  timeSlots,
  currentWeekStart,
  onNextWeek,
  onPrevWeek,
}) => {
  const weekDates = [...Array(5)].map((_, i) => addDays(currentWeekStart, i));

  const handleSlotClick = (date, time) => {
    if (role === "student") {
      const name = prompt("Enter your name:");
      const subject = prompt("Enter subject:");
      if (name && subject) {
        onBook(format(date, "yyyy-MM-dd"), time, name, subject);
      }
    }
  };

  const renderSlot = (date, time) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const booking = bookings.find(b => b.date === dateStr && b.time === time);

    return (
      <SlotCell
        key={dateStr + time}
        role={role}
        booking={booking}
        onClick={() => handleSlotClick(date, time)}
      />
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onPrevWeek} className="px-4 py-1 bg-gray-200 rounded">← Previous</button>
        <h2 className="text-xl font-semibold">
          Week of {format(currentWeekStart, "MMM dd, yyyy")}
        </h2>
        <button onClick={onNextWeek} className="px-4 py-1 bg-gray-200 rounded">Next →</button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Time</th>
            {weekDates.map(date => (
              <th key={date} className="border p-2">
                {format(date, "EEE, MMM dd")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(time => (
            <tr key={time}>
              <td className="border p-2">{time}</td>
              {weekDates.map(date => renderSlot(date, time))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
