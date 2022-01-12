import React, {useState, useEffect} from "react"
import MainPanel from './ChatPage/MainPanel/MainPanel'
import SidePanel from './ChatPage/SidePanel/SidePanel'

function mainchat({userObj}) {


    return (
        <div style={{ display:'flex'}}>
            <div style={{ width: '300px'}}>
                <SidePanel userObj={userObj}/>
            </div>
            <div style={{ width: '100%'}}>
                <MainPanel />
            </div>
        </div>
    )
}

export default mainchat;