"use client"
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import VillaRoundedIcon from '@mui/icons-material/VillaRounded';
import Image from "next/image";

const Navbar = () => {

  const { data: session, status } = useSession();

  return (
    <div className="navbar flex justify-center items-center h-[100px]">

      <div className='left flex justify-center items-center flex-1  gap-10'>
        <a href="/" className="logo text-3xl flex justify-center items-center gap-2"><VillaRoundedIcon fontSize="inherit"/> Real Estatingo</a>
        <a href="/">For Sell</a>
        <a href="/Rent">For Rent</a>
      </div>

      <div className='right flex justify-center items-center flex-1 gap-6 h-14'>
        
        <a href="/CreatePost" className="bg-[var(--primary-color)] py-4 px-6 h-full rounded-md text-white">+ Post Your Ad</a>

        {
          session ? 
          
          <div className="profileSection relative h-14">
            <a href="/Profile" className="flex justify-center items-center gap-2 p-2 h-full rounded-md h-[calc(100vh-100px)] px-6 py-2 h-full hover:bg-[var(--primary-color)] hover:text-white" >

              <Image width={40} height={40} className="aspect-1/1 border-2 border-black rounded-[50%] " src={session?.user?.image ? session?.user?.image : "/profileicon.png"} alt="profile image" /> 
              <span>{session?.user?.name}</span>  
            </a>  
          </div>
            :
          <a href="/sign-in" className="flex justify-center items-center gap-2 "><img className="h-[40px] w-[40px] rounded-[50%]" src="/profileicon.png" alt="profile image" />Sign In</a>
       
        }

      </div>

    </div>
  );
};

export default Navbar;

