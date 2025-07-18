
import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import RoleToggle from "./components/RoleToggle";
import { timeSlots } from "./data/initialData";
import './App.css'

const App = () => {
  const [role, setRole] = useState("student");
  const [bookings, setBookings] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));

  function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay(); // 0 (Sun) to 6 (Sat)
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
    return new Date(d.setDate(diff));
  }

  const handleNextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const handlePrevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
  };

  useEffect(() => {
    fetch("http://localhost:3001/bookings")
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  const handleBooking = async (date, time, name, subject) => {
    const newBooking = { date, time, name, subject };
    const res = await fetch("http://localhost:3001/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    });
    const savedBooking = await res.json();
    setBookings(prev => [...prev, savedBooking]);
  };

  return (
    // <div className="p-6">
    //   <RoleToggle role={role} setRole={setRole} />
    //   <Calendar
    //     role={role}
    //     bookings={bookings}
    //     onBook={handleBooking}
    //     timeSlots={timeSlots}
    //     currentWeekStart={currentWeekStart}
    //     onNextWeek={handleNextWeek}
    //     onPrevWeek={handlePrevWeek}
    //   />
    // </div>
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
  <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
    <RoleToggle role={role} setRole={setRole} />
    <Calendar
      role={role}
      bookings={bookings}
      onBook={handleBooking}
      timeSlots={timeSlots}
      currentWeekStart={currentWeekStart}
      onNextWeek={handleNextWeek}
      onPrevWeek={handlePrevWeek}
    />
  </div>
</div>

  );
};

export default App;
