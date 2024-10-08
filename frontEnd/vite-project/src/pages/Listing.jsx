
import React, { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
// import { list, listAll } from "firebase/storage";
import Contact from "../Components/Contact";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa6";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa6";


const Listing = () => {
    SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);

  const params = useParams();
  const {currentUser}=useSelector((state)=>state.user)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (data === false) {
            setError(true);
            setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false)
      } catch (error) {
        setError(true);
        setLoading(false);

      }
    };
    fetchListing();
  },[params.listingId]);
  return <div>
    {loading && <p className="text-center my-7 text-2xl">Loading....</p>}
    {error && <p className="text-center">Something went wrong</p>}
    {
        listing && !loading && !error &&(
            <div>
           <Swiper navigation>
            {  listing.imageUrls.map((url)=>(
             <SwiperSlide key={url}>
                 <div className="h-[550px]"  style={{background:`url(${url}) center no-repeat ` ,backgroundSize:'cover'}} >
              </div>
             </SwiperSlide>
            ))}
           </Swiper>
           <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">

         <p className="text-2xl font-semibold">
            {listing.name} -${' '}

            {listing.offer?
            listing.discountPrice.toLocaleString('en-us')
         : listing.regularPrice.toLocaleString('en-us')
           }
           {listing.type=='rent' && '/month'}
            
         </p>

           <p className="flex items-center mt-6  gap-2 text-sm text-slate-600">
           <FaMapMarkerAlt  className="text-green-700"/>
           {listing.address}
           </p>

           <div className="flex gap-4">
                <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1  rounded-md">
                    {listing.type=='rent'?'For rent':'For sale'}
                </p>
                {
                    listing.offer&& (
                        <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1  rounded-md">
                            ${+listing.regularPrice -  +listing.discountPrice} OFF
                        </p>
                    )
                }

              </div>
              <p className="text-slate-800"><span className="font-semibold text-black">
              Description:- {' '}</span>{listing.description}</p>
              <ul className="text-green-900 font-semibold flex items-center gap-4 flex-wrap text-sm sm:gap-6">
                <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed  className="text-lg"/>
               {listing.bedrooms > 1 ?`${listing.bedrooms}beds`: `${listing.bedrooms}bed`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath  className="text-lg"/>
               {listing.bathrooms > 1 ?`${listing.bathrooms}baths`: `${listing.bathrooms}bath`}
                </li>

                <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking  className="text-lg"/>
               {listing.parking  ? 'Parking spot': 'No Parking'}
                </li>

                
                <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair  className="text-lg"/>
               {listing.furnished  ? 'Furnished': 'Unfurnished'}
                </li>
              </ul>
              {
          currentUser && listing.userRef!==currentUser._id && !contact&& (
        
            <button onClick={()=>setContact(true)} 
            className="bg-slate-600 text-white p-3 rounded-lg uppercase 
            hover:opacity-95">Contact landlord</button>
          )
              }
              {
                contact && <Contact listing={listing}></Contact>
              }
              
              </div>
           
            </div>
        )
    }
  </div>;
};

export default Listing;
