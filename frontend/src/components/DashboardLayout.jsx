import React from 'react'; 
import { useNavigate , useSubmit} from "react-router-dom";
import './DashboardLayout.css'

const DashboardLayout = ({ user }) => {     
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

    /*** STRIPE SET UP AUTHENTICATION ***/

    // Needed for getting users set up on stripe onboarding. You can find this ID
    // under Stripe Dashboard > Settings > Connect Settings
    const REACT_APP_STRIPE_CLIENT_ID = "ca_Nq0lRvkvOFNQuvGmPak9JEYF4AHc97sw";

    // The redirect uri when stripe onboarding is completed.
    const REACT_APP_STRIPE_REDIRECT_URI = `http://localhost:3000/oauth/callback`;

    const externalUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${REACT_APP_STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${REACT_APP_STRIPE_REDIRECT_URI}`;
    const navigateStripeAuthentication = () => {
        window.open(externalUrl, '_blank', 'noopener,noreferrer');
    };
   
    // Search up
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
                    <div>
                        <a href><button onClick={navigateStripeAuthentication}>Set Up Payment</button></a>
                    </div>
                </div>
           
            </div>

        </div>
        
    );
}

export default DashboardLayout;