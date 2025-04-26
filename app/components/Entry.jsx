'use client';
import React from 'react';
// import {Canvas} from '@react-three/fiber'
// import Code from "./Code"
// import FilmRoll from "./FilmRoll"
import Computer from "./Computer"
// import Sunrise from './Sunrise';
import dynamic from 'next/dynamic';
const Sunrise = dynamic(() => import('./Sunrise'), {
    ssr: false,
    loading: () => <p>Loading canvas...</p>
  });
  
function Entry()
{
    return (
        <section className = "relative h-screen w-full">
            <div className="absolute inset-0 z-0">
                <Sunrise />
            </div>

            <div className='relative z-10 h-full w-full flex items-center justify-between px-4'>
                {/* <div className = "w-1/4 h-full">
                <Code/>
                </div> */}

                <div className = "w-1/2 h-full flex items-center justify-center">
                    <Computer/>
                </div>

            

                

                {/* <div className = "w-1/4 h-full">
                    <FilmRoll/>
                </div> */}
            </div>
            
        </section>
    )
}

export default Entry;
