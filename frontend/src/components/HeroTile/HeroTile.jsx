import React from 'react'
import './HeroTile.scss'

export default function HeroTile(props){
    
    function isWhiteOrNuanceOfWhite(color) {
        const rgb = hexToRGB(color, 1);
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        
        // Check if the color is white or a nuance of white
        return r >= 200 && g >= 200 && b >= 200;
    }   
    
      function hexToRGB(hex, opacity) {
        const rgb = hex
          .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
          .substring(1)
          .match(/.{2}/g)
          .map(x => parseInt(x, 16));
      
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
    }

    let randomColor;
    do {
      randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate a random color code
    } while (isWhiteOrNuanceOfWhite(randomColor)); // Repeat until a non-white color is generated
        
    const smokyColor = hexToRGB(randomColor, 0.5); 

    const tileStyle = {
      backgroundColor: smokyColor,
    };

    return(
        <div className={'tile--container ' + 'tile' + props.tileNum} style={tileStyle}>
            <img src={props.imgSrc} alt=''></img>
        </div>
    )
}