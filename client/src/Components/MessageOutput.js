import React from "react";
import MessageBox from "./MessageBox";

const MessageOutput = ({ user, text }) => {
  return (
    <div className="flex items-center m-2">
      <div className="bg-gray-300 px-2 py-1 rounded">
        <div>{text}</div>
      </div>
      <div className="text-sm mx-2 pt-1">{user}</div>
    </div>
  );
};

export default MessageOutput;
