import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Initialize socket
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  // Join the room
  useEffect(() => {
    if (socket) {
      socket.emit("join", { userId: "118069059652555688591" });
    }
  }, [socket]);

  // Listen for new private messages
  useEffect(() => {
    if (socket) {
      socket.on("new private message", (newMessage) => {
        setMessages((messages) => [...messages, newMessage]);
      });

      return () => socket.off("new private message");
    }
  }, [socket]);

  // Send a private message
  const sendMessage = () => {
    if (socket) {
      socket.emit("private message", {
        content: message,
        senderId: "118069059652555688591",
        receiverId: "115597168327745249591",
      });
      setMessage("");
    }
  };

  return (
    <div>
      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      {messages.map((msg, index) => (
        <p key={index}>{msg.content}</p>
      ))}
    </div>
  );
};

export default Chat;
