import React, { useState, useRef } from 'react'
import { Form, ProgressBar, Row, Col } from 'react-bootstrap'
import { firebasedb, firebaseInstance, storageService } from 'fbase'
import { useSelector } from 'react-redux'
import mime from 'mime-types'

function MessageForm() {
    const chatRoom = useSelector(state => state.chatRoom.currentChatRoom);
    const user = useSelector(state => state.user.currentUser)
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [percentage, setPercentage] = useState(0)
    const messagesRef = firebasedb.ref("messages")
    const inputOpenImageRef = useRef();
    const storageRef = storageService.ref();
    const isPrivateChatRoom = useSelector(state => state.chatRoom.isPrivateChatRoom)


    const handleChange = (event) => {
        setContent(event.target.value)
    }

    const createMessage = (fileUrl = null) => {
        const message = {
            timestamp : firebaseInstance.database.ServerValue.TIMESTAMP,
            user: {
                id: user.uid,
                name: user.displayName,
                image: user.photoURL
            }
        }

        if(fileUrl !== null) {
            message["image"] = fileUrl;
        } else {
            message["content"] = content;
        }
        return message;

    }

    const handleSubmit = async () => {
        if(!content){
            setErrors(prev => prev.concat("Type contents first"))
            return;
        }
        setLoading(true);
        //console.log(chatRoom.id)
        //firebase에 메시지를 저장하는 부분
        try{
            await messagesRef.child(chatRoom.id).push().set(createMessage())
            setLoading(false)
            setContent("")
            setErrors([])
        } catch (error) {
            setErrors(pre => pre.concat(error.message))
            setLoading(false)
            setTimeout(() => {
                setErrors([])
            }, 5000);
        }
    }

    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click()
    }

    const getPath = () => {
        if(isPrivateChatRoom) {
            return `/message/private/${chatRoom.id}`
        } else {
            return `/message/public`
        }
    }

    const handleUploadImage = (event) => {
        const file = event.target.files[0];

        const filePath = `/message/${getPath()}/${file.name}`;
        const metadata = { contentType: mime.lookup(file.name)}
        setLoading(true);
        try {
            //파일을 먼저 스토리지에 저장
            let uploadTask = storageRef.child(filePath).put(file, metadata)

            //파일 저장되는 퍼센ㅌ지 구하기
            uploadTask.on("state_changed", 
            UploadTaskSnapshot => {
                const percentage = Math.round(
                    (UploadTaskSnapshot.bytesTransferred / UploadTaskSnapshot.totalBytes) * 100
                )
                setPercentage(percentage)
            },
            err => {
                console.log(err);
                setLoading(false)
            },
            () => {
                //저장이 다 된 후에 파일 메시지 전송 (데이터베이스에 저장)
                //저장된 파일을 다운로드 받을 수 있는 URL 가져오기
                uploadTask.snapshot.ref.getDownloadURL()
                .then(downloadURL => {
                    messagesRef.child(chatRoom.id).push().set(createMessage(downloadURL))
                    setLoading(false)
                })
            }
            

            )
        } catch (error) {
            alert(error)
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


            {
                !(percentage === 0 || percentage === 100) && 

                <ProgressBar style={{marginBottom: '5px'}} variant="warning" label={`${percentage}%`} now={percentage} />

            }

        <div>
            {errors.map(errorMsg => <p style={{ color: 'red' }} key={errorMsg}>
                {errorMsg}
            </p>)}
        </div>

            <Row>
                <Col>
                    <button 
                        onClick={handleSubmit}
                        className="message-form-button"
                        style={{ width: '100%'}}
                        disabled={loading ? true : false}    
                    >
                        SEND
                    </button>
                </Col>
                <Col>
                    <button 
                        onClick={handleOpenImageRef}
                        className="message-form-button"
                        style={{ width: '100%'}}
                        disabled={loading ? true : false}    
                    >
                        UPLOAD
                    </button>
                </Col>
            </Row>
        
        <input
        accept="image/jpeg, image/png"
        style={{ display: 'none'}}
        type="file"
        ref={inputOpenImageRef}
        onChange={handleUploadImage}
        />

        </div>
    )
}

export default MessageForm