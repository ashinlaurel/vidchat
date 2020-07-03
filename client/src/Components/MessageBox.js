import React from "react";
import MessageOutput from "./MessageOutput";

const MessageBox = ({ messages }) => {
  return (
    <div className="h-64 overflow-y-scroll">
      <div>
        {messages.map((message) => (
          <MessageOutput user={message.user} text={message.text} />
        ))}
      </div>
    </div>
  );
};

export default MessageBox;
