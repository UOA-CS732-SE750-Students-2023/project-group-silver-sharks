import React, { useState } from 'react';
import { json,useNavigate ,useRouteLoaderData} from "react-router-dom";
import Modal from '../modal/Modal';
import classes from '../modal/Modal.module.css';
import styles from './ProfileNavBar.module.css';
import { BoxArrowRight,ChatDots,PersonFillGear } from 'react-bootstrap-icons';

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
            return navigate("/");
        }
    }

    const navigateDashboardHandler = () => {
        navigate('/store/profile');
    }

    const navigateMessagesHandler = () => {
        navigate('/store/profile/messages');
    }
    const user = props.user || {};


    //the number of unread messages
    const [unreadCount, setUnreadCount] = useState(0);
    //More than 99 unread messages displayed as 99+
    const unreadnumber = unreadCount > 99 ? '99+' : unreadCount;


    return (
        <Modal onClose={props.closeProfileNav}>
            <div className={`${classes.profilecontainer}`}>
                <div className={styles.p_firstcontainer}>
                    <h2>{user.username}</h2>
                    <div className='p_firstline'>
                        <PersonFillGear size={24} className={styles.iconsty}/>
                        <button onClick={navigateDashboardHandler}>My Account</button>
                    </div>
                    <div className="border-top border-2"></div>
                    <div className='p_firstline'>
                        <ChatDots size={24} className={styles.iconsty}/>
                        <button onClick={navigateMessagesHandler}>Messages</button>
                        {unreadCount > 0 && <div className={styles.p_circle}>
                            <div className={styles.p_unread}>{unreadnumber}</div>
                        </div>}
                        
                    </div>
                    <div className="border-top border-2"></div>
                    <div className='p_firstline'>
                        <BoxArrowRight size={24} className={styles.iconsty}/>
                        <button onClick={signoutHandler}>Sign out</button>
                    </div>
                    
                    
                </div>
                
            </div>
        </Modal>
    );
}; 

export default ProfileNavBar;