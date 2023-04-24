import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthorLayout from '../components/AuthorLayout';
import AuthorLayoutUserview from '../components/AuthorLayoutUserview';


const DUMMY_DATA = [
    {   
        aid: 2,
        url: 'https://upload.wikimedia.org/wikipedia/en/e/e7/Steve_%28Minecraft%29.png',
        name: 'steve',
        average_rating:4.4,
        average_response:'2 days',
        assets_sold:985,
        account_type:'Member',
        bio: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {   
        aid: 4,
        url: 'https://attackofthefanboy.com/wp-content/uploads/2023/02/Herobrine-Minecraft.jpg',
        name: 'herobrine',
        average_rating:4.4,
        average_response:'2 days',
        assets_sold:985,
        account_type:'Member',
        bio: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {   
        aid: 6,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFZUlClbYfJUR1_KPHgV9OGJcxK-LSzDruDQ&usqp=CAU',
        name: 'bob',
        average_rating:4.4,
        average_response:'2 days',
        assets_sold:985,
        account_type:'Member',
        bio: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    
];


const AuthorPage = () => { 
    const [authors,setAuthors] = useState(DUMMY_DATA);
    
    const [role,setRole] = useState('user');

    const params = useParams();

    let authorDetails = {};

    authors.forEach((author) => {
        if (+author.aid === +params.aid){
            authorDetails = author;
        }
    })

    console.log(authorDetails) 
    
    const whovisit=()=>{
        if(current_aid===authorpage_aid){
            setRole('admin')
        }
        else{
            setRole('user')
        }

    }
    
    return (
        <div>
            {role === 'admin' && <AuthorLayout author={authorDetails}/>}
            {role === 'user' && <AuthorLayoutUserview author={authorDetails}/>}
        </div>
    );
}

export default AuthorPage;