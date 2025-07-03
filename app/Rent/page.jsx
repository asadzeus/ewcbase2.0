"use client"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import Map from '../components/map/Map';
import { useEffect, useState } from 'react';
import PostItem from '../components/PostItem';
import { GetRentedHouses } from '../utils/utils';


const Rent = () => {

  const [rentedHouses, setRentedHouses] =  useState();
  const [foundCount, setFoundCount] =  useState(0);
  const [coords, setCoords] =  useState([51,0]);

  useEffect(()=>{
    GetRentedHouses(setRentedHouses);
  },[]);

  useEffect(()=>{
    console.log(rentedHouses);
  },[rentedHouses]);

  useEffect(()=>{
    if(rentedHouses){
      console.log("rented houses: ", rentedHouses);
      setFoundCount(rentedHouses.length);
      
    }
  },[rentedHouses]);

    const handleSearch = async () => {
    const address = document.getElementById('addressInput').value;
    const coords = await getLatLongFromAddress(address);
    if (coords) {
      setCoords([parseFloat(coords.lat), parseFloat(coords.lon)]);
      console.log("Coordinates:", [parseFloat(coords.lat), parseFloat(coords.lon)]);
    }
  };

  const getLatLongFromAddress = async (address) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { lat, lon };
    }
    return null;
  };



  return (
    <div className="home flex justify-center items-center h-[calc(100vh-100px)]"> 
      <div className='left flex-1 flex flex-col gap-4 justify-center items-center'>
        <div className="leftContainer w-[90%] h-[550px] flex flex-col gap-6 p-4">
          
          <div className="searchbar flex justify-around items-center h-[40px] w-full rounded-md gap-1">
            
            <div className="searchIcon p-2 bg-[var(--primary-color)] rounded-md w-[max-content]">
              <LocationOnRoundedIcon className='text-white'/>
            </div>
            <input type="text" name="" id='addressInput' placeholder='Search Property Address' className='p-2 h-[100%] w-full border-1 rounded-md'/>
            <div className="searchBtn flex justify-center items-center gap-2 bg-[var(--primary-color)] text-white ml-4 cursor-pointer py-2 px-4 rounded-md" onClick={() => handleSearch()}><SearchRoundedIcon/> Search</div>
          </div>

          <div className="filters flex justify-start items-center gap-4 w-full ">
            <select name="Bed" id="Bed" className="border-1 p-2 px-4 rounded-md border-gray-400 appearance-none">
              <option value="Bed">Bed</option>
            </select>
              <select name="Bath" id="Bath" className="border-1 p-2 px-4 rounded-md border-gray-400 appearance-none">
              <option value="Bath">Bath</option>
            </select>
              <select name="Parking" id="Parking" className="border-1 p-2 px-4 rounded-md border-gray-400 appearance-none">
              <option value="Parking">Parking</option>
            </select>
              <select name="HomeType" id="HomeType" className="border-1 p-2 px-4 rounded-md border-gray-400 appearance-none">
              <option value="HomeType">Home Type</option>
            </select> 
          </div>

          <div className="foundText">Found <span className='font-bold'>{foundCount}</span> results in <span className="foundLoc">Turkey/Ankara</span></div>


          <div className="foundSlider flex justify-start items-center gap-10  ">
            
            
            {Array.isArray(rentedHouses) && rentedHouses.map((item, index) =>(
              <a key={index} href={"/post/" + item.postId}><PostItem  id={item.postId} price={item.price} address={item.address} bedroom={item.bedroom} bathroom={item.bathroom} area={item.area} image={item.image}/></a>
            ))}

          </div>
        </div>
      </div>
     
      <div className='right flex-1 flex justify-center items-center h-full'>
        <Map position={coords} zoom={13} style="w-[550px] h-[550px] rounded-xl border-2 border-black" />
      </div>
    </div>
  );

};

export default Rent;
