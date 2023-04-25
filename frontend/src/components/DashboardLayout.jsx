import React from 'react'; 
import { json,useNavigate } from "react-router-dom";

const DashboardLayout = () => { 

    const navigate = useNavigate();

    const clickHandler = async () => {
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


    return (
        <div> 
           <h1>This is the dashboardlayout</h1>
           <button onClick={clickHandler}>Logout</button>
        </div>
    );
}

export default DashboardLayout;