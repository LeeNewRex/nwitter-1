import React, {useRef} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import { IoIosChatboxes } from 'react-icons/io';
import Image from 'react-bootstrap/Image';
import { authService, storageService } from 'fbase'
import { useHistory } from "react-router-dom";
import mime from 'mime-types';
import { useDispatch, useSelector } from 'react-redux'
import { setPhotoURL } from '../../../redux/action/user_action';

function UserPanel() {
    const user = useSelector(state => state.user.currentUser)
    const history = useHistory();
    const dispatch = useDispatch();
    const inputOpenImageRef = useRef();

    const handleLogout = () => {
        authService.signOut();
        history.push("/");
    };

    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click();
    }

    const handleUploadImage = async (event) => {
        const file = event.target.files[0];

        const metadata = { contentType: mime.lookup(file.name) };

        try {

            //스토리지에 파일 저장하기
            let uploadTaskSnapshot = await storageService.ref()
                .child(`user_image/${user.uid}`)
                .put(file, metadata)

                let downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
                
                
            await authService.currentUser.updateProfile({
                photoURL: downloadURL
            })    

            dispatch(setPhotoURL(downloadURL))


        } catch (error) {

        }

        console.log('file', file)
    }


    return (
        <div>
            {/* Logo */}
            <h3 style={{ color: 'violet', fontSize:'30px', marginBottom:'0.5rem'}}>
                <IoIosChatboxes />{" "} Chat
            </h3>

            <div style={{ display:'flex', marginBottom: '1rem'}}>
            <Image src={user && user.photoURL}
            style={{ width: '30p', height: '30px', marginBottom:'3px'}}
            roundedCircle />

            <Dropdown>
                <Dropdown.Toggle 
                style={{ background:'transparent', border:'0px'}}
                id="dropdown-basic">
                    {user.displayName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleOpenImageRef}>프로필 변경</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            </div>

            <input
                onChange={handleUploadImage}
                accept="image/jpeg, image/png"
                style={{display:'none'}}
                ref={inputOpenImageRef}
                type="file"
            />
        </div>
    )
}

export default UserPanel
