import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

export default function Profile() {
  const profileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePer, setfilePer] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    console.log(formData);
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
      <form  className='flex flex-col items-center justify-center gap-5'>
        <input onChange={(e) => setFile(e.target.files[0])} hidden type="file" accept="image/*" ref={profileRef} />
        <img onClick={() => profileRef.current.click()} src={formData.avatar || currentUser.avatar} className="rounded-full w-24 h-24 object-cover cursor-pointer " alt="profile" />
        <p className='text-green-700'>
          {fileUploadError ? <p className='text-red-700'>Error Image Upload!</p> : (filePer === 100 ? 'Image uploaded successfully!' : (filePer > 0 && filePer<100 ? `Image upload in process: ${filePer}%` : ""  ))}
        </p>
        <input onChange={handleChange} className='w-full rounded-lg p-3' type='text' defaultValue={currentUser.username} id="username" />
        <input onChange={handleChange} className='w-full rounded-lg p-3' type='text' defaultValue={currentUser.email} id="email" />
        <input onChange={handleChange} className='w-full rounded-lg p-3' type='password' placeholder='Password' id="password" />
        <button className='w-full bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80' >UPDATE</button>
      </form>
      <div className='flex justify-between my-3'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <div className='text-green-700 text-center cursor-pointer my-3'>Show Listings</div>
    </div>
  )
}
