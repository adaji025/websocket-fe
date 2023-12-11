import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="Message..."
        onChange={(event) => setMessage(event.target.value)}
      />{" "}
      <button onClick={sendMessage}>Send a message</button>
      <h1>Message:</h1>
      <div>{messageReceived}</div>
    </div>
  );
}

export default App;
