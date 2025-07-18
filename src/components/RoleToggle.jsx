
import React from "react";

const RoleToggle = ({ role, setRole }) => {
  return (
    <div className="mb-4 flex-menu items-center gap-4">
      <label className="font-semibold">Select Role:</label>
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="student">Student</option>
        <option value="tutor">Tutor</option>
      </select>
    </div>
  );
};

export default RoleToggle;
