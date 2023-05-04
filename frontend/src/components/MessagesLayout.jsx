import React, { useRef } from 'react'; 
import './MessagesLayout.css';

const DUMMY_DATA = [
    {   
        _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
        receiver: "Steve",
        message: "Hi there friend what are you doing", 
        date: "6/5/2023"
    },
    {   
        _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
        receiver: "Jack",
        message: "Don't call me again or im calling the police", 
        date: "5/5/2023"
    },
    {   
        _id: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
        receiver: "Steve",
        message: "Can you stop harrassing me pls.", 
        date: "4/5/2023"
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
                    <p>{chat.message}</p>
                    <p>{chat.date}</p>
                </div>
            ))}
        </>
    );
}

export default MessagesLayout;
