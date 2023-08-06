import React from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ReactPlayer from "react-player";

const Watch = () => {
    const router = useRouter();
    const {movieId} = router.query;

    const {data} = useMovie(movieId as string);
    const videoUrl = data?.videoUrl;

    return (
       <div className='h-screen w-scree bg-black'>
         <nav className="fixed 
            w-full 
            p-4 
            z-10 
            flex 
            flex-row 
            items-center 
            gap-8 
            bg-black 
            bg-opacity">
            <AiOutlineArrowLeft onClick={()=> router.push('/')} className="text-white
             size={40}"/>
             <p className="text-white text-1xl md:text-3xl font-bold">
                <span className="font-light">
                    Watching: 
                </span>
                {data?.title}                
             </p>
         </nav>
         
         <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video>
         {/*   IF YOU WANNA PLAY YOUTUBE VIDEO
         <iframe
            className="
            display: flex
            justify-content: center 
            align-items: center
            "
            width="100%"
            height="90%"
            src={`https://www.youtube.com/embed/${videoUrl}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        */}

       </div>
    )
}
export default Watch;