import React, { Component } from 'react'
import { FaRegSmileWink } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { firebasedb } from './../../../fbase'
import {setCurrentChatRoom} from '../../../redux/action/chatRoom_action'
import { connect } from 'react-redux'

export class ChatRooms extends Component {


    state = {
        show: false,
        name: "",
        description: "",
        chatRoomsRef: firebasedb.ref("ChatRooms"),
        chatRooms: [],
        firstLoad: true,
        activeChatRoomId: ""
    }

    componentDidMount() {
        this.AddChatRoomListeners();
    }

    componentWillUnmount() {
        this.state.chatRoomsRef.off();
    }

    setFirstChatRoom = () => {

        const firstChatRoom = this.state.chatRooms[0]
        if(this.state.firstLoad && this.state.chatRooms.length > 0) {
            this.props.dispatch(setCurrentChatRoom(firstChatRoom))
            this.setState({ activeChatRoomId: firstChatRoom.id})
        }
        this.setState({ firstLoad: false })
    
    } 

    AddChatRoomListeners = () => {
        let chatRoomArray = [];

        this.state.chatRoomsRef.on("child_added", DataSnapshot => {
            chatRoomArray.push(DataSnapshot.val());
            this.setState({ chatRooms: chatRoomArray }, 
                () => this.setFirstChatRoom());
        })
    }


    handleClose = () => this.setState({ show: false });
    handleShow =() => this.setState({ show: true });

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, description } = this.state;

        if(this.isFormValid(name, description)) {
            this.addChatRoom();
        }

        //console.log(name)
    }


    addChatRoom = async () => {
        const key = this.state.chatRoomsRef.push().key;
        const { name, description } = this.state;
        const  { displayName, photoURL } = this.props.userObj
        const newChatRoom = {
            id: key,
            name: name,
            description: description,
            createdBy: {
                name: displayName,
                image: photoURL
            }
        }
        console.log(displayName)
        
        try {
            await this.state.chatRoomsRef.child(key).update(newChatRoom)
            this.setState({
                name: "",
                description: "",
                show: false
            })
        } catch(error) {
            alert(error)
        }

    }


    isFormValid = (name, description) => 
        name && description;

    changeChatRoom = (room) => {
        this.props.dispatch(setCurrentChatRoom(room));
        this.setState({ activeChatRoomId: room.id})
    }    

    randerChatRooms = (chatRooms) =>
        chatRooms.length > 0 &&
        chatRooms.map(room => (
            <li
                key={room.id}
                style={{
                    backgroundColor: room.id === this.state.activeChatRoomId &&
                        "#ffffff45"
                }}
                onClick={() => this.changeChatRoom(room)}
            >
                # {room.name}
            </li>
        ))

    render() {
        
        return (
            <div style={{marginBottom: '2rem'}}>
                
                <div style={{
                    position: 'relative', width: '100%',
                    display: 'flex', alignItems: 'center',
                    marginBottom:'0.2rem'
                }}>

                    <FaRegSmileWink style={{ marginRight: 3 }} />
                    CHAT ROOOMS {" "} (1)

                    <FaPlus
                    onClick={this.handleShow} 
                    style={{
                        position: 'absolute',
                        right: 0, cursor: 'pointer'
                    }} />

                </div>

                <ul style={{ listStyleType:'none', padding: 0}}>
                    {this.randerChatRooms(this.state.chatRooms)}
                </ul>

                {/* ADD CHAT ROOM MODAL */}


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{color:'black'}}>Create a chat room</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body style={{color:'black'}}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>방 이름</Form.Label>
                            <Form.Control
                                onChange={(e) => this.setState({ name: e.target.value })}
                                type="text" placeholder="Enter a chat room name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>방 설명</Form.Label>
                            <Form.Control 
                                onChange={(e) => this.setState({ description: e.target.value })}
                                type="text" placeholder="Enter a chat room description" />
                        </Form.Group>
                        
                        </Form>
                    </Modal.Body>
                    
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Create
                    </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(ChatRooms)
