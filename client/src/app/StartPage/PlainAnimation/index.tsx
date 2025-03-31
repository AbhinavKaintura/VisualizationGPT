"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Plane from '@/assets/images/plane.png';
import Tracks from '@/assets/images/Half_Tracks.png';
import '@/app/StartPage/PlainAnimation/index.css'

export default function PlaneAnimation() {
    const [showElements, setShowElements] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        const showTimer = setTimeout(() => {
            setShowElements(true);
        }, 1000); // 1 second delay to show elements

        const animationTimer = setTimeout(() => {
            setStartAnimation(true);
        }, 1500); // 1.5 second delay to start animation (0.5s after showing elements)

        return () => {
            clearTimeout(showTimer);
            clearTimeout(animationTimer);
        };
    }, []);

    return (
        <div className='flex justify-center fixed bottom-0 left-0 right-0 '>
        <div className='relative w-[55rem]'>
            <div className={`track w-full ${showElements  && 'visible'}`}>
                <Image src={Tracks} alt="Fly Tracks"  />
            </div>
            <div className={` ${startAnimation && 'spin'} absolute bottom-0 w-full `}>
                <Image
                    src={Plane}
                    alt="Flying Plane"
                    className={`plane h-12 w-12 ${showElements && 'visible'} transform -rotate-45 `}
                />
            </div>
        </div>
        </div>
    );
}