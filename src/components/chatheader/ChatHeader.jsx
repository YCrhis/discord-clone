import React from 'react'
/* style */
import './chatheader.css'
/* icons material ui */
import NotificationsIcon from '@material-ui/icons/Notifications';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import HelpIcon from '@material-ui/icons/Help';
/* redux */
import { useDispatch } from 'react-redux';

function ChatHeader({channelName}) {

    const dispatch = useDispatch()

    return (
        <div className="chatHeader">
            <div className="chatHeader__left">
                <h3>
                    <span className="chatHeader__hash">#</span>
                    {channelName}
                </h3>

            </div>

            <div className="chatHeader__right">
                <NotificationsIcon/>
                <LocationOnIcon/>
                <PeopleAltIcon/>

                <div className="chatHeader__search">
                    <input placeholder="Search" />
                    <SearchIcon/>
                </div>

                <SendIcon/>
                <HelpIcon/>

            </div>
        </div>
    )
}

export default ChatHeader
