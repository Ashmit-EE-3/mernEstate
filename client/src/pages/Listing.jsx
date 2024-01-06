import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa';

function Listing() {
  SwiperCore.use([Navigation]);

  const params = useParams();
  const [listingData, setListingData] = useState({});

  useEffect(() => {
    const fetchListing = (async () => {
      const res = await fetch(`/api/v1/listing/get/${params.listingID}`)

      const data = await res.json();

      if (data.success === false) return;

      setListingData(data);
    })

    fetchListing();
  }, [])

  console.log(listingData)
  return (
    <div>
      {
        listingData.imageUrls ?
          <>
            <Swiper navigation>
              {
                listingData.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div className='h-[550px]' style={{ background: `url(${url}) center no-repeat`, backgroundSize: "cover" }}></div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
            <div className='flex flex-col max-w-4xl mx-auto p-3 gap-4'>
              <p className='text-2xl font-semibold'>
                {listingData.name} - ${' '}
                {listingData.offer
                  ? listingData.discountedPrice.toLocaleString('en-US')
                  : listingData.regularPrice.toLocaleString('en-US')}
                {listingData.type === 'rent' && ' / month'}
              </p>
              <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                <FaMapMarkerAlt className='text-green-700' />
                {listingData.address}
              </p>
              <div className='flex gap-4'>
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  {listingData.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {listingData.offer &&
                  <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                    ${+listingData.regularPrice - +listingData.discountedPrice}
                  </p> 
                }
              </div>
              <p className='text-slate-800'><span className='font-semibold text-black '>Description - </span>
                {listingData.description}</p>

                <ul className='text-green-900 flex flex-wrap font-semibold text-sm gap-4 sm:gap-6'>
                  <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaBed className='text-lg' />
                    {listingData.bedrooms > 1 ? `${listingData.bedrooms} beds ` : `${listingData.bedrooms} bed `}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaBath className='text-lg' />
                    {listingData.bathrooms > 1 ? `${listingData.bathrooms} baths ` : `${listingData.bathrooms} bath `}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaParking className='text-lg' />
                    {listingData.parking > 1 ? "Parking Spot" : "No Parking"}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaChair className='text-lg' />
                    {listingData.furnished ? "Furnished" : "Unfurnished"}
                  </li>
                </ul>
            </div>
          </>


            : <p>Something went wrong!</p>
}
          </div >
      )
}

      export default Listing


