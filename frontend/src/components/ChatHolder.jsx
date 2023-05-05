import React, { useEffect} from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3000");

function ChatHolder({ roomId, senderId, receiverId }) {

  const joinRoom = () => {
    if (senderId !== "" && roomId !== "") {
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
      />
    </div>
  );
}

export default ChatHolder;
