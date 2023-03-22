import React from 'react'; 
import { Outlet } from 'react-router-dom'; 
import NavigationBar from '../components/NavigationBar';


const MainPage = () => { 

    return (
        <>
            <NavigationBar></NavigationBar>
            <main> 
                <Outlet />
            </main>
        </>

    );
}

export default MainPage;

