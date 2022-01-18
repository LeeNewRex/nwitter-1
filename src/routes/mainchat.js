import React from "react"
import MainPanel from './ChatPage/MainPanel/MainPanel'
import SidePanel from './ChatPage/SidePanel/SidePanel'
import { useSelector } from 'react-redux'

function Mainchat({userObj}) {


    const ChatRoom = useSelector(state => state.chatRoom.currentChatRoom)
    return (
        <div style={{ display:'flex'}}>
            <div style={{ width: '300px'}}>
                <SidePanel userObj={userObj}/>
            </div>
            <div style={{ width: '100%'}}>
                <MainPanel
                    key={ChatRoom && ChatRoom.id}
                />
            </div>
        </div>
    )
}

export default Mainchat;