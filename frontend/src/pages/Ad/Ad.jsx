import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar.jsx'
import './Ad.scss'
import noProfilePic from '../../assets/AdPage/noProfilePic.png'

export default function Ad(props){
    const [ad, setAd] = useState(null);
    const { id } = useParams();

    useEffect(()=>{
        fetch(`http://localhost:3001/ads/${id}`)
        .then(res => res.json())
        .then(data => setAd(data))
        .catch(err => console.error(err))
    }, [id])

    if(!ad){
        return <div>Loading...</div>
    }

    return(
        <div className='ad-container'>
            <Navbar
                links={['Ads', 'Contact us']}
            />
            <div className='ad'>
                <div className='ad-upper'>
                    <div className='ad-image-container'>
                        <img src={`/images/${ad.images}`} alt={`${ad.title}`}/>
                    </div>

                    <div className='ad-data-container'>
                        <h2 className='data-title'>{ad.title}</h2>
                        <p className='data-description'>{ad.description}</p>
                        <div className='ad-order'>
            	            <p className='data-price'>Price: {ad.price} leva</p>
                        </div>
                    </div>
                </div>
                <div className='ad-lower'>
                    <div className='ad-user-container'>
                    <p>Posted by: {ad.username}</p>
                    <img src={noProfilePic} className='default-profile' alt='No profile img'/>

                    <button>Text the seller</button>
                    </div>
                </div>
            </div>
        </div>
    )
}