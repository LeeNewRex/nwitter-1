import React from 'react';
import UserPanel from './UserPanel';
import Favorited from './Favorited';
import ChatRooms from './ChatRooms';
import DirectMessages from './DirectMessages';

function SidePanel({userObj}) {
    return (
        <div
            style={{
                background:"#7B83EB",
                padding:'0.5rem',
                minHeight:'100vh',
                color:'white',
                minWidth:'175px'
            }}
        >
            <UserPanel userObj={userObj}/>

            <Favorited />

            <ChatRooms userObj={userObj} />
            
            <DirectMessages />
        </div>
    )

}

export default SidePanel

