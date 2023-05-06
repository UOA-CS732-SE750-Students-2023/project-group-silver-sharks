import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./MessagesLayout.css";
import ChatHolder from "./ChatHolder"; // Add this import at the top

const MessagesLayout = ({ rooms, ownUsername, otherUsername }) => {
  const [messagesData, setMessagesData] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const chatWindows = useRef([]);
  const tabLinks = useRef([]);

  useEffect(() => {
    fetchAllRoomsMessages();
  }, [rooms, otherUsername, ownUsername.loggedInId]);

  const fetchMessages = async (roomId) => {
    const response = await fetch(
      `http://localhost:3000/chat/rid/${roomId}/messages`
    );
    const data = await response.json();

    return {
      _id: roomId,
      receiver: otherUsername.find(
        (usernameObj) => usernameObj.roomId === roomId
      ).otherId,
      messages: data.messages.map((message) => ({
        _id: message._id,
        message: message.content,
        date: new Date(message.createdAt).toLocaleString(),
        sentByUser: message.senderId === ownUsername.loggedInId,
      })),
    };
  };

  const fetchAllRoomsMessages = async () => {
    const allData = await Promise.all(
      rooms.map((room) => fetchMessages(room._id))
    );
    setMessagesData(allData);
  };

  const openChatWindow = async (index, roomId) => {
    // Fetch messages for the roomId when switching tabs
    const newMessagesData = await fetchMessages(roomId);
    setMessagesData((prevData) =>
      prevData.map((chat) => (chat._id === roomId ? newMessagesData : chat))
    );

    chatWindows.current.forEach(
      (chatWindow) => (chatWindow.style.display = "none")
    );
    tabLinks.current.forEach((tablink) => tablink.classList.remove("active"));
    chatWindows.current[index].style.display = "block";
    tabLinks.current[index].classList.add("active");

    setActiveRoom(roomId); // Set the active room to the roomId passed
  };

  const updateMessagesData = (roomId, messageData) => {
    setMessagesData((prevData) =>
      prevData.map((chat) =>
        chat._id === roomId
          ? { ...chat, messages: [...chat.messages, messageData] }
          : chat
      )
    );
  };

  return (
    <>
      <div className="tab">
        {rooms.map((room, index) => (
          <button
            key={room._id}
            ref={(tab) => (tabLinks.current[index] = tab)}
            id={room._id}
            className="tablinks"
            style={{ color: "black" }}
            onClick={() => openChatWindow(index, room._id)}
          >
            {otherUsername[index].otherUsername}
          </button>
        ))}
      </div>

      {messagesData.map((chat, index) => (
        <div key={chat._id}>
          <div
            ref={(chatWindow) => (chatWindows.current[index] = chatWindow)}
            id={chat._id + "-" + index}
            className="tabcontent"
            style={{ display: "none", overflow: "auto", maxHeight: "500px" }}
          >
            {chat.messages.map((singleMessage, index) => (
              <>
                {singleMessage.sentByUser ? (
                  <div key={index} style={{ textAlign: "left" }}>
                    <p style={{ fontSize: "15px" }}>{singleMessage.message}</p>
                    <p style={{ fontSize: "10px" }}>{singleMessage.date}</p>
                  </div>
                ) : (
                  <div key={index} style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "15px" }}>{singleMessage.message}</p>
                    <p style={{ fontSize: "10px" }}>{singleMessage.date}</p>
                  </div>
                )}
              </>
            ))}
          </div>
          {activeRoom === chat._id && (
            <ChatHolder
              roomId={chat._id}
              senderId={ownUsername.loggedInId}
              receiverId={chat.receiver}
              updateMessagesData={updateMessagesData}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default MessagesLayout;
