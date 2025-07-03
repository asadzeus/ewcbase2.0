import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

const PostItem = (item) => {

  return (
    <div className="PostItem flex flex-col justify-around items-start h-[325px] w-[350px] p-2 cursor-pointer rounded-xl hover:border-2">
      <img src={item.image} alt="" className='rounded-xl w-full h-[175px]' />
      <div className="price font-bold">{item.price}$</div>
      <div className="address"><LocationOnRoundedIcon className='text-red-500'/> {item.address}</div>
      <div className="specs flex gap-6 justify-center items-center ">
        <div className="spec1 bg-gray-300 py-2 px-4 rounded-md flex justify-center items-center gap-2"><HotelIcon/> {item.bedroom}</div>
        <div className="spec2 bg-gray-300 py-2 px-4 rounded-md flex justify-center items-center gap-2 "><BathtubIcon/> {item.bathroom}</div>
        <div className="spec3 bg-gray-300 py-2 px-4 rounded-md flex justify-center items-center gap-2 "><SquareFootIcon/> {item.area}</div>
      </div>
    </div>
  );
};

export default PostItem;
