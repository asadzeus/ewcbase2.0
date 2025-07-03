"use client"
import { useEffect, useState } from "react";
import { CreatePost } from "../utils/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Createpost = () => {

  const [type, setType] = useState("sell");
  const [addr, setAddr] = useState("");
  const [bedroom, setBedroom] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [area, setArea] = useState(0);
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [imgUrl, setImageUrl] = useState("");
  let fileName = "";

  const router = useRouter();
  const {data: session} = useSession();


  const handleCreate = async () => {
  const coords = await getLatLongFromAddress(addr); 
  
  const uploadedUrl = await uploadImage();
  if (!uploadedUrl) return;

  const post = {
    type,
    addr,
    bedroom,
    bathroom,
    area,
    price,
    desc,
    imgUrl: uploadedUrl,
    lat: coords.lat,
    lon: coords.lon
  };

  const resp = await CreatePost(post);
  if (resp.ok) {
    toast.success("Post Created Successfully!");
    router.push("/");
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

  const deleteImg = async() =>{
    setFile(null);
    setImageUrl("");
  } 


  return (
    <div className="createpost flex flex-col justify-center items-center h-[calc(100vh-100px)] gap-5">


      <div className="createPostSection w-[60%] h-[95%] bg-gray-100 shadow-xl p-2 rounded-xl flex flex-col justify-center gap-4 items-center">
        <h1 className="font-bold text-xl">Create Post</h1>
        <div className="typeSection flex justify-center items-center gap-5">

          Do you want to sell it?
          <div className="type flex justify-center items-center gap-2">
            <label htmlFor="selled">Sell</label>
            <input type="radio" name="selled" id="sell" value="sell" defaultChecked onChange={(e) =>{setType(e.target.value);}}/>
          </div>

          <div className="type flex justify-center items-center gap-2">
            <label htmlFor="selled">Rent</label>
            <input type="radio" name="selled" id="rent" value="rent" onChange={(e) =>{setType(e.target.value);}}/>
          </div>

        </div>

        <div className="imgSection flex justify-center items-center gap-5">

          <h1 className="text-lg font-bold text-gray-400 p-1">Image:</h1>
          <div className="uploadImgBtn p-2 px-3 bg-blue-500 text-white rounded-md cursor-pointer" onClick={() => document.getElementById("fileInput").click()}>Upload Image</div>
          <input type="file" name="img" id="fileInput" className="hidden" onChange={(e) => { setFile(e.target.files?.[0]); }} />
          {
            imgUrl ? 
            <img src={imgUrl} alt="" height={50} width={100} className="border-2 rounded-md" />
            :
            <h1 className="border-2 px-4 py-2 rounded-lg text-gray-300">Image</h1>
          }
          <h1 className="text-xs">{file ? file.name : ""}</h1>
          <div className="deleteImgBtn p-2 px-3 bg-blue-500 text-white rounded-md cursor-pointer" onClick={deleteImg}>Delete Image</div>

        </div>


        <div className="addressSection flex justify-center items-center gap-2 w-[40%]">
          <label htmlFor="address">Address:</label>
          <input id='addressInput' type="text" name="address" placeholder='Search Property Address' className='outline-none border-gray-300 w-[100%] p-2 shadow-lg border-1 rounded-md' onChange={(e) => {setAddr(e.target.value)}}/>
        </div>

        <div className="midSection flex flex-col justify-center items-center gap-2 w-[80%]">


          <div className="row w-[55%] flex justify-center items-center gap-10">

            <div className="specsSection flex flex-col justify-center items-start gap-1">
              <label htmlFor="bedroom">Bedroom:</label>
              <input type="number" placeholder="ex:2" name="bedroom" id="bedroom" className="border-2 shadow-lg border-gray-300 outline-none p-2 rounded-lg" onChange={(e) => {setBedroom(e.target.value)}}/>
            </div>
            <div className="specsSection flex flex-col  justify-center items-start gap-1">
              <label htmlFor="bathroom">Bathroom:</label>
              <input type="number" placeholder="ex:1" name="bathroom" id="bathroom" className="border-2 shadow-lg border-gray-300 outline-none p-2 rounded-lg" onChange={(e) => {setBathroom(e.target.value)}}/>
            </div>

          </div>

          <div className="row w-[55%] flex justify-center items-center gap-10">

            <div className="specsSection flex flex-col justify-center items-start gap-1">
              <label htmlFor="area">Area:</label>
              <input type="number" placeholder="ex:2500" name="area" id="area" className="border-2 shadow-lg border-gray-300 outline-none p-2 rounded-lg" onChange={(e) => {setArea(e.target.value)}}/>
            </div>
            <div className="specsSection flex flex-col  justify-center items-start gap-1">
              <label htmlFor="price">Price:</label>
              <input type="number" placeholder="ex:300000" name="price" id="price" className="border-2 shadow-lg border-gray-300 outline-none p-2 rounded-lg" onChange={(e) => {setPrice(e.target.value)}}/>
            </div>

          </div>

        </div>

        <div className="descSection w-[55%] h-[20%] flex flex-col justify-center items-start gap-2">
          <label htmlFor="desc">Description:</label>
          <textarea name="desc" id="desc" placeholder="Enter description:" className="w-full h-full shadow-lg border-gray-300 outline-none resize-none p-2 border-2 rounded-lg" onChange={(e) => {setDesc(e.target.value)}}></textarea>
        </div>

        <div className="CreateBtn shadow-lg bg-green-500 py-2 px-4 text-white rounded-xl text-xl cursor-pointer" onClick={handleCreate}>Create</div>

      </div>

    </div>
  );
};

export default Createpost;
