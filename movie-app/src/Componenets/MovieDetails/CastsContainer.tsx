import React, { useState } from 'react'
import './MovieDetails.scss'
import { Avatar } from '@mui/material';

interface Cast {adult:boolean;
    cast_id:number;
    character:string;
    credit_id:string;
    gender:number;
    id:number;
    known_for_department:string;
    name:string;
    order:number;
    original_name:string;
    popularity:number;
    profile_path:string;
  }

interface Crew {
    adult : boolean;
    credit_id : string;
    department : string;
    gender : number;
    id : number;
    job : string;
    known_for_department : string;
    name : string;
    original_name : string;
    popularity : number;
    profile_path : string;
  };

interface CastsContainerProps {
    casts: (Cast | Crew)[]
}

export const CastsContainer = ({casts}: CastsContainerProps) => {
    const [scrollPosition, setScrollPosition] = useState(0);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const delta = event.deltaX || event.deltaY;

    const newScrollPosition = scrollPosition + delta;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const clampedScroll = Math.max(0, Math.min(newScrollPosition, maxScroll));

    setScrollPosition(clampedScroll);
};
console.log(casts)
  return (
    <div
      className="horizontal-scroll-container"
      onWheel={handleWheel}
    >
        {
            casts.map(cast => {
                return <div
                className="horizontal-scroll-content"
                style={{ transform: `translateX(-${scrollPosition}px)` }}
              >
                <div className='badge'>
                    <Avatar
                      alt="Remy Sharp"
                      src={`https://image.tmdb.org/t/p/w92${cast.profile_path}`}
                      sx={{ width: 90, height: 95 }}
                      style={{margin: 'auto'}}
                    />
                    <p>{cast.name}</p>
                    
                </div>
              </div>
            })
        }
      
    </div>
  )
}
