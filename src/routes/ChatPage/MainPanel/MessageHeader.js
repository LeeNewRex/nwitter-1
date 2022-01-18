import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { useSelector } from 'react-redux'

function MessageHeader({handleSearchChange}) {
    const chatRoom = useSelector(state => state.chatRoom.currentChatRoom)
    const isPrivateChatRoom = useSelector(state => state.chatRoom.isPrivateChatRoom)

    return (
        <div style={{
            width: '100%',
            height: '165px',
            border: '.2rem solid #ececec',
            borderRadius: '4px',
            pasdding: '1rem',
            marginBottom: '1rem'
        }}>
            <Container>
                <Row>
                    <Col><h2 style={{ fontSize: '18px', marginBottom: '5px', marginTop:'5px', marginRight:'3px' }}>
                        {isPrivateChatRoom ?
                            <FaLock style={{ marginBottom: '10px'}} />
                            :
                            <FaLockOpen style={{ marginBottom: '10px'}} />
                        }

                        
                        {chatRoom && chatRoom.name}
                    <MdFavorite /></h2></Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ marginBottom:'5px', fontSize:'15px', display: 'flex', justifyContent:'flex-end'}}>
                            <p>
                                <Image /> {" "}user name
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginBottom: '10px' }}>
                        <InputGroup className='mb-1'>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <AiOutlineSearch />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl 
                                onChange={handleSearchChange}
                                placeholder="Search Messages" 
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Accordion>
                            <Card>
                                <Card.Header style={{ padding: '0 1rem'}}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Click
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body style={{ color: 'black'}}>Hello! test Body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                    <Col>
                        <Accordion>
                            <Card>
                                <Card.Header style={{ padding: '0 1rem'}}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Click
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body style={{ color: 'black'}}>Hello! test Body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
            </Container>    
        </div>
    )
}

export default MessageHeader
