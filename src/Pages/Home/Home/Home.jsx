import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

import Categories from '../Categories/Categories';
import Promotion from '../Promotion/Promotion';

import Slider from '../Slider/Slider';


const Home = () => {
    const { data: advertise = null } = useQuery({
        queryKey: ["advertise"],
        queryFn: async () => {
            try {
                const res = await axios(`http://localhost:5000/advertise`)
                return res.data.data;
            } catch (error) {
                console.log(error)
            }
        }
    })

    console.log(advertise)
    return (
        <div>
            <Slider />
            <Categories />
            {
                advertise?.length !== 0 && <Promotion advertise={advertise} />
            }

        </div>
    );
};

export default Home;