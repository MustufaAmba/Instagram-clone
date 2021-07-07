import React from "react";
import "./chatarea.css";
import Avatar from "@material-ui/core/Avatar";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { db } from "./firebase";
import InputEmoji from "react-input-emoji";

export const Chatarea = () => {
  const [text, setText] = useState("");
  const [previousmessage, setpreviousmessage] = useState([]);
  const [roomname, setroomname] = useState();
  const [roomid, setroomid] = useState(0);

  useEffect(() => {
    //here we are fetching room id stored in session storage and using it in chatarea
    setroomid(sessionStorage?.getItem("currentroom"));
    if (roomid) {
      db.collection("chatroom")
        .doc(roomid)
        .onSnapshot((snapshot) => {
          setroomname(snapshot.data().name);
        });
    }
  }, [roomid]);
  useEffect(() => {
    //here after fetching the room id stored in session storage we are fetching messages stored in the room from database
    if (roomid) {
      db.collection("chatroom")
        .doc(roomid)
        .collection("chats")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setpreviousmessage(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomid]);
  const handleonenter = (text) => {
    // here we are adding new message to the database
    db.collection("chatroom")
      .doc(roomid)
      .collection("chats")
      .add({
        text: text,
        username: sessionStorage.getItem("currentuser"),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };
  const user = sessionStorage.getItem("currentuser");
  return (
    <div className="mainsection">
      <div className="sectionheader">
        <Avatar
          className="chatavatar"
          src="https://avatars.dicebear.com/api/human/mustafa.svg"
          fontSize="small"
        />
        <h4 className="header_username">{roomname}</h4>
        <div className="headerright">
          <InfoOutlinedIcon fontSize="large" />
        </div>
      </div>
      <div className="chatareabody">
        {/* here i a small logic to display message right or left the chat area based on user if the message username is same as the logged in user the display hte message to the right side else left side */}
        {previousmessage.map((previousmessage) =>
          user === previousmessage.username ? (
            <p className="mymessage">{previousmessage.text}</p>
          ) : (
            <div className="othersmessage">
              <b>{previousmessage.username}</b>
              <p>{previousmessage.text}</p>
            </div>
          )
        )}
      </div>
      <div className="chatfooter">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleonenter}
          placeholder="Type a message"
        />
      </div>
    </div>
  );
};
export default Chatarea;
