import { Link } from 'react-router-dom'
import './Ad.scss'
export default function Ad(props){
    return(
        <div className='ad'>
            <div className='ad-image'>
                <img src={`/images/${props.images}`} alt={`${props.title}`}/>
            </div>
            <div className='ad-main-text'>
                <h3>{props.title}</h3>
                <div className='ad-details-icons'>
                    {props.freeShipping === true && <i title="Free Shipping! The shipping will be paid by the seller." class="fa-solid fa-truck"></i>}
                    {props.itemIsNew === true && <i title = "The item is new" class="fa-solid fa-box"></i>}
                </div>
            </div>
            <div className='ad-details'>
                <div className='ad-details-text'>
                <p>{props.price} leva</p>
                <p>by {props.username}</p>
                <p>{props.category}</p>
                <p>{props.date.slice(0,10)}</p>
                </div>
                <div className='button-container'>
                    <Link to={`/ads/${props.id}`}>Read more</Link>
                </div>
            </div>
        </div>
    )
}