import React, { useState } from "react";
import "./CustomerSupportChatbot.css"; // Import CSS file for styling
import Header from "../components/Header";

const CustomerSupportChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    const userMessage = {
      user: "You",
      text: inputText.trim(),
    };
    setMessages([...messages, userMessage]);
    setInputText("");

    // Simulate bot response based on user input
    setTimeout(() => {
      let botResponse;
      if (inputText.toLowerCase().includes("hy")||inputText.toLowerCase().includes("hello")) {
        botResponse = {
          user: "Bot",
          text: "Hey!, How can I assist you today? 😊",
          options: ['Order', 'Payment', 'Account'],
        };
      } else if (inputText.toLowerCase().includes("payment")) {
        botResponse = {
          user: "Bot",
          text: "For payment-related queries, please contact our billing department at billing@example.com.",
        };
      } else if (inputText.toLowerCase().includes("order")) {
        botResponse = {
          user: "Bot",
          text: "For order-related queries, please contact our Shipping department at shipping@example.com.",
        };
      } else if (inputText.toLowerCase().includes("account")) {
        botResponse = {
          user: "Bot",
          text: "For account-related queries, please contact our Admin department at AdminAcc@example.com.",
        };
      } else {
        botResponse = {
          user: "Bot",
          text: "I'm sorry, I didn't understand that. How can I assist you?",
        };
      }
      setMessages([...messages, botResponse]);
    }, 500);
  };

  const handleOptionClick = (option) => {
    // Handle action based on the selected option
    setMessages([...messages, { user: 'You', text: `Selected option: ${option}` }]);
  };

  return (
    <div>
      <Header />
      <h2 className="text-center" style={{ padding: "8px" }}>
        Customer Support
      </h2>
      <div className="myflex">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.user === "You" ? "sent" : "received"
                }`}
              >
                <span className="message-user">{message.user}: </span>
                <span className="message-text">{message.text}</span>
                {message.options && (
                  <div className="options">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default CustomerSupportChatbot;
