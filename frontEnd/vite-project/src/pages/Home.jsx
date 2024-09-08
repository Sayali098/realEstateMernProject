import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../Components/ListingItem";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  // console.log(saleListings)

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async() => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&&limit=4 `);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&&limit=4 `);
        const data = await res.json();
        setSaleListings(data);
        // fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  },[]);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 mx-auto  max-w-6xl">
        <h1 className="font-bold text-slate-700 text-3xl lg:text-6xl">
          Find your next
          <span className="text-slate-500"> perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400  text-xs sm:text-sm ">
          sahand Estate is the best place to find your next perfect place to
          live
          <br />
          we have a wide range of properties for you to choose from.
        </div>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Lets get started...
        </Link>
      </div>

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div  key={listing._id}
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
               
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

    
        <div className="max-w-6xl mx-auto  flex flex-col  gap-8 my-10 p-3" >
          {offerListings && offerListings.length>0 &&(
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
                <Link className="text-sm text-blue-800 hover:underline" to='/search?offer=true'>Show more offers</Link>
                </div>
                <div className="flex flex-wrap gap-4">
              {
               offerListings.map((listing)=>(
               <ListingItem listing={listing} key={listing._id}></ListingItem>
                ))
              }
              </div>

          </div>
          )}
           {rentListings && rentListings.length>0 &&(
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">Recent places for rent</h2>
                <Link className="text-sm text-blue-800 hover:underline" to='/search?type=rent'>Show more places for rent</Link>
                </div>
                <div className="flex flex-wrap gap-4">
              {
               rentListings.map((listing)=>(
               <ListingItem listing={listing} key={listing._id}></ListingItem>
                ))
              }
              </div>

          </div>
          )}
           {saleListings && saleListings.length>0 &&(
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">Recent places for sale </h2>
                <Link className="text-sm text-blue-800 hover:underline" to='/search?offer=true'>Show more places for sale</Link>
                </div>
                <div className="flex flex-wrap gap-4">
              {
               saleListings.map((listing)=>(
               <ListingItem listing={listing} key={listing._id}></ListingItem>
                ))
              }
              </div>

          </div>
          )}
      </div>
    </div>
  );
};

export default Home;
