import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import MessageBox from "./MessageBox";
import TopBar from "./Topbar";
import Video from "./Video";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const ENDPOINT = "http://ec2-34-204-95-90.compute-1.amazonaws.com:3001/";
  const ENDPOINT = "http://localhost:3001";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    // return () => {
    //   cleanup;
    // };
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  //   console.log(message);
  console.log(messages);

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-3/4 mx-1 ">
        <Video />
      </div>
      <div className="w-1/4 mx-1 ">
        <div className="bg-white w-full  overflow-hidden rounded">
          <TopBar room={room} />
          <MessageBox messages={messages} />
          {/* Bottom Input////////////////////////////////////////// */}
          <div className="m-2 flex items-center justify-center">
            <input
              value={message}
              className=" bg-gray-200 px-2 w-3/4 focus:outline-none"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
            />
            <button
              className="w-1/4 bg-blue-500 rounded-sm mx-2 text-gray-200 focus:outline-none"
              type="submit"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
