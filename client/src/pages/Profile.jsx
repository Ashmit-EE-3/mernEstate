import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  console.log(currentUser)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col items-center justify-center gap-5'>
      <img src={currentUser.avatar} className="rounded-full w-24 h-24 object-cover cursor-pointer " alt="profile"/>
        <input className='w-full rounded-lg p-3' type='text' defaultValue={currentUser.username} id="username"/>
        <input className='w-full rounded-lg p-3' type='text' defaultValue={currentUser.email} id="email"/>
        <input className='w-full rounded-lg p-3' type='password' placeholder='Password'id="password"/>
        <button className='w-full bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80' >UPDATE</button>
      </form>
      <div className='flex justify-between my-3'>
        <span className='text-red-700'>Delete Account</span>
        <span className='text-red-700'>Sign Out</span>
      </div>
      <div className='text-green-700 text-center my-3'>Show Listings</div>
    </div>
  )
}
