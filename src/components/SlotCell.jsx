import React from "react";

const SlotCell = ({ role, booking, onClick }) => {
  let cellStyle = "border p-2 text-center cursor-pointer ";
  let content = "";

  if (booking) {
    if (role === "tutor") {
      cellStyle += "bg-red-200";
      content = `${booking.name} (${booking.subject})`;
    } else if (role === "student") {
      cellStyle += "bg-gray-200 cursor-not-allowed";
      content = "Booked";
    }
  } else {
    cellStyle += "bg-green-100 hover:bg-green-200";
    content = "Available";
  }

  return (
    <td className={cellStyle} onClick={!booking ? onClick : undefined}>
      {content}
    </td>
  );
};

export default SlotCell;
