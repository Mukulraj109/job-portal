import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className='text-center bg-gradient-to-b from-white to-gray-100 py-20'>
            <div className='flex flex-col gap-6 my-10 max-w-3xl mx-auto'>
                <span className='mx-auto px-5 py-3 rounded-full bg-[#F83002] text-white font-semibold tracking-wider uppercase shadow-md'>
                    No. 1 Job Hunt Website
                </span>
                <h1 className='text-6xl font-extrabold leading-tight text-gray-800'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p className='text-lg text-gray-600'>
                    Discover countless opportunities across various industries, tailor your search to match your aspirations, and take the first step towards your future. Your dream job is just a search away!
                </p>
                <div className='flex w-full shadow-lg border border-gray-200 pl-4 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full py-3 text-gray-700 placeholder-gray-500 rounded-full pl-3'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] text-white px-8 py-3 hover:bg-[#5a2e9c] transition-colors">
                        <Search className='h-6 w-6' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
