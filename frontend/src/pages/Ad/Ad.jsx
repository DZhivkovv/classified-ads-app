import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar.jsx'
import { EmblaCarousel } from '../../components/Carousel/Carousel.jsx'
import { Oval } from  'react-loader-spinner'
import './Ad.scss'
import noImages from '../../assets/no-image.png'
import noProfilePic from '../../assets/AdPage/noProfilePic.png'

export default function Ad(props){
    const [ad, setAd] = useState(null);
    const { id } = useParams();

    //Fetches data about the advertisement from the database using the ad's ID
    useEffect(()=>{
        fetch(`http://localhost:3001/ads/${id}`)
        .then(res => res.json())
        .then(data => setAd(data))
        .catch(err => console.error(err))
    }, [id])

    /*A loader will be displayed while the advertisement loads */
    if(!ad){
        return <Oval
        height={100}
        width={100}
        radius={9}
        color="rgb(218, 37, 218)"
        ariaLabel="oval-loading"
        wrapperStyle={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            borderRadius: "15px"
          }}
        wrapperClassName="loader"
        />
    }

    return(
        <div className='ad-container'>
            <Navbar
                links={['Ads', 'Contact us']}
            />
            <div className='ad'>
                <div className='ad-upper'>
                    <div className='ad-image-container'>
                        {/*If the user has not provided any photos for the item they are selling, a placeholder image will be displayed*/}
                        {ad.images.length === 0 ? 
                            <div className='no-images'>
                            <img src={noImages} alt='Not provided'/>
                            <p>The user has not provided any images</p>
                            </div>
                            :
                            <EmblaCarousel 
                            images={ad.images}
                            />    
                        }
                    </div>

                    {/*Information about the product such as description and price  */}
                    <div className='ad-data-container'>
                        <h2 className='data-title'>{ad.title}</h2>
                        <p className='data-description'>{ad.description}</p>
                        <div className='ad-order'>
            	            <p className='data-price'>Price: {ad.price} leva</p>
                        </div>
                    </div>
                </div>

                {/*Information about the user selling the product*/}
                <div className='ad-lower'>
                    <div className='ad-user-container'>
                    <p>Posted by: <Link to={`/users/${ad.userID}`}>{ad.username}</Link></p>
                    <img src={noProfilePic} className='default-profile' alt='No profile img'/>

                    <Link className='message-user-btn' to={`/message/${ad.userID}`}>Text the seller</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}