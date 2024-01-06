import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

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
                    <div className='h-[550px]' style={{ background: `url(${url}) center no-repeat` , backgroundSize: "cover"}}></div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </>
        : <p>Something went wrong!</p>
      }
    </div>
  )
}

export default Listing