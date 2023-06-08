import { Link } from 'react-router-dom'
import noImage from '../../assets/no-image.png'
import './Ad.scss'
export default function Ad(props){
    return(
        <div className='ad'>
            <div className='ad-image'>
                {props.images === undefined ?
                <img src={noImage} className='no-image' alt="Not provided"/>
                :
                <img src={props.images} alt={`${props.title}`}/>
                }
            </div>
            <div className='ad-main-text'>
                <h3>{props.title}</h3>
                <div className='ad-details-icons'>
                    {props.freeShipping === true && <i title="Free Shipping! The shipping will be paid by the seller." class="fa-solid fa-truck"></i>}
                    {props.itemIsNew === true && <i title = "The item is not used" class="fa-solid fa-box"></i>}
                </div>
            </div>
            <div className='ad-details'>
                <div className='ad-details-text'>
                <p className='ad-price'>{props.price} leva</p>
                <p className='ad-seller'>by {props.username}</p>
                <p className='ad-category'>{props.category}</p>
                <p className='ad-date'>{props.date.slice(0,10)}</p>
                </div>
                <div className='button-container'>
                    <Link to={`/ads/${props.id}`}>Read more</Link>
                </div>
            </div>
        </div>
    )
}