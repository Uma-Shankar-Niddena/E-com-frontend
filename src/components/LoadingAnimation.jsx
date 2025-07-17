import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

// Replace with actual Lottie JSON URLs or local paths from LottieFiles
const animations = {
  intro1: '/winebottleAni.json',
  intro2: '/Beachvacation.json', 
  chefdancing:'/chefdancing.json',
  coke:'/water.json',
  cigar:'/smoke.json',
  cigar2:'/smoke2.json'
  // Fixed typo: iintro2 -> intro2
};

function LoadingAnimation({ cate }) {
  const animationUrl = animations.intro1;
  const animationUrl2 = animations.intro2;
  const chef=animations.chefdancing
  const coke=animations.coke
  const smoke=animations.cigar2
  const smoke2=animations.cigar
  // Function to determine which Player(s) to render based on cate
  const renderPlayers = () => {
    switch (cate) {
      case 'wine':
        return (
          <>

           <Player
              autoplay
              loop
              src={animationUrl} // winebottleAni.json
              style={{ height: '200px', width: '200px', marginRight:"50vw" }}
            />

            <Player
              autoplay
              loop
              src={animationUrl2} // Beachvacation.json
              style={{ height: '200px', width: '200px' }}
            />
            {/* Optionally include second Player if needed */}
           
          </>
        );
      case 'stuff':
       return (
        <>

           <Player
              autoplay
              loop
              src={chef} // winebottleAni.json
              style={{ height: '200px', width: '200px', marginRight:"50vw" }}
            />

            <Player
              autoplay
              loop
              src={animationUrl2} // Beachvacation.json
              style={{ height: '200px', width: '200px' }}
            />
            {/* Optionally include second Player if needed */}
           
          </>


       ) 
       
       case 'water':
        return (
        <>

           <Player
              autoplay
              loop
              src={coke} // winebottleAni.json
              style={{ height: '200px', width: '200px', marginRight:"50vw" }}
            />

            <Player
              autoplay
              loop
              src={animationUrl2} // Beachvacation.json
              style={{ height: '200px', width: '200px' }}
            />
            {/* Optionally include second Player if needed */}
           
          </>


       ) 
       case 'cigar':
         return (
        <>

           <Player
              autoplay
              loop
              src={smoke2} // winebottleAni.json
              style={{ height: '200px', width: '200px', marginRight:"50vw" }}
            />

            <Player
              autoplay
              loop
              src={smoke} // Beachvacation.json
              style={{ height: '200px', width: '200px' }}
            />
            {/* Optionally include second Player if needed */}
           
          </>


       ) 


        default:
        
     
    }
  };

  return (
    <div className="flex justify-between w-full  bg-gray-100 flex-1 gap-6">
      {renderPlayers()}
    </div>
  );
}

export default LoadingAnimation;