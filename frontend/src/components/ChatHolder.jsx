import React from "react";
import Chat from "./Chat";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const ChatHolder = ({ roomId, senderId, receiverId, onNewMessage }) => {
  return (
    <Chat
      socket={socket}
      room={roomId}
      senderId={senderId}
      receiverId={receiverId}
      onMessageSent={onNewMessage}
    />
  );
};

export default ChatHolder;
