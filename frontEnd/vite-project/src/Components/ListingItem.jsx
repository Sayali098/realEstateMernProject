import React from 'react'
import { MdLocationOn } from "react-icons/md";
import { Link } from 'react-router-dom'

const ListingItem = ({listing}) => {
  return (
    <div className='bg-white shadow-md hover:shadow-lg rounded-lg w-full sm:w-[330px] transition-shadow overflow-hidden'>
        <Link to={`listing/${listing._id}`}>
        <div>
            <img src={listing.imageUrls[0]} alt='listing cover' 
            className='h-[320px sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'></img>
       
       <div className='p-3 flex flex-col w-full gap-2'>  
        <p className=' font-semibold text-slate-700 truncate'>{listing.name}</p>
      
      <div className='flex items-center gap-1'>
        <MdLocationOn className='h-4 w-4 text-green-700'></MdLocationOn>
        <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
      </div>
      <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
      <p className='text-slate-500 mt-2 font-semibold'>
         ${
        listing.offer?listing.discountPrice.toLocaleString('en-us')
        :listing.regularPrice.toLocaleString('en-us')
          }
          {listing.type ==="rent"&& '/month'}
          </p>

          <div className='text-slate-700 flex gap-4'>
            
              <div className='font-bold text-xs'>
                    {
                      listing.bedrooms > 1 ?`${listing.bedrooms} beds`:
                      `${listing.bedrooms} bed`
                    }
              </div>
              <div className='font-bold text-xs'>
                    {
                      listing.bathrooms > 1 ?`${listing.bedrooms} baths`:
                      `${listing.bathrooms} bath`
                    }
              </div>

        
          </div>
      </div>
        </div>
        </Link>
     </div>
  )
}

export default ListingItem