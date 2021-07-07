import React from 'react'
import edit from './edit.png';
import './sidebar.css';
import Sidechats from './Sidechats';
import {useState,useEffect} from 'react';
import { db } from './firebase';
 const Sidebar = () => {
     const [rooms,setrooms]=useState([]);

     useEffect(()=>
     {
         //here we are fetching rooms from the database
        const unsubscribe=db.collection("chatroom")
         .onSnapshot((snapshot)=>
            
                setrooms(snapshot.docs.map((doc)=>
                    ({
                        id:doc.id,
                        data:doc.data(),
                    })))
            );
            return()=>
            {
                unsubscribe();
            }
     },[]);

     const createroom=()=>
     {
         // this function is for creating a new chat room
        const roomname=prompt("Start a new Chat");
        if(roomname)
        {
        db
        .collection("chatroom")
        .add({
                name:roomname,
        })
    }
     }

    return (
        <div className="sidebar">
             <div className="sideheader">
                    <h3 className="username">_mus2_amba</h3>
                    <div className="header_right">
                        <img height="25" src={edit} alt="logo" onClick={createroom}></img>
                    </div>
                </div>
                <div className="sidebar_chat">
                    {rooms.map((room)=>
                    (
                        <Sidechats 
                        key={room.id} 
                        id={room.id} 
                        name={room.data.name}
                        />
                    ))}
                </div>
                
        </div>
    )
}
export default Sidebar;