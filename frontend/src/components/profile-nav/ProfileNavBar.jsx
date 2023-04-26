import React from 'react';
import { json,useNavigate } from "react-router-dom";
import Modal from '../modal/Modal';

import styles from './ProfileNavBar.module.css';

const ProfileNavBar = (props) => { 

    const navigate = useNavigate();

    const signoutHandler = async () => {
        const response = await fetch('http://localhost:3000/account/sign-out');

        // throwing will send the data to the error page
        if (!response.ok){
            throw json({ message: 'Could not sign out'}, {
                status: 500,
            });
        } else {
            console.log(response)
            return navigate("/");
        }
    }

    const navigateDashboardHandler = () => {
        navigate('/store/profile');
    }

    const navigateMessagesHandler = () => {
        navigate('/store/profile/messages');
    }

    return (
        <Modal onClose={props.closeProfileNav}>
            <div className={styles.cart}>
                <button onClick={navigateDashboardHandler}>My Account</button>
                <button onClick={navigateMessagesHandler}>Messages</button>
                <button onClick={signoutHandler}>Sign out</button>
            </div>
        </Modal>
    );
}; 

export default ProfileNavBar;