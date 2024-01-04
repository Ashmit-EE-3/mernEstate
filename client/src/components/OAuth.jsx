import React from 'react'
import app from '../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';


function OAuth() {

    const handleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            console.log(result);
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <button onClick={handleClick} className='text-white bg-red-600 p-2 rounded-lg w-96' type='button'>CONTINUE WITH GOOGLE</button>
    )
}

export default OAuth