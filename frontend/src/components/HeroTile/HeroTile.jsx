import React from 'react'
import './HeroTile.scss'

export default function HeroTile(props){
    return(
        <div className={'tile--container ' + 'tile' + props.tileNum}>
            Random section 
        </div>
    )
}