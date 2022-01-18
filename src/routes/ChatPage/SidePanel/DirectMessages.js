import React, { Component } from 'react'
import {FaRegSmile} from 'react-icons/fa'
import { firebasedb } from 'fbase'
import { connect } from 'react-redux'
import { setCurrentChatRoom, setPrivateChatRoom } from 'redux/action/chatRoom_action'

export class DirectMessages extends Component {

    state = {
        usersRef: firebasedb.ref("users"),
        users:[],
        activeChatRoom: ""
    }

    componentDidMount() {
        if(this.props.user) {
            this.addUsersListener(this.props.user.uid)
        }
        
    }

    addUsersListener = (currentUserId) => {
        const { usersRef } = this.state;
        let usersArray = [];
        usersRef.on("child_added", DataSnapshot => {
            if( currentUserId !== DataSnapshot.key ) {
                let user = DataSnapshot.val()
                //console.log('Datasnapshot.val()', DataSnapshot.val())
                user["uid"] = DataSnapshot.key
                user["status"] = "offline";
                usersArray.push(user)
                this.setState({ users: usersArray })
            }
        })
    }

    getChatRoomId = (userId) => {
        const currentUserId = this.props.user.uid

        return userId > currentUserId
            ? `${userId}/${currentUserId}`
            : `${currentUserId}/${userId}`
    }

    changeChatRoom = (user) => {
        const chatRoomId = this.getChatRoomId(user.uid);
        const chatRoomData = {
            id: chatRoomId,
            name: user.name
        }

        this.props.dispatch(setCurrentChatRoom(chatRoomData))
        this.props.dispatch(setPrivateChatRoom(true));
        this.setActiveChatRoom(user.uid);
    }

    setActiveChatRoom = (userId) => {
        this.setState({ activeChatRoom: userId})
    }


    renderDirectrMessages = users => 
        users.length > 0 &&
        users.map(user => (
            <li key={user.uid}
            style={{
                background:user.uid === this.state.activeChatRoom 
                    && "#ffffff45"
            }}
            onClick={() => this.changeChatRoom(user)}>
                # {user.name}
            </li>
        ))
    
    
    render() {
        const { users } = this.state;
        return (
            <div>
                <span style={{ display: 'flex', alignItems: 'center'}}>
                    <FaRegSmile style={{ marginRight: 3}} /> DIRECT MESSAGES(1)
                </span>

                <ul style={{ listStyleType: 'none', padding: 0}}>
                    {this.renderDirectrMessages(users)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

export default connect (mapStateToProps)(DirectMessages);
