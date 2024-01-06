import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

export default function Profile() {
  const profileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePer, setfilePer] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const [updateSuccessful, setUpdateSuccess] = useState(false);
  const [listings, setListings] = useState([]);
  const [listingsError, setListingsError] = useState(null);

  const dispatch = useDispatch();
  console.log(loading);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    console.log({ formData });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`api/v1/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }

      dispatch(updateSuccess(data))
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateFailure(error.message))
    }
  }

  const handleDeleteClick = async (e) => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/v1/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.msg))
        return;
      }

      dispatch(deleteUserSuccess());

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOutClick = async (e) => {
    try {
      dispatch(signOutStart());
      const res = await fetch('/api/v1/auth/signout', {
        method: 'GET',
      })

      const data = await res.json();

      if (data.success === true) {
        dispatch(signOutSuccess())
        return;
      }

      dispatch(signOutFailure(data.msg))

    } catch (error) {
      dispatch(signOutFailure(error))
    }
  }

  const handleShowListingsClick = async (e) => {
    try {
      const res = await fetch(`/api/v1/user/listings/${currentUser._id}`);

      const data = await res.json();

      if (data.success === false) return setListingsError(data.message)

      setListings(data);
    } catch (err) {
      setListingsError(err.message)
    }

    console.log(listings)
  }

  const handleDeleteListingClick = async (e)=>{
    try {
      const res = await fetch(`/api/v1/listing/delete/${e.target.id}`, {
        method : 'DELETE',
      })
      
      const data = await res.json() ; 

      if (data.success === false){
        console.log(data.message)
        return ; 
      } 

      setListings((prev)=> prev.filter((listing)=> listing._id !== e.target.id))
    } catch (error) {
      console.log(error) ;  
    }
  }
  const handleFileUpload = (file) => {
    const storage = getStorage();
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilePer(Math.floor(progress));
        console.log("Upload is " + progress + "% done")
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL })
          })
      });
  };


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-5'>
        <input onChange={(e) => setFile(e.target.files[0])} hidden type="file" accept="image/*" ref={profileRef} />
        <img onClick={() => profileRef.current.click()} src={formData.avatar || currentUser.avatar} className="rounded-full w-24 h-24 object-cover cursor-pointer " alt="profile" />
        <p className='text-green-700'>
          {fileUploadError ? <p className='text-red-700'>Error Image Upload!</p> : (filePer === 100 ? 'Image uploaded successfully!' : (filePer > 0 && filePer < 100 ? `Image upload in process: ${filePer}%` : ""))}
        </p>
        <input onChange={handleChange} className='w-full rounded-lg p-3' type='text' defaultValue={currentUser.username} id="username" />
        <input onChange={handleChange} className='w-full rounded-lg p-3' type='text' defaultValue={currentUser.email} id="email" />
        <input onChange={handleChange} className='w-full rounded-lg p-3' type='password' placeholder='Password' id="password" />
        <button disabled={loading} className='w-full bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80' >{loading ? "LOADING..." : "UPDATE"}</button>
        <Link to={"/create-listing"} className='w-full bg-green-700 text-white rounded-lg p-3 hover:opacity-95 text-center'>CREATE LISTING</Link>
      </form>
      <div className='flex justify-between my-3'>
        <span onClick={handleDeleteClick} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOutClick} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      {error ? <div className='text-red-700 text-center cursor-pointer my-3'>{error}</div> : ""}
      {updateSuccessful ? <div className='text-green-700 text-center cursor-pointer my-3'>User updated successfully!</div> : ""}
      <div onClick={handleShowListingsClick} className='text-green-700 text-center cursor-pointer my-3'>Show Listings</div>
      <div>
        {listingsError ? <p className='text-center text-red-700'>Error Showing Listings</p> : ""}
        {listings && listings.length > 0 && <p className='text-center text-3xl my-5 font-semibold'>Your Listings</p>}
        {
          listings.length > 0 && listings.map((list, index) => (
            
              <div className='flex justify-between m-1 p-3 border items-center'>
                <div className='flex items-center gap-4'>
                <img key={index}src={list.imageUrls[0]} alt={`image-${index}`} className='w-16 h-16 object-cover rounded-lg' />
                <Link to={`/listing/${list._id}`} className='text-1 hover:underline font-semibold truncate'>{list.name}</Link>
                </div>
                <div className='flex flex-col'>
                  <button onClick={handleDeleteListingClick} id={list._id} type='button' className='p-1 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                  <button type='button' id={list._id} className='p-1 text-slate-700 rounded-lg uppercase hover:opacity-75'>Edit</button>
                </div>
              </div>
          ))
        }
        {/* {listings.length === 0 && <p className='text-center text-red-700'>You don't have any listings yet!</p>} */}
      </div>
    </div>
  )
}
