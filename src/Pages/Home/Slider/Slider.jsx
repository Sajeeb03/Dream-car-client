import React from 'react';
import img1 from '../../../assets/slider/1.jpeg';
import img2 from '../../../assets/slider/2.jpeg';
import img3 from '../../../assets/slider/3.jpeg';
import SliderItem from './SliderItem';
const Slider = () => {
    const slider = [
        {
            id: 1,
            image: img1,
            prev: 3,
            next: 2
        },
        {
            id: 2,
            image: img2,
            prev: 1,
            next: 3
        },
        {
            id: 3,
            image: img3,
            prev: 2,
            next: 1
        }]
    return (
        <div className="carousel w-full lg:h-[600px]">
            {
                slider.map(slide => <SliderItem
                    key={slide.id}
                    slide={slide}
                ></SliderItem>)
            }
        </div>
    );
};

export default Slider;