import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Ad.scss'

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
            <p>Title: {ad.title}</p>
            <p>Description: {ad.description}</p>
            <p>Price: {ad.price}</p>
            <p>Posted by: {ad.username}</p>
            <img src={`/images/${ad.images}`} alt={`${ad.title}`}/>
        </div>
    )
}