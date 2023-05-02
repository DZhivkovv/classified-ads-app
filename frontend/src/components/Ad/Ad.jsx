import './Ad.scss'
export default function Ad(props){
    return(
        <div className='ad'>
            <img src={`images/${props.images}`} className='ad--image' alt={`${props.title}`}/>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <p>{props.price}</p>
            <p>{props.date}</p>
            <p>Uploaded by {props.username}</p>
        </div>
    )
}