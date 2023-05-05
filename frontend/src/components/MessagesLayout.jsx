import React, { useRef } from 'react'; 
import './MessagesLayout.css';

const DUMMY_DATA = [
    {   
        _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
        receiver: "Steve",
        messages: [
            {   
                _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
                message: "Hi there friend what are you doing", 
                date: "6/5/2023", 
                sentByUser: true
            },
            {   
                _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
                message: "I am doing fine, hbu?", 
                date: "7/5/2023",
                sentByUser: false
            },
            {   
                _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
                message: "Could be better.", 
                date: "8/5/2023",
                sentByUser: true
            },
        ]
    },
    {   
        _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
        receiver: "Shrek",
        messages: [
            {   
                _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
                message: "hey there friendo", 
                date: "1/5/2023",
                sentByUser: false
            },
            {   
                _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
                message: "Leave me alone or im calling the police.", 
                date: "2/5/2023",
                sentByUser: true
            }
        ]
    },
    {   
        _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
        receiver: "Solomon",
        messages: [
            {   
                _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
                message: "Hey we still on for today?", 
                date: "10/4/2023",
                sentByUser: true

            },
            {   
                _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
                message: "???? ", 
                date: "10/4/2023",
                sentByUser: true
            },
            {   
                _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
                message: "K", 
                date: "10/4/2023",
                sentByUser: true
            },
        ]
    }
]

const MessagesLayout = () => { 
    const chatWindows = useRef([]);
    const tabLinks = useRef([]);

    const openChatWindow = (index) => {
        // Hide all chat windows
        chatWindows.current.forEach(chatWindow => chatWindow.style.display = 'none');
    
        // Remove "active" class from all tab links
        tabLinks.current.forEach(tablink => tablink.classList.remove('active'));
    
        // Show the selected chat window
        chatWindows.current[index].style.display = 'block';
    
        // Add "active" class to the selected tab link
        tabLinks.current[index].classList.add('active');
    }

    return (
        <>  
            <div className="tab">
                {DUMMY_DATA.map((chat, index) => (
                    <button 
                        key={chat._id} 
                        ref={tab => tabLinks.current[index] = tab} 
                        id={chat._id} 
                        className="tablinks" 
                        style={{ color: "black"}} 
                        onClick={() => openChatWindow(index)}
                    >
                        {chat.receiver}
                    </button>
                ))}
            </div>

            {DUMMY_DATA.map((chat, index) => (
                <div 
                    key={chat._id + "-" + index} 
                    ref={chatWindow => chatWindows.current[index] = chatWindow} 
                    id={chat._id + "-" + index} 
                    className="tabcontent" 
                    style={{ display: "none" }}
                >   
                    {chat.messages.map((singleMessage, index) => (
                        <>
                            { singleMessage.sentByUser ? 
                                (<div key={index} style={{ textAlign: "left"}}>
                                    <p style={{ fontSize: "15px" }}>{singleMessage.message}</p>
                                    <p style={{ fontSize: "10px" }}>{singleMessage.date}</p>
                                </div>) : (<div key={index} style={{ textAlign: "right"}}>
                                    <p style={{ fontSize: "15px" }}>{singleMessage.message}</p>
                                    <p style={{ fontSize: "10px" }}>{singleMessage.date}</p>
                                </div>)
                            }
                        </>
                    ))}
                </div>
            ))}
        </>
    );
}

export default MessagesLayout;
