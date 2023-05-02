import React from 'react'; 
import { json,useNavigate ,useRouteLoaderData, useSubmit} from "react-router-dom";
import './DashboardLayout.css'

const DashboardLayout = () => { 
    
    const user = useRouteLoaderData('username-loader');

    const navigate = useNavigate();
    const submit = useSubmit();


    const navigateViewMyProfile = () => {
        //return author page 
        navigate(`../author/${user._id}`);
    }
    const navigateDeleteAccount = () => {
        // call the delete account endpoint from the backend
        const proceed = window.confirm('Are you sure?');

        if (proceed){
            submit(null, { method: 'DELETE' });
        }
        
    }

    return (
        <div className='d_background'>
            <div className='d_fdiv'> 
                <button onClick={navigateViewMyProfile}>View my profile</button>
                <h1 className='d_accde'>Account details</h1>
                <div className='d_tablecontainer'>
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td>Account type</td>
                                <td>{user.accountType}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h1 className='d_accde'>Actions</h1>
                <div className='d_linkcontainer'>
                    <div>
                        <button onClick={navigateDeleteAccount}>Delete account</button>
                    </div>

                    
                </div>
           
            </div>

        </div>
        
    );
}

export default DashboardLayout;