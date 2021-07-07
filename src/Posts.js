import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";
import "./post.css";

export const Posts = (props) => {
  const [comment, setcomment] = useState([]);
  const [newcomment, setnewcomment] = useState([]);
  const [like, setlike] = useState();

  useEffect(() => {
    //here as per the post id we are fetching prevoius posts comments from database using onSnapshot and assigning it to the usestate varibale
    let unsubscribe;
    if (props.postid) {
      unsubscribe = db
        .collection("posts")
        .doc(props.postid)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setcomment(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [props.postid]);
  useEffect(() => {
    //here we are fetching likes on the post from database
    let unsubscribe;
    if (props.postid) {
      unsubscribe = db
        .collection("posts")
        .doc(props.postid)
        .onSnapshot((snapshot) => {
          setlike(snapshot.data().like);
        });
    }
    return () => {
      unsubscribe();
    };
  }, [props.postid]);
  const likefunction = () => {
    //here is the functionality of like is written also we are storing likes to database
    setlike(like + 1);
    const a = document.querySelector(".imgdiv");
    const heart = document.createElement("i");
    heart.classList.add("material-icons");
    heart.classList.add("likeicon");
    heart.innerHTML = "favorite";
    heart.style.color = "red";
    a.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 500);
    db.collection("posts")
      .doc(props.postid)
      .update({
        like: like + 1,
      });
  };
  const postcomment = (e) => {
    // this function help u to store new comments to the database using add method
    e.preventDefault();
    db.collection("posts")
      .doc(props.postid)
      .collection("comments")
      .add({
        text: newcomment,
        username: sessionStorage.getItem("currentuser"),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setnewcomment("");
  };

  return (
    <div className="postconatiner">
      <div className="avatar">
        <Avatar alt={props.username} src="/static/images/avatar/1.jpg"></Avatar>
        <h3 className="postheader">{props.username}</h3>
      </div>
      <div className="imgdiv">
        <img
          className="postimg"
          src={props.url}
          alt="post"
          onDoubleClick={likefunction}
        />
      </div>

      <p className="postdetails">
        <b>{like} </b>likes
      </p>
      <h3 className="postdetails">{props.caption}</h3>
      <div className="previouscomment">
        {comment.map((comment) => (
          <p className="comments">
            <b className="comments">{comment.username} </b>
            {comment.text}
          </p>
        ))}
      </div>
      <div className="commentsection">
        <form>
          <input
            className="commentinput"
            placeholder="Add a comment..."
            value={newcomment}
            onChange={(event) => setnewcomment(event.target.value)}
          />

          <button type="submit" className="commentbtn" onClick={postcomment}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};
export default Posts;
