import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./MessagesLayout.css";
import ChatHolder from "./ChatHolder"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faRetweet } from "@fortawesome/free-solid-svg-icons"; 


const MessagesLayout = ({ rooms, ownUsername, otherUsername }) => {
  const [messagesData, setMessagesData] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const chatWindows = useRef([]);
  const tabLinks = useRef([]);
  const previewRef = useRef(null);
  /* let isFirstClick = true; */
  // let aaaa=false;
  const chatWindowRef = useRef(null);
  const [activeUsernames, setActiveUsernames] = useState({});
  const [isFirstClick, setIsFirstClick] = useState(true);


  
  useEffect(() => {
    fetchAllRoomsMessages();
  }, [rooms, otherUsername, ownUsername.loggedInId]);

  useEffect(() => {
    // Find the index of the current active chat window in the messagesData array
    const activeIndex = messagesData.findIndex(chat => chat._id === activeRoom);

    // Check if the index is valid
    if (activeIndex !== -1) {
        // Ensure that chatWindows.current[activeIndex] exists
        if (chatWindows.current[activeIndex]) {
            // Scroll to the bottom
            chatWindows.current[activeIndex].scrollTop = chatWindows.current[activeIndex].scrollHeight;
        }
    }
  }, [messagesData, activeRoom]); // Trigger this useEffect when messagesData or activeRoom changes




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

  const refreshChatHandler = () => {
    fetchAllRoomsMessages();
  }

  const openChatWindow = async (index, roomId) => {
   
    if (isFirstClick){
      // change the display of the preview element to none 
      previewRef.current.style.display = "none";
      setIsFirstClick(false);
    }
    
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
    setActiveUsernames(prevUsernames => ({
      ...prevUsernames,
      [roomId]: otherUsername[index].otherUsername,
    })
  );
    // Scroll to the bottom of the chat window
    setTimeout(() => {
      chatWindows.current[index].scrollTop = chatWindows.current[index].scrollHeight;
    }, 0);
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

  const displayDate = (date) => {
    // Convert the date string to a Date object
    const newDate = new Date(date);
    if(isNaN(newDate)) return null; // check if date is valid
    // Return the formatted date string
    return `${newDate.getDate().toString().padStart(2, "0")}/${(newDate.getMonth() + 1).toString().padStart(2, "0")}/${newDate.getFullYear().toString().slice(-2)}`;
  };
  
  const isNewDay = (currentDate, prevDate) => {
    const current = new Date(currentDate);
    const previous = new Date(prevDate);
  
    // Compare the day, month, and year of the current and previous dates
    return current.getDate() !== previous.getDate() ||
      current.getMonth() !== previous.getMonth() ||
      current.getFullYear() !== previous.getFullYear();
  };
  
  const getLastMessage = (roomId) => {
    const chat = messagesData.find((chat) => chat._id === roomId);
    if (!chat || chat.messages.length === 0) {
      return "";
    }
    const lastMessage = chat.messages[chat.messages.length - 1].message;
    const maxLength = 25;
    // Truncate the message if it exceeds the maximum length
    return lastMessage.length > maxLength
      ? lastMessage.slice(0, maxLength) + "..."
      : lastMessage;
  };

  const getLastMessageDate = (roomId) => {
    const chat = messagesData.find((chat) => chat._id === roomId);
    if (!chat || chat.messages.length === 0) {
      return "";
    }
    const lastMessageDate = new Date(chat.messages[chat.messages.length - 1].date);
  
    const isToday = (date) => {
      const today = new Date();
      // Compare the day, month, and year of the date with the current day, month, and year
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };
  
    // Format the date string based on whether it is today or not
    return isToday(lastMessageDate)
      ? lastMessageDate.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      : displayDate(lastMessageDate);
  };
  
  

  return (
    <>
      <div className="messages-container">
        <div className="header">
          <h3>Direct messages</h3>
        </div>
        <div className="chat-area">
          <div className="tab" style={{ overflow: "auto", maxHeight: "700px" }}>
            {rooms.map((room, index) => (
              <button
                key={room._id}
                ref={(tab) => (tabLinks.current[index] = tab)}
                id={room._id}
                className="tablinks"
                style={{ color: "black" }}
                onClick={() => openChatWindow(index, room._id)}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    {otherUsername[index].otherUsername}
                    <br />
                    <span style={{ color: "#616161", fontSize: "14px", fontWeight: "400", }}>
                      {getLastMessage(room._id)}
                    </span>
                  </div>
                  <div style={{ color: "#616161", fontSize: "14px", alignSelf: "center", fontWeight: "400", }} className="last-message-date">
                    {getLastMessageDate(room._id)}
                  </div>
                </div>
              </button>
            ))}
           
          </div>


          {!isFirstClick && (
            <div ref={chatWindowRef} className="tabcontent">
              {messagesData.map((chat, index) => (
                <div key={chat._id} style={{position: "relative"}}>
                    {activeRoom === chat._id && (
                      <div
                        className="activeUsernames-div"
                        style={{ position: "absolute", top: "-80px", left: 0, fontWeight: "bold", fontSize: "18px", backgroundColor: "white", width: "100%", padding: "10px", zIndex: 1,}}
                      >
                        {activeUsernames[chat._id]}
                      </div>
                    )}  
                  <div
                    ref={(chatWindow) => (chatWindows.current[index] = chatWindow)}
                    id={chat._id + "-" + index}
                    className="m-messagebox"
                  >
                    {chat.messages.map((singleMessage, index) => (
                      <>
                        {(index === 0 || isNewDay(singleMessage.date, chat.messages[index - 1].date)) && displayDate(singleMessage.date) && (
                          <p style={{ textAlign: "center", color: "#616161" }}>{displayDate(singleMessage.date)}</p>
                        )}
                        {singleMessage.sentByUser ? (
                          <div key={index} className="message-container" style={{ alignItems: 'flex-end' }}>
                            <p style={{ fontSize: "15px", backgroundColor: "#4368C9", color: "white", borderRadius: "15px 0px 15px 15px", padding: "10px", display: "inline-block" }}>{singleMessage.message}</p>
                            <p style={{ fontSize: "10px", color: "#616161", display: "inline" }}>&nbsp;{singleMessage.date}</p>
                          </div>
                        ) : (
                          <div key={index} className="message-container">
                            <p style={{ fontSize: "15px", backgroundColor: "#EAEAEA", color: "black", borderRadius: "0px 15px 15px 15px", padding: "10px", display: "inline-block" }}>{singleMessage.message}</p>
                            <p style={{ fontSize: "10px", color: "#616161", display: "inline" }}>&nbsp;{singleMessage.date}</p>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                  {activeRoom === chat._id && (
                    <div className="chatHolder-actions-container">
                      <ChatHolder
                        roomId={chat._id}
                        senderId={ownUsername.loggedInId}
                        receiverId={chat.receiver}
                        updateMessagesData={updateMessagesData}
                      />
                      <div className="actions">
                        <FontAwesomeIcon
                          icon={faRetweet}
                          onClick={refreshChatHandler}
                          className="action-icon"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          { isFirstClick && (
            <div ref={previewRef} className="preview">
              <h3>Click on a chat to get started.</h3>
            </div>
          )}
          
        </div>
        
      </div>
    </>
  );
  
};

export default MessagesLayout;
