import React from 'react'
import {Link} from "react-router-dom"
export default function SignUp() {
  return (
    <div className="flex ">
    <div className='p-3 inline-block mx-auto'>
      <h1 className='text-3xl text-center font-medium my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4 items-center'>
        <input type="text" placeholder='Username' id="username" className='rounded-lg border p-3 w-96'/>
        <input type="text" placeholder='Email Address' id="email" className='rounded-lg border p-3 w-96'/>
        <input type="password" placeholder='Password' id="password" className='rounded-lg border p-3 w-96'/>
        <button className='bg-slate-700 text-white w-96 rounded-lg p-2 hover:opacity-95'>SIGN UP</button>
        <button className='bg-red-600 text-white w-96 rounded-lg p-2 hover:opacity-95'>CONTINUE WITH GOOGLE</button>
      </form>
      <div className='flex gap-2 mt-5'>
          <span>Have an account ?</span>
          <span className='text-blue-700'><Link to="/signin">Sign in</Link></span>
        </div>
      </div>

    </div>
  )
}
