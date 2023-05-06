import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./MessagesLayout.css";
import ChatHolder from "./ChatHolder"; // Add this import at the top

const MessagesLayout = ({ rooms, ownUsername, otherUsername }) => {
  const [messagesData, setMessagesData] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const chatWindows = useRef([]);
  const tabLinks = useRef([]);

  useEffect(() => {
    Promise.all(
      rooms.map((room) =>
        fetch(`http://localhost:3000/chat/rid/${room._id}/messages`)
          .then((response) => response.json())
          .then((data) => ({
            _id: room._id,
            receiver: otherUsername.find(
              (usernameObj) => usernameObj.roomId === room._id
            ).otherId,
            messages: data.messages.map((message) => ({
              _id: message._id,
              message: message.content,
              date: new Date(message.createdAt).toLocaleString(),
              sentByUser: message.senderId === ownUsername.loggedInId,
            })),
          }))
      )
    ).then((allData) => {
      setMessagesData(allData);
    });
  }, [rooms, otherUsername, ownUsername.loggedInId]);

  useLayoutEffect(() => {
    if (messagesData.length > 0) {
      openChatWindow(0, messagesData[0]._id);
    }
  }, [messagesData]);

  const openChatWindow = (index, roomId) => {
    chatWindows.current.forEach(
      (chatWindow) => (chatWindow.style.display = "none")
    );
    tabLinks.current.forEach((tablink) => tablink.classList.remove("active"));
    chatWindows.current[index].style.display = "block";
    tabLinks.current[index].classList.add("active");

    setActiveRoom(roomId); // Set the active room to the roomId passed
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
            />
          )}
        </div>
      ))}
    </>
  );
};

export default MessagesLayout;
