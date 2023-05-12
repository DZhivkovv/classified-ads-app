import React from 'react'
import './HeroTile.scss'

export default function HeroTile(props){
    return(
        <div className={'tile--container ' + 'tile' + props.tileNum} style={tileStyle}>
            <img src={props.imgSrc} alt=''></img>
        </div>
    )
}