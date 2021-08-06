import React, {useState, useEffect} from 'react'
/* components */
import ChatHeader from '../chatheader/ChatHeader'
import Message from '../message/Message';
/* styles */
import './chat.css'

/* material ui */
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
/* redux */

import {useSelector} from 'react-redux'
import { selectChannelId, selectChannelName } from '../../features/appSlice';
import { selectUser } from '../../features/userSlice';

/* firebase */
import firebase from 'firebase';
import db from '../../firebase/firebase';

function Chat() {

    const user= useSelector(selectUser);
    const channelName= useSelector(selectChannelName);
    const channelId = useSelector(selectChannelId);

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);


    useEffect(()=>{
        if(channelId){
            db.collection('channels')
            .doc(channelId)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ));
        }
    },[channelId])

    const sendMessage = e =>{
        e.preventDefault();

        db.collection('channels').doc(channelId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user,
        })

        setInput('');
    }

    return (
        <div className="chat">
            <ChatHeader  channelName={channelName} />

            <div className="chat__messages">
                {messages.map((message)=>(
                    <Message user={message.user} message={message.message} timestamp={message.timestamp}/>
                ))}
            </div>

            <div className="chat__input">
                <AddCircleIcon/>
                <form>
                    <input 
                        placeholder="Message #TEST"
                        onChange={(e)=>setInput(e.target.value)} 
                        value={input}
                        disabled={!channelId}
                    />
                    <button 
                        disabled={!channelId}
                        type="submit" 
                        className="chat__inputButton" 
                        onClick={sendMessage}
                    >Send Message</button>
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcardIcon/>
                    <GifIcon/>
                    <EmojiEmotionsIcon/>
                </div>
            </div>
        </div>
    )
}

export default Chat
