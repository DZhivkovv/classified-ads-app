import './Ad.scss'
export default function Ad(props){
    return(
        <div className='ad'>
            <div className='ad-image'>
                <img src={`images/${props.images}`} alt={`${props.title}`}/>
            </div>
            <div className='ad-main-text'>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
            <div className='ad-details'>
                <div className='ad-details-text'>
                <p>{props.price} leva</p>
                <p>by {props.username}</p>
                <p>{props.date.slice(0,10)}</p>
                </div>
                <div className='button-container'>
                    <button>See details</button>
                </div>
            </div>
        </div>
    )
}