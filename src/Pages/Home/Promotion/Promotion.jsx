import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Promotion = ({ advertise }) => {
    // const adv = advertise.map((adv, i) => console.log(adv, i))
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (
        <div className='p-6'>
            <h3 className="text-3xl font-bold text-center dark:text-white mb-3">Cars You May Like</h3>
            <div className='w-full m-auto'>
                <Slider {...settings}>
                    {advertise?.map(adv => <div key={adv._id} className="">
                        <img src={adv.image} className="w-full h-[140px] md:h-[400px] rounded-lg" alt="" />
                    </div>)}
                </Slider>
            </div>
        </div>
    );
};

export default Promotion;