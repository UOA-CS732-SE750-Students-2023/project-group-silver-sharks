import React from 'react'; 
import './LandingLayout.css';
import LandingCard from './LandingCard';

const LandingLayout = () => { 
    return (
        <>
            <div className="landing-page-container">
                <div className="landing-page-main-wrapper">
                    <div className="get-started-wrapper">
                        <div class="description">
                            <div class="description-text">
                                <b>Start earning for your <br/><span>talent</span> as a creator.</b>
                            </div>
                            <button className='description-button'>Get Started</button>
                        </div>
                        <div class="blue-drop">
                            <img src='/LandingPageImages/drop-blue-paint.png'/>
                        </div>
                    </div>
                    <div className="landing-page-card-container">
                        <div className="landing-page-card-wrapper">
                            <LandingCard
                                src='/LandingPageImages/Images.png'
                                title='Images'
                                text='Elevate your digital projects with stunning images produced by talented artists.'

                            />
                            <LandingCard
                                src='/LandingPageImages/Videos.png'
                                title='Videos'
                                text='Find captivating content with ease in various formats and resolutions/'

                            />
                            <LandingCard
                                src='/LandingPageImages/Music.png'
                                title='Music'
                                text='Find the perfect soundtrack for your project from our wide range of music tracks.'

                            />
                            <LandingCard
                                src='/LandingPageImages/Services.png'
                                title='Services'
                                text='Find a wide range of professional services which are tailored to your needs.'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default LandingLayout;