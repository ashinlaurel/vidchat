import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 h-screen">
      <div className="text-gray-100 text-5xl border-b"> Join </div>
      <div className="py-5">
        <div className="my-2">
          <label className="text-gray-100 mx-1">Name:</label>
          <input
            className="px-1"
            type="text"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label className="text-gray-100 mx-1">Room:</label>
          <input
            className="px-1"
            type="text"
            required
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          ></input>
        </div>
        <div className="my-4  text-center">
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button
              type="submit"
              className="ml-4 text-gray-100 bg-blue-600 hover:bg-blue-500 px-2 rounded-sm focus:outline-none"
            >
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
