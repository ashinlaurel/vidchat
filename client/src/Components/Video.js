import React, { useEffect, useState ,useMemo} from "react";
import Peer from "peerjs";
let randID = Math.random().toString(36).substring(7);
// console.log("random", r);
const peer = new Peer(randID,{
  host: "localhost",
  port: 3001,
  path: "/peerjs/myapp",
});

export default function Video() {
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [lid, setLid] = useState("");
  const [rid, setRid] = useState("");
  const initialise = () => {
    
    let video = document.getElementById("Lvideo");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        video.srcObject = stream;
        setLocalStream(stream);
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
    let width = 320;
    let height = (video.videoHeight / video.videoWidth) * width;
    video.setAttribute("width", width);
    video.setAttribute("height", height);
  };
  const Connection = () => {
    peer.on("connection", (conn) => {
      conn.on("open", function () {
        // Receive messages
        conn.on("data", function (data) {
          console.log("Received from sendee", data);
        });

        // Send messages
        conn.send("Hello!");
      });
    });
    let video = document.getElementById("Rvideo");
    let localvideo = document.getElementById("Lvideo");
    peer.on("call", function (call) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((lstream) => {
          call.answer(lstream);
          call.on("stream", (stream) => {
            video.srcObject = stream;
            
            video.play();
          });
        });
      // Answer the call, providing our mediaStream
    });
  };
  const peerConnect = () => {
    let conn = peer.connect(rid);
    conn.on("open", function () {
      // Receive messages
      conn.on("data", function (data) {
        console.log("Received", data);
      });

      // Send messages
      conn.send("Hola!");
    });
    let video = document.getElementById("Rvideo");
    var call = peer.call(rid, localStream);
    call.on("stream", (stream) => {
      console.log("callee vidoe");
      video.srcObject = stream;
      let width = 320;
    let height = (video.videoHeight / video.videoWidth) * width;
    video.setAttribute("width", width);
    video.setAttribute("height", height);
      
      video.play();
    });
  };
  useEffect(() => {
    
    // console.log(peer);
    initialise();
    setLid(randID);
    peer.on("open", function (id) {
      console.log("My peer ID is: " + id);
      
    })
    Connection();
  }, []);
  // useEffect(() => {
  //   []);

  // })
  return (
    <div className="bg-white container mx-auto rounded-lg overflow-hidden ">
      <div className=" bg-blue-500 text-gray-100 text-5xl text-center ">
        Video Chat
      </div>
      <div className="py-5 text-center">
        <label className="mr-3 text-gray-600">Enter the other user's ID:</label>
        <input
          className="bg-gray-200 focus:outline-none px-2"
          type="text"
          value={rid}
          onChange={(e) => setRid(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            peerConnect();
          }}
          className="ml-2 bg-blue-500 rounded-sm px-2 text-white focus:outline-none"
          id="startbutton"
        >
          Connect
        </button>
      </div>
      <div class="flex items-center justify-center m-5 ">
        <div
          className="mx-2 w-1/2 border border-black flex flex-col items-center "
          id="myvid"
        >
          <div className="my-2 bg-gray-300 px-2 rounded">Lid:{lid}</div>
          <video className="my-2 rounded" id="Lvideo">
            Video stream not available.
          </video>
        </div>
        <div
          id="othervid"
          className="mx-2 border border-black w-1/2 flex flex-col items-center"
        >
          <div className="my-2 bg-gray-300 px-2 rounded">Rid:{rid}</div>
          <video className="my-2 rounded" id="Rvideo">
            Video stream not available.
          </video>
        </div>
      </div>
    </div>
  );
}
