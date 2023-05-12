import React, { useEffect, useState } from "react";
import './Chat.css';
import TelegramIcon from '@mui/icons-material/Telegram';


function Chat({ socket, room, senderId, receiverId, updateMessagesData }) {
  const [currentMessage, setCurrentMessage] = useState("");

  // Define a function to send a message
  const sendMessage = async () => {
    if (currentMessage !== "") {
      // Create a messageData object with the current message content, sender and receiver IDs, and current time
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

      // Emit the send_message event with the messageData object to the server using the socket
      await socket.emit("send_message", messageData);
      // Update the messages data with the message content, date, and sentByUser flag
      updateMessagesData(room, {
        message: messageData.content,
        date: messageData.time,
        sentByUser: true,
      });
       // Reset the currentMessage state to an empty string
      setCurrentMessage("");
    }
  };

  // Add an event listener to the socket to handle incoming messages
  useEffect(() => {
    const handleMessage = (data) => {
      // Update the messages data with the message content, date, and sentByUser flag
      updateMessagesData(room, {
        message: data.content,
        date: data.time,
        sentByUser: senderId === data.senderId,
      });
    };

    // Add the handleMessage function as a listener for the receive_message event on the socket
    socket.on("receive_message", handleMessage);

    // Clean up the event listener when the component is unmounted
    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [socket, room, senderId, updateMessagesData]);

  return (
    <div className="chat-window">
      <div className="chat-footer">
        {/* Add an input field for the user to type in messages */}
        <input
          className="chat-input" //Newly added
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
        <button className="send-button" onClick={sendMessage}><TelegramIcon /></button>
      </div>
    </div>
  );
}

export default Chat;
