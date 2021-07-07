import React from 'react';
import {useState} from 'react';
import {storage,db} from './firebase';
import firebase from "firebase";
import './upload.css';
export const Upload = (props) => {
    const [caption ,setcaption]=useState('');
    const [progressbar ,setprogressbar]=useState(0);
    const [image ,setimage]=useState(null);
    const handleupload=(event)=>
    {
        // so this is main task here we are dividing it in 3 parts in first part we are literally putting the image from our local pc to firebase firestore which acts as a online storage
        event.preventDefault();
        const uploadtask=storage.ref(`images/${image.name}`).put(image);
        //then here we are using a promise .on and we are achieving the functionality of progress bar based on bytesTransferred/totalBytes*100
        uploadtask.on(
            "state_changed",
            (snapshot)=>
            {
                const progressbar =Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes*100)
                );
                setprogressbar(progressbar);
            },
            (error)=>{
                console.log(error.message);

            },
            // atlast we are creating a image url and storing that url in datatbase image field
            ()=>
            {
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url=>
                {
                    db.collection("posts").add(
                        {
                            Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            url:url,
                            username:props.username,
                            like:0,
                        }
                    );
                        setprogressbar(0);
                        setcaption('');
                        setimage(null);
                }

                )
            }
        )
    };
    const handleprogess=(event)=>
    {
        //if we are selecting multiple files from our file manager then select the first item
        if(event.target.files[0])
        {
            setimage(event.target.files[0]);
        }
    };
    return (
        <div className='uploadsection'>
            <form>
            <h2>Upload your photos</h2>
            <progress className="progressbar" value={progressbar} max="100"/><br/>
            <input  className="fileupload" type="file" onChange={handleprogess}/><br/>
            <input className="captioninput" type="text" placeholder="Write a caption..." required
            onChange={event=>setcaption(event.target.value)}
            value={caption} /><br/>

<button type="submit" className="uploadbtn" onClick={handleupload} >Upload
</button>
</form>
        </div>
    ) 
}
export default Upload