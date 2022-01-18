import React from 'react'
import Media from 'react-bootstrap/Media'
import moment from 'moment'


function Message({message, user}) {

    const timeFromNow = timestamp => moment(timestamp).fromNow();

    const isImage = message => {
        return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
    }
    
    const isMessageMine = (message, user) => {
        return message.user.id === user.uid
    }

    return (
        <Media>
            <img
                style={{ borderRadius: '10px'}}
                width={30}
                height={30}
                className="mr-3"
                src={message.user.image}
                alt={message.user.name}
            />
            <Media.Body style={{ 
                    background: isMessageMine(message, user) && "#ECECEC"
                }}>
                <h5 style={{fontSize:'17px', color:'black'}}>{message.user.name}
                    <span style={{ fontSize: '10px', color:'gray'}}>
                        {timeFromNow(message.timestamp)}
                    </span>
                </h5>
                {isImage(message) ?
                <img style={{ maxWidth: '300px'}} alt="이미지" src={message.image} />
                :
                <p style={{ color: 'violet'}}>
                    {message.content}
                </p>
                }

                
            </Media.Body>
        </Media>
        
    )
}

export default Message
