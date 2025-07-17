import Image from 'next/image';
import React, { useState } from 'react';

export default function SelectStyle({onUserSelect}) {
  const [selectedStyle, setSelectedStyle] = useState(null);

  const styleOptions = [
    { name: 'realistic', image: '/real.png.jpg' },
    { name: 'cartoons', image: '/cartoon.jpg' },
    { name: 'comic', image: '/comic.png' },
    { name: 'watercolor', image: '/watercolor.jpg' },
    { name: 'GTA', image: '/gta.jpg' },
    { name: 'anime', image: '/anime.jpg' }
  ];

  const handleSelect = (styleName) => {
    setSelectedStyle(styleName);
  };

  return (
    <div className='mt-7'>
      <h2 className='font-bold text-2xl text-primary'>Style</h2>
      <p className='text-gray-500'>Select your Video Style</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((style) => (
          <div
            key={style.name}
            onClick={() => handleSelect(style.name)}
            className={`
              relative group cursor-pointer rounded-lg overflow-hidden shadow-lg 
              transition-shadow duration-300
              ${selectedStyle === style.name ? 'ring-4 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'}
            `}
          >
            <Image
              src={style.image}
              alt={style.name}
              width={300}
              height={300}
              className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"

              onClick={()=>{
                setSelectedStyle(style.name)
                onUserSelect('imageStyle',style.name
                )
              }}
            />
            <div className="absolute bottom-0 w-full bg-black/60 text-white text-center py-1 text-sm font-semibold">
              {style.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
