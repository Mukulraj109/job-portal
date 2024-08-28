import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="bg-gradient-to-b from-gray-100 to-white py-10">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800">Explore by Category</h2>
                <p className="text-lg text-gray-600">Find jobs that fit your skills and interests.</p>
            </div>
            <Carousel className="w-full max-w-4xl mx-auto my-10">
                <CarouselContent className="flex gap-4">
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className="flex-none  md:basis-1/4 lg:basis-1/4">
                            <Button 
                                onClick={() => searchJobHandler(category)} 
                                variant="outline" 
                                className="w-full rounded-full border-gray-300 text-gray-800 hover:bg-[#6A38C2] hover:text-white transition-colors py-3"
                            >
                                {category}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-gray-600 hover:text-[#6A38C2]" />
                <CarouselNext className="text-gray-600 hover:text-[#6A38C2]" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
