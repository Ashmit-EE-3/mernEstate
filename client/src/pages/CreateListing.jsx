import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

function CreateListing() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    const [fileLoading, setFileLoading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(null);

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.id] : e.target.value}) ; 
    }
    const handleUploadClick = (e) => {
        setFileLoading(true);
        if (files.length > 0 && (files.length + formData.imageUrls.length) < 7) {

            const promises = [];

            console.log('File Loading : ', fileLoading)

            for (let i = 0; i < files.length; i++) {
                console.log(`File ${i} : ${files[i]}`)
                promises.push(storeImage(files[i]));
            }

            Promise
                .all(promises)
                .then((urls) => {
                    setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                    setImageUploadError(null);
                    setFileLoading(false) ; 
                })
                .catch((err) => {
                    setImageUploadError('Image upload failed (2 mb max per image)');
                    setFileLoading(false);
                });
        }
        else {
            setImageUploadError('You can only upload max 6 images');
            setFileLoading(false);
        }
        
    }

    const handleDeleteImageClick = (e) => {
        const index = e.target.id;
        const updatedImageUrls = [...formData.imageUrls];
        updatedImageUrls.splice(index, 1);
        setFormData({ ...formData, imageUrls: updatedImageUrls });
    }
      
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage();
            const fileName = new Date().getTime() + file.name;
            console.log('File Name : ', fileName);
            const storageRef = ref(storage, fileName);
            console.log("Storage Ref : ", storageRef);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            resolve(downloadURL)
                        })
                }
            );
        })
    }
    console.log(formData);

    return (
        <div className='p-3 max-w-4xl mx-auto'>
            <h1 className="text-3xl font-bold text-center my-7 ">Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input onChange={handleChange} type="text" id="name" placeholder='Name' maxLength='62' minLength='10' required className='rounded-lg p-3 border w-full' />
                    <textarea onChange={handleChange} type="text" id="description" placeholder='Description' className='rounded-lg border p-3 w-full' required />
                    <input onChange={handleChange} type="text" id="address" placeholder='Address' className='rounded-lg p-3 w-full' required />
                    <div className='flex gap-9 flex-wrap'>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} type="checkbox" id="sale" className='w-5 border' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} type="checkbox" id="rent" className='w-5 border' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} type="checkbox" id="parking" className='w-5 border' />
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} type="checkbox" id="furnished" className='w-5 border' />
                            <span>Furnished Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} type="checkbox" id="offer" className='w-5 border' />
                            <span>Offers</span>
                        </div>
                    </div>
                    <div className='flex gap-6'>
                        <div className='flex gap-2 items-center'>
                            <input onChange={handleChange} id="bedrooms" className='p-3 border border-gray-300 rounded-lg' type='number' min="1" max="10" required />
                            <span>Beds</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input onChange={handleChange} id="bathrooms" className='p-3 border border-gray-300 rounded-lg' type='number' min="1" max="10" required />
                            <span>Baths</span>
                        </div>
                    </div>
                    <div className='flex gap-6 flex-row sm:flex-col'>
                        <div className='flex gap-2 items-center'>
                            <input onChange={handleChange} id="regular" className='p-3 border border-gray-300 rounded-lg' type='number' min="50" max="1000" required />
                            <div className='flex flex-col text-center'>
                                <span>Regular Price</span>
                                <small>($/Month)</small>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input onChange={handleChange} id="discount" className='p-3 border border-gray-300 rounded-lg' type='number' min="50" max="1000" required />
                            <div className='flex flex-col text-center'>
                                <span>Discounted Price</span>
                                <small>($/Month)</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4 flex-1'>
                    <div className='flex flex-row gap-1'><p className='font-semibold'>Images: </p><span className='text-slate-500'>The first image will be the cover (max 6)</span></div>
                    <div className='flex gap-4'>
                        <input onChange={(e) => setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept="image/*" multiple />
                        <button type='button' onClick={handleUploadClick} className='p-3 text-green-700 border rounded hover:shadow-lg disabled:opacity-80 border-green-700 ' disabled={fileLoading}>{fileLoading ? "UPLOADING..." : "UPLOAD"}</button>
                    </div>
                    {
                        formData.imageUrls.length > 0
                            ? formData.imageUrls.map((url, index) => (
                                <div className='flex justify-between p-3 border items-center'>
                                <img key={index} src={url} alt={`image-${index}`} className='w-40 h-40 object-cover rounded-lg' />
                                <button onClick={handleDeleteImageClick} id={index} type='button' className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                                </div>
                            ))
                            : ''
                    }
                    <button type="submit" className='bg-slate-700 p-3 uppercase text-center text-white w-full rounded-lg'>CREATE LISTING</button>
                    
                    
                    <p className='text-red-700 text-center'>{imageUploadError ? imageUploadError : ""}</p>
                    
                </div>
            </form>
        </div>
    )
}

export default CreateListing