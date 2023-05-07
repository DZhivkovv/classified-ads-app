import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import './Carousel.scss'

export const EmblaCarousel = (props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: false},[Autoplay({delay: 3000})]);

    useEffect(() => {
        if (emblaApi) {
        }  
    }, [emblaApi])

    const sliders = props.images.map(image => (
        <div className="embla__slide">
            <img src={`/images/${image}`}/>
        </div>

    ))

    return (
        <div className='embla' ref={emblaRef}>
            <div className="embla__container">      
                {sliders}
            </div>
        </div>
    )
}