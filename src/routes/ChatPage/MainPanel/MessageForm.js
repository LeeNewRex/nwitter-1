import React, { useState } from 'react'
import { Form, ProgressBar, Row, Col } from 'react-bootstrap'
import { firebasedb } from 'fbase'
import { useSelector } from 'react-redux'

function MessageForm() {
    const chatRoom = useSelector(state => state.chatRoom.currentChatRoom);
    const user = useSelector(state => state.user.currentUser)
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const messagesRef = firebasedb.ref("messages")

    const handleChange = (event) => {
        setContent(event.target.value)
    }

    const createMessage = () => {
        const message = {
            timestamp : firebasedb.ServerValue.TIMESTAMP,
            user: {
                id: user.id,
                name: user.displayName,
                image: user.photoURL
            }
        }
    }

    const handleSubmit = async () => {
        if(!content){
            setErrors(prev => prev.concat("Type contents first"))
            return;
        }
        setLoading(true);
        //firebase에 메시지를 저장하는 부분
        try{
            await messagesRef.child(chatRoom.id).set(createMessage())
        } catch (error) {

        }
    }


    
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlTestarea">
                    <Form.Control
                    value={content}
                    onChange={handleChange}
                    as="textarea" 
                    rows={3} />
                </Form.Group>
            </Form>

            <ProgressBar style={{marginBottom: '5px'}} variant="warning" label="60%" now={60} />

            <Row>
                <Col>
                    <button 
                        onClick={handleSubmit}
                        className="message-form-button"
                        style={{ width: '100%'}}    
                    >
                        SEND
                    </button>
                </Col>
                <Col>
                    <button 
                        className="message-form-button"
                        style={{ width: '100%'}}    
                    >
                        UPLOAD
                    </button>
                </Col>
            </Row>
        
        </div>
    )
}

export default MessageForm