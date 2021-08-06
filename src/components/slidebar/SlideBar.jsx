import React, {useState, useEffect} from 'react'
/* style */
import './slidebar.css'
/* icons material ui */
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoIcon from '@material-ui/icons/Info';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
/* components */
import SlidebarChannel from '../slidebarchannels/SlidebarChannel';
/* material ui componenets */
import { Avatar } from '@material-ui/core';
/* redux */
import { selectUser } from '../../features/userSlice';
import {useSelector} from 'react-redux'
/* firebase */
import db, { auth } from '../../firebase/firebase';

function SlideBar() {

    const [channels, setChannels] = useState([])

    const user = useSelector(selectUser)

    const handleAddChannel = () =>{
        const channelName = prompt('enter the channel name');

        if (channelName) {
            db.collection('channels').add({
                channelName: channelName,
            })
        }
    }


    /* component load */

    useEffect(()=>{
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id:doc.id,
                channel:doc.data(),
            })))
        ));
    },[])

    return (
        <div className="slidebar">
            <div className="slidebar__top">
                <h3>This is your chat</h3>
                <ExpandMoreIcon />
            </div>

            <div className="slidebar__channels">
                <div className="slidebar__channelsHeader">
                    <div className="slidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon className="slidebar__addChannel" onClick={handleAddChannel}/>
                </div>

                <div className="slidebar__channelsList">
                    {channels.map(({id, channel})=>(
                        <SlidebarChannel  key={id} channelName= {channel.channelName} id={id}/>
                    ))}
                </div>
            </div>

            <div className="slidebar__voice">
                <SignalCellularAltIcon className="slidebar__voiceIcon" font-size="large" />
                <div className="slidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="slidebar__voiceIcons">
                    <InfoIcon/>
                    <CallIcon/>
                </div>
            </div>


            <div className="slidebar__profile">
                <Avatar src={user.photo} onClick={()=> auth.signOut()}/>
                <div className="slidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>{user.uid.substring(0,5)}</p>
                </div>
                <div className="slidebar__profileIcons">
                    <MicIcon/>
                    <HeadsetIcon/>
                    <SettingsIcon/>
                </div>
            </div>
        </div>
    )
}

export default SlideBar
