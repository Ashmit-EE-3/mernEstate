import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux' ; 
import { signInStart,signInSuccess,signInFailure }  from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


export default function SignIn() {

  const [user, setUser] = useState({})
  const {loading , error}  = useSelector((state)=> state.user) 
  const navigate = useNavigate() ; 
  const dispatch = useDispatch() ; 
  const handleChange = (e)=>{
    setUser({
      ...user,
      [e.target.id] : e.target.value, 
    })
    console.log(user) 
  } ; 

  const handleSubmit = async (e)=>{
    e.preventDefault() ; 
    dispatch(signInStart()) 
    try {
      const res = await fetch('/api/v1/auth/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })  
        
        const data = await res.json() ; 

        if (data.success === false){
          dispatch(signInFailure(data.message)) ; 
          return ; 
        }
        else{
          dispatch(signInSuccess(data))
          navigate('/')
        }
    } catch (err) {
      dispatch(signInFailure(err.message))
    } 

    console.log(`loading : ${loading}`)
  }
  return (
    <div className="flex ">
      <div className='p-3 inline-block mx-auto'>
        <h1 className='text-3xl text-center font-medium my-7'>Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center'>
          <input type="text" placeholder='Email Address' id="email" className='rounded-lg border p-3 w-96' onChange={handleChange} />
          <input type="password" placeholder='Password' id="password" className='rounded-lg border p-3 w-96' onChange={handleChange}/>
          <button disabled={loading} className=' bg-slate-700 text-white w-96 rounded-lg p-2 hover:opacity-95 disabled:opacity-60'>{loading ? "LOADING..." : "SIGN IN"}</button>
          <OAuth/>
          </form>
        <div className='flex gap-2 mt-5'>
          <span>Don't have an account ?</span>
          <span className='text-blue-700'><Link to="/sign-up">Sign up</Link></span>
        </div>
        
        {error && <p className='text-red-500 mt-5'>{ error }</p>}
        
        </div>
    </div>
  )
}
