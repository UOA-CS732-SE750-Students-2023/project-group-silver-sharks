import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

let socket;

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    // TODO: replace with your server url
    socket = io("http://localhost:3000");

    socket.on("chat message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (receiverId) {
      axios
        .get(`/message/${receiverId}`, { withCredentials: true })
        .then((response) => {
          setMessages(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [receiverId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      axios
        .post(
          "/message",
          { content: message, receiverId },
          { withCredentials: true }
        )
        .then((response) => {
          socket.emit("chat message", response.data);
          setMessage("");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      <input
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        placeholder="Receiver ID"
      />

      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <h4>{message.senderId === "118069059652555688591" ? "You" : message.senderId}</h4>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
