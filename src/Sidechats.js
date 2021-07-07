import React from 'react'
import './sidechats.css'
import Avatar from '@material-ui/core/Avatar';
import {useState,useEffect} from 'react';
import { db } from './firebase';

export const Sidechats = (props) => {
    const [string,setstring]= useState('');
    const [lastmessage, setlastmessage] = useState(0);
    useEffect(()=>
    {
        //here we are generating a random string for the avatar api 
        setstring(Math.floor(Math.random()*1000));
    },[])
    useEffect(() => {
        if (props.id) {
            //here we are fetching messages based on chatroom id and displaying the last message
            db
                .collection("chatroom")
                .doc(props.id)
                .collection("chats")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setlastmessage(snapshot.docs.map((doc) => doc.data()));
                })
        };

    }, [props.id]);
    return (
  
        <div className="sidechats" onClick={()=>{
            sessionStorage.setItem("currentroom",props.id);
            window.location.reload();}}>
            <Avatar className="sideavatar"src={`https://avatars.dicebear.com/api/human/${string}.svg`}/>
            <div className="chats">
            <h4 className="chatpreview">{props.name}</h4>
            <p className="chatpreview">{lastmessage[0]?.text}</p>
            </div>
        </div>

    )
}
export default Sidechats;