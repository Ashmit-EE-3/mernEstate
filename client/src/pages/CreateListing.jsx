import React from 'react'

function CreateListing() {
    return (

        <div className='p-3 max-w-4xl mx-auto'>
            <h1 className="text-3xl font-bold text-center my-7 ">Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" id="name" placeholder='Name' maxLength='62' minLength='10' required className='rounded-lg p-3 border w-full' />
                    <textarea type="text" id="description" placeholder='Description' className='rounded-lg border p-3 w-full' required />
                    <input type="text" id="address" placeholder='Address' className='rounded-lg p-3 w-full' required />
                    <div className='flex gap-9 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="sale" className='w-5 border' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="rent" className='w-5 border' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="parking" className='w-5 border' />
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="furnished" className='w-5 border' />
                            <span>Furnished Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="offer" className='w-5 border' />
                            <span>Offers</span>
                        </div>
                    </div>
                    <div className='flex gap-6'>
                        <div className='flex gap-2 items-center'>
                            <input id="bedrooms" className='p-3 border border-gray-300 rounded-lg' type='number' min="1" max="10" required />
                            <span>Beds</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input id="bathrooms" className='p-3 border border-gray-300 rounded-lg' type='number' min="1" max="10" required />
                            <span>Baths</span>
                        </div>
                    </div>
                    <div className='flex gap-6 flex-row sm:flex-col'>
                        <div className='flex gap-2 items-center'>
                            <input id="regular" className='p-3 border border-gray-300 rounded-lg' type='number' min="50" max="1000" required />
                            <div className='flex flex-col text-center'>
                                <span>Regular Price</span>
                                <small>($/Month)</small>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input id="regular" className='p-3 border border-gray-300 rounded-lg' type='number' min="50" max="1000" required />
                            <div className='flex flex-col text-center'>
                                <span>Discounted Price</span>
                                <small>($/Month)</small>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>

                    </div>
                </div>
                <div className='flex flex-col gap-4 flex-1'>
                    <div className='flex flex-row gap-1'><p className='font-semibold'>Images: </p><span className='text-slate-500'>The first image will be the cover (max 6)</span></div>
                    <div className='flex gap-4'>
                        <input className="p-3 border border-gray-300 rounded w-full"type="file" id="images" accept="image/*" multiple/>
                        <button className='p-3 text-green-700 border rounded hover:shadow-lg disabled:opacity-80 border-green-700 '>UPLOAD</button>
                    </div>
                    <button className='bg-slate-700 p-3 uppercase text-center text-white w-full rounded-lg'>CREATE LISTING</button>
                </div>
            </form>
        </div>
    )
}

export default CreateListing