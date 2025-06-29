import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [LoadedVideos, setLoadedVideos] = useState(0);
  const totalVideos = 4;
  const nextVideoRef = useRef(null);
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  const handleVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };
  useEffect(() => {
    if(LoadedVideos === totalVideos -1){
    setIsLoading(false)
    }
  }, [LoadedVideos]);
  const getVidoesSrc = (index) => `videos/hero-${index}.mp4`;

  useGSAP(()=>{
    if(hasClicked){
      gsap.set('#next-video',{visibility:'visible'})

      gsap.to('#next-video',{
        duration:1,
        transformOrigin:'center center',
        scale:1,
        width:'100%',
        height:'100%',
        ease:'power1.inOut',
        onStart:()=>nextVideoRef.current.play(),

      })
      gsap.from('#current-video',{
        duration:1.5,
        transformOrigin:"center center",
        scale:0,
        ease:'power1.inOut'
      
      })
    }
  },[currentIndex],true)

  useGSAP(()=>{
      gsap.set("#video-frame",{
        clipPath:'polygon(14% 0%, 72% 0%, 88% 90%, 0% 95%)',
        borderRadius:'0% 0% 40% 10%'
      })
      gsap.from('#video-frame',{
        clipPath:'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        borderRadius:'0% 0% 0% 0%',
        ease:'power1.inOut',
        scrollTrigger:{
          trigger:'#video-frame',
          start:'center center',
          end:'bottom center',
          scrub:'true',
        },
      });
    });
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">

      {isLoading && (
        <div className="flex absolute items-center justify-center z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"/>
            <div className="three-body__dot"/>
            <div className="three-body__dot"/>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute  z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            
            <div
              onClick={handleVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVidoesSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center object-cover scale-150 object-center "
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <div className="">
            <video
              ref={nextVideoRef}
              src={getVidoesSrc(currentIndex)}
              loop
              muted
              id="next-video"
              className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
              onLoadedData={handleVideoLoad}
            />
            <video
              src={getVidoesSrc(currentIndex)}
              autoPlay
              loop
              muted
              className="absolute left-0 top-0 size-full object-cover object-center "
              onLoadedData={handleVideoLoad}
            />
          </div>

          <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 ">
            G<b>A</b>ming
          </h1>

          <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
              <h1 className="special-font hero-heading text-blue-100 ">
                redefi<b>n</b>e
              </h1>

              <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                Enter the Metagame Layer <br />
                Unleash the Play Economy{" "}
              </p>

              <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>} containerClass='bg-yellow-300 flex-center gap-1'  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
