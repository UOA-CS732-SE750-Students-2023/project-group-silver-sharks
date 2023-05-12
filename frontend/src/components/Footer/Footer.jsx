import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

import './Footer.css';

const Footer = () => { 

    return (
        // Footer wrapper containing the bottom border and logo row
        <>
            <div className='footer-wrapper'>
                <hr className='footer-line'/>
                <div className='logo-row-wrapper'>
                    <div className='left-footer'><h3 className='footer-brand-name'><b>SHARKET</b>PLACE</h3></div>
                    <div className='right-footer'>
                        <a target='_blank' href=""><FacebookIcon/></a>
                        <a target='_blank' href=""><InstagramIcon/></a>
                        <a target='_blank' href=""><TwitterIcon/></a>
                    </div>
                </div>
            </div>
        </>
    );
}; 

export default Footer;