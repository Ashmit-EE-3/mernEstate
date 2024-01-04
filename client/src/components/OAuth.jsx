import React from 'react'
import app from '../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


function OAuth() {
    const navigate = useNavigate() ; 
    const dispatch = useDispatch() ; 
    const handleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const res = await fetch('api/v1/auth/google', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    username : result.user.displayName, 
                    email : result.user.email,
                    photo : result.user.photoURL,
                })
            })
            const data = res.json() ; 
            data
            .then((result)=>{
                console.log(result)
                dispatch(signInSuccess(result)) ;
                navigate('/') ;
            })
            .catch((err)=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <button onClick={handleClick} className='text-white bg-red-600 p-2 rounded-lg w-96' type='button'>CONTINUE WITH GOOGLE</button>
    )
}

export default OAuth