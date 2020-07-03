import React from "react";
const TopBar = ({ room }) => {
  return (
    <div className="h-full p-2 bg-blue-500 text-4xl text-gray-200">
      Room: {room}
    </div>
  );
};

export default TopBar;
