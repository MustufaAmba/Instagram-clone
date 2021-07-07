import "./home.css";
import { useState, useEffect } from "react";
import Posts from "./Posts";
import { db } from "./firebase";
import Upload from "./Upload";
//import {Button} from '@material-ui/core';

function Home() {
  const [post, setposts] = useState([]);
  //const setuser = useContext(GetUser);
  useEffect(() => {
    //In this useeffect we are fetching posts data from firebase database like image url ,username,caption we are using onSnapshot method of firebase which basically works as everytime a change is recorded in database this method will take a snapshot and we will get the latest data i.e everytime you upload a post then within 1 or 2 sec new post will appeare at the top of the page without reload
    db.collection("posts")
      .orderBy("Timestamp", "desc")
      .onSnapshot((snapshot) => {
        setposts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="App">
      {/* here a small logic is written for showing the upload div to only those user which are logged in*/}
      <center>
        {sessionStorage.getItem("currentuser") ? (
          <Upload username={sessionStorage.getItem("currentuser")} />
        ) : (
          <h3 className="uploadmsg">
            Sorry need to login first if logged in then referesh to upload
            images
          </h3>
        )}
      </center>

      {post.map(({ id, post }) => (
        <Posts
          key={id}
          postid={id}
          username={post.username}
          url={post.url}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default Home;
