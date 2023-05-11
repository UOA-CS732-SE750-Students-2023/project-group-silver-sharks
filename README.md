
![Logo](https://i.imgur.com/RSZhOrm.png)


# README

Sharketplace is a full-stack web application that allows users to buy and sell digital assets including images, videos, music and services.

## Features
- Support for four different types of assets: images, videos, music and services
- Ability to list an asset for sale and earn income through Stripe: users can upload various file types for their assets
- Ability to buy other assets through Stripe: users can download assets as soon as they purchase them
- Product search page with different categories, pagination, sort by, and search bar
- Full sign-in system using Google authentication
- Account management ability: Users can edit or delete listed products, and view all their purchased products as well as their total earnings from products they are selling.
- Full chat/private messaging functionality between users
- SharkBot: A bot that automatically messages users to notify them when another user has purchased their product
- Different permissions for regular users vs administrators: administrators can delete other accounts, and remove products even if they do not own them.
- Priority slots: Users can pay a certain fee for either a High Priority slot ($10) or a Super Priority slot ($30). This shows their products higher in the default "Featured" sorting. Super Priority products have a purple background and High Priority products have a yellow background, further setting these products apart from the usual ones.
- Product reviews: Users that have purchased a product can review the product out of five stars and leave a comment. Reviews can be sorted.
- Frontend and backend testing
- Seeding for populating database
## Technologies used
- **MERN stack**
- **Socket.io**: Chat/private messaging functionality
- **Stripe**: Allowing users to make and accept payments
- **Google OAuth2 & Passport.js**: Handling sign-in and authentication
- **Moment.js**: Library for formatting timestamps

## Run locally
    1) Ensure Node is installed.
    2) Clone this repo or download as a ZIP.
    3) In the frontend folder, run 'npm install'. Do the same for the backend folder.
    4) Run 'npm run build' in the frontend folder.
    5) Run 'npm run production' in the backend folder.
    6) Navigate to 'localhost:3000' in your browser.
## Run Tests
    1) Run backend tests: 'npm run backend-test' in backend folder
    2) Run frontend tests: 'npm run test' in frontend folder, and press 'a' for all tests
## Authors
 - Bryan Liu (bliu631)
 - Ibrahim Anees (iane056)
 - Jaskaran Sandhu (jsan956)
 - Nilay Setiya (nset793)
 - Yunting Huang (yhua972)
 - Yuzhuo Li (yil708)