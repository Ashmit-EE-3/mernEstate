import React from 'react'

function Search() {
  return (
    <div className='flex flex-col md:flex-row gap-8'>
        <div className='p-7 border-b-2 md:border-b-0'>
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <p className='whitespace-nowrap'>Search Term : </p>
                    <input className="rounded-lg p-3 w-full border"type="text" id="searchTerm" placeholder='Search...'/>
                </div>
                <div className='flex gap-2 flex-wrap'>
                    <span>Type:</span>
                    <input className="border w-5" type="checkbox" checked id="rent&sale"/>
                    <span>Rent & Sale</span>
                    <input className="border w-5" type="checkbox" id="rent"/>
                    <span>Rent</span>
                    <input className="border w-5" type="checkbox" id="sale"/>
                    <span>Sale</span>
                    <input className="border w-5" type="checkbox" id="offer"/>
                    <span>Offer</span>
                </div>
                <div className='flex gap-2'>
                    <span>Amenities : </span>
                    <input className="border w-5" type="checkbox" id="parking"/>
                    <span>Parking</span>
                    <input className="border w-5" type="checkbox" id="furnished"/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <span>Sort:</span>
                    <select id="sort_order" className='p-3 rounded-lg' defaultValue="Latest">
                        <option>Price high to low</option>
                        <option>Price low to high</option>
                        <option>Latest</option>
                        <option>Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 hover:opacity-95 rounded-lg p-3 text-white'>SEARCH</button>
            </form>
        </div>
        <div className='md:border-l-2 md:min-h-screen'>
            <h1 className='text-3xl text-slate-700 py-3 mt-5 w-full border-b-2 font-semibold'>Listing Results: </h1>
        </div>
    </div>
  )
}

export default Search