import React, { useState, useEffect } from "react";
import WebcamCapture from "./components/WebcamCapture";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <WebcamCapture />
    </div>
  );
}

export default App;
