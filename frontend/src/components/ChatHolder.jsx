import React, { useEffect } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

// Connect to the socket server
const socket = io.connect("http://localhost:3000");

// ChatHolder component, which is used to wrap the chat window component
function ChatHolder({ roomId, senderId, receiverId, updateMessagesData }) {
  const joinRoom = () => {
    if (senderId !== "" && roomId !== "") {
      // Send join_room event to socket server, passing roomId as parameter
      socket.emit("join_room", roomId);
    }
  };

  useEffect(() => {
    if (senderId !== "" && roomId !== "") {
      joinRoom();
    }
  }, [senderId, roomId]);

  return (
    <div className="App">
      <Chat
        socket={socket}
        room={roomId}
        senderId={senderId}
        receiverId={receiverId}
        updateMessagesData={updateMessagesData}
      />
    </div>
  );
}

export default ChatHolder;
