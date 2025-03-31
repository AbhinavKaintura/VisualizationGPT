"use client"
import React from "react";
import Image404 from "@/assets/images/404-error.png";
import Image from "next/image";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Custom404 = () => {
  const route=useRouter();
  return (
    <div className="ChatBG min-h-[100vh] flex flex-col gap-8   items-center justify-center ">
        <div className="flex flex-col gap-1 items-center justify-center w-full">
        <Image src={Image404} alt="404 Image" height={"320"} width={"320"} />

        <h1 className="md:text-[45px] text-[35px]  ">
        ERROR - 404
        </h1>
        <h2 className="md:text-[30px] text-[25px]">
        Oops! Page Not Found
        </h2>
        <div className="md:max-w-[40%] max-w-[90%]  text-center">We&#39;re sorry, but the page you&#39;re looking for doesn&#39;t exist. It might have been moved or deleted. Let&#39;s get you back on track!</div>
        </div>
        <div className='gradient-border h-[3.8rem] '>
            <button onClick={()=>route.back()} className='h-full w-full items-center px-5 justify-center bg-black rounded-[5px]'>
              <div className='flex gap-1 gradient-text items-center font-bold'><IoArrowBackSharp className="font-bold text-[#FF00C7] text-[22px]" />Go Back</div>
            </button>
          </div>   
      </div>
  );
};

export default Custom404;