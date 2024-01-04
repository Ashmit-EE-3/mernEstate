import React, { useState } from 'react'
import { Link, useNavigate} from "react-router-dom"
import OAuth from '../components/OAuth';
export default function SignUp() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate() ; 
  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      }
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/v1/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
      const data = await res.json()
      if (data.success === false) {
        setError(data.message)
        setLoading(false)
        return;
      }  
      setLoading(false)
      setError(null)
      navigate('/sign-in') 
      console.log(data)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }


  console.log(error);
  return (
    <div className="flex ">
      <div className='p-3 inline-block mx-auto'>
        <h1 className='text-3xl text-center font-medium my-7'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center'>
          <input type="text" placeholder='Username' id="username" className='rounded-lg border p-3 w-96' onChange={handleChange} />
          <input type="text" placeholder='Email Address' id="email" className='rounded-lg border p-3 w-96' onChange={handleChange} />
          <input type="password" placeholder='Password' id="password" className='rounded-lg border p-3 w-96' onChange={handleChange} />
          <button disabled={loading} className='bg-slate-700 text-white w-96 rounded-lg p-2 hover:opacity-95 disabled:opacity-60'>{loading ? 'LOADING...' : 'SIGN UP'}</button>
          <OAuth/>
          </form>
        <div className='flex gap-2 mt-5'>
          <span>Have an account ?</span>
          <span className='text-blue-700'><Link to="/sign-in">Sign in</Link></span>
        </div>
        {error ? <p className='text-red-700 mt-2'>{error}</p> : <p className='text-green-700 mt-2'></p> }
      </div>
      
    </div>
  )
}
