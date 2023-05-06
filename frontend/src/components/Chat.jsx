import React, { useEffect, useState } from "react";

function Chat({ socket, room, senderId, receiverId, updateMessagesData }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        content: currentMessage,
        senderId: senderId,
        receiverId: receiverId,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      updateMessagesData(room, {
        message: messageData.content,
        date: messageData.time,
        sentByUser: true,
      });
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      updateMessagesData(room, {
        message: data.content,
        date: data.time,
        sentByUser: senderId === data.senderId,
      });
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>►</button>
      </div>
    </div>
  );
}

export default Chat;
