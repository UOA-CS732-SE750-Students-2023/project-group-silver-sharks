import React from 'react'; 

const DashboardLayout = () => { 

    const clickHandler = async () => {
        const response = await fetch('http://localhost:3000/account');


        // throwing will send the data to the error page
        if (!response.ok){
            throw json({ message: 'Could not fetch details for selected event'}, {
                status: 500,
            });
        } else {
            // react router will extract data from promise
            console.log(response)
            return response;
        }
    }


    return (
        <div> 
           <h1>This is the dashboardlayout</h1>
           <button onClick={clickHandler}>Click me</button>
        </div>
    );
}

export default DashboardLayout;