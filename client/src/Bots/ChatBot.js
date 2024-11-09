import React, { useState } from "react";
import axios from "axios";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    setMessages([...messages, { text: inputText, sender: "user" }]);
    setInputText("");

    try {
      const response = await axios.post("https://localhost:7271/api/Chat", {
        message: inputText,
      });

      // Extract choices from response.data
      const choices = response.data.choices;
      console.log(choices);
      // Render each choice
      choices.forEach((choice) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: choice.text, sender: "bot" },
        ]);
      });
    } catch (error) {
      console.error("Failed to fetch response:", error);
      // Handle error
    }
  };

  return (
    <div className="chat-interface container">
      <h2 className="text-center">Chat With Bot</h2>
      <div className="chat-messages rounded">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user" : "bot"}`} 
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Type your message here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
     {/* vue */}
     
    </div>
  );
};

export default ChatInterface;
