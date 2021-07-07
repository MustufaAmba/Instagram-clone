import React from "react";
import "./chat.css";
import Sidebar from "./Sidebar";
import Chatarea from "./Chatarea";

const Chat = () => {
  return (
    //this is staring point for the chat page and here is a small logic written for the user validation if the user is logged in then and only then we are allowing him/her to use the chat functionality
    <div className="chatsection">
      <div className="chatbody">
        <Sidebar />
        {sessionStorage.getItem("currentuser") ? (
          <Chatarea />
        ) : (
          <h3 className="authentication">
            Sorry Need to Login First and click on a chatroom to start Chat
          </h3>
        )}
      </div>
    </div>
  );
};
export default Chat;
