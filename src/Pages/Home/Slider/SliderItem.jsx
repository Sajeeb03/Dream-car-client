import React from 'react';
import "./slider.css";
import Typewriter from 'typewriter-effect'
const SliderItem = ({ slide }) => {
    const { image, id, prev, next } = slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='slider-img'>
                <img src={image} alt="" className="w-[1280px] h-full" />
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mr-2">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle">❯</a>
            </div>

            <div className='absolute top-5 sm:top-[35%] md:top-[40%] left-12 w-3/4'>

                {/* <h1 className="text-2xl md:text-5xl font-bold text-white">Buy Your <span className="text-3xl md:text-6xl text-info">Dream Car</span></h1> */}
                <h1 className="text-2xl md:text-5xl font-bold text-white"><Typewriter
                    options={{
                        strings: ['Buy Your Dream Car', 'Sell Your Car'],
                        autoStart: true,
                        loop: true,
                    }}
                /></h1>
                <p className='text-white text-lg font-semibold uppercase mt-2'>in affordable price.</p>
                <h2 className="text-xl text-white font-bold w-3/4 md:w-full">Worlds most popular <span className='text-info uppercase'>car reselling</span> website.</h2>
            </div>
        </div>
    );
};

export default SliderItem;