import React from 'react'; 
import { json,useNavigate ,useRouteLoaderData} from "react-router-dom";
import './DashboardLayout.css'

const DashboardLayout = () => { 
    
    const user = useRouteLoaderData('username-loader');

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
    const navigateViewMyProfile = () => {
        //return author page 
        navigate(`../author/${user._id}`);
    }

    const navigateChangePassword = () => {
        navigate('../author/2');
    }

    const navigateResetAnotherPassword = () => {
        navigate('../author/2');
    }
    
    const navigateDeleteAnotherAccount = () => {
        navigate('../author/2');
    }
    
    const navigateEditaListing = () => {
        navigate('../author/2');
    }
    
    const navigateDeleteAccount = () => {
        navigate('../author/2');
    }
    
    const navigateRemoveaListing = () => {
        navigate('../author/2');
    }
    let roleview=user.accountType==="Administrator"? 'admin' : 'user';
    roleview='admin';

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
                        <button onClick={navigateChangePassword}>Change password</button>
                        <button onClick={navigateDeleteAccount}>Delete account</button>
                    </div>    
                    { 
                    roleview === 'admin' && 
                    <div>
                        <button onClick={navigateResetAnotherPassword}>Reset another password</button>
                        <button onClick={navigateDeleteAnotherAccount}>Delete another account</button>
                        <button onClick={navigateEditaListing}>Edit a listing</button>
                        <button onClick={navigateRemoveaListing}>Remove a listing</button>
                    </div>
                        }

                    
                </div>
           
                {/* <button onClick={clickHandler}>Logout</button> */}
            </div>

        </div>
        
    );
}

export default DashboardLayout;