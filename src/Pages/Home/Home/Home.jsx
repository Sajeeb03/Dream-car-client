import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import CarPhoto from '../CarPhoto/CarPhoto';

import Categories from '../Categories/Categories';
import Promotion from '../Promotion/Promotion';

import Slider from '../Slider/Slider';


const Home = () => {
    const { data: advertise = null } = useQuery({
        queryKey: ["advertise"],
        queryFn: async () => {
            try {
                const res = await axios(`https://dream-car-server-sajeeb03.vercel.app/advertise`)
                return res.data.data;
            } catch (error) {
                console.log(error)
            }
        }
    })


    return (
        <div>
            <Slider />
            <Categories />
            {
                advertise?.length !== 0 && <Promotion advertise={advertise} />
            }
            <CarPhoto />
        </div>
    );
};

export default Home;