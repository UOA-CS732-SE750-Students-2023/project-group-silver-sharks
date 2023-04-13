import React from 'react'; 
import { Outlet } from 'react-router-dom'; 
import Footer from '../../components/Footer/Footer';
import ProfileNavBar from '../../components/ProfileNavBar';


const ProfileRoot = () => { 

    return (
        <>  
            <ProfileNavBar />
            <Outlet />
        </>

    );
}

export default ProfileRoot;