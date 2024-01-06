import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';

function CreateListing() {
    const navigate = useNavigate() ; 
    const {currentUser} = useSelector((state) => state.user)
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name : '', 
        address : '',
        description : '', 
        regularPrice : 50, 
        discountedPrice : 0, 
        bedrooms : 1, 
        bathrooms : 1, 
        furnished : false, 
        parking : false, 
        type : 'rent', 
        offer : false, 
        userRef : currentUser._id, 
    });
    const [fileLoading, setFileLoading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [error, setError] = useState(null) 
    const [loading, setLoading] = useState(false) 

    const handleChange = (e)=>{
        if (e.target.id === "sale"){
            setFormData({...formData, type : "sale"}) ; 
        }
        else if (e.target.id === "rent"){
            setFormData({...formData,type : "rent"}) ; 
        }
        else if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setFormData({...formData, [e.target.id] : e.target.checked})
        }
        else if (e.target.id === 'bedrooms' || e.target.id ==='bathrooms' || e.target.id ==='regularPrice' || e.target.id ==='discountedPrice'){
            setFormData({...formData, [e.target.id] : parseInt(e.target.value)})
        }
        else {
            setFormData({...formData, [e.target.id] : e.target.value}) ; 
        }
    }
    
    const handleDeleteImageClick = (e) => {
        const index = e.target.id;
        const updatedImageUrls = [...formData.imageUrls];
        updatedImageUrls.splice(index, 1);
        setFormData({ ...formData, imageUrls: updatedImageUrls });
    }
      
    const handleSubmit = async (e)=>{
        e.preventDefault() ; 

        try {
            if (formData.imageUrls.length < 1) return setError('You must upload atleast 1 image.') 
            if (formData.regularPrice < formData.discountedPrice) return setError('Discounted Price must be lesser than Regular Price.')
            setLoading(true) ; 
            setError(null) ; 
            const res = await fetch('/api/v1/listing/create', {
                method : "POST", 
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(formData)
            })

            const data = await res.json() ; 
            setLoading(false) ; 
            if(data.success === false){
                setError(data.message)
            }

            navigate(`/listing/${data._id}`)
        } catch (err) {
            setError(err.message)
            setLoading(false) 
        }
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
            <form  onSubmit={handleSubmit}  className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input onChange={handleChange} type="text" id="name" placeholder='Name' maxLength='62' minLength='10' required className='rounded-lg p-3 border w-full' />
                    <textarea onChange={handleChange} type="text" id="description" placeholder='Description' className='rounded-lg border p-3 w-full' required />
                    <input onChange={handleChange} type="text" id="address" placeholder='Address' className='rounded-lg p-3 w-full' required />
                    <div className='flex gap-9 flex-wrap'>
                        <div className='flex gap-2'>
                            <input checked={formData.type === 'sale'} onChange={handleChange} type="checkbox" id="sale" className='w-5 border' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input checked={formData.type === 'rent'} onChange={handleChange} type="checkbox" id="rent" className='w-5 border' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input value={formData.parking} onChange={handleChange} type="checkbox" id="parking" className='w-5 border' />
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input value={formData.furnished} onChange={handleChange} type="checkbox" id="furnished" className='w-5 border' />
                            <span>Furnished Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input value={formData.offer} onChange={handleChange} type="checkbox" id="offer" className='w-5 border' />
                            <span>Offers</span>
                        </div>
                    </div>
                    <div className='flex gap-6'>
                        <div className='flex gap-2 items-center'>
                            <input value={formData.bedrooms} onChange={handleChange} id="bedrooms" className='p-3 border border-gray-300 rounded-lg' type='number' min="1" max="10" required />
                            <span>Beds</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input onChange={handleChange} value={formData.bathrooms} id="bathrooms" className='p-3 border border-gray-300 rounded-lg' type='number' min="1" max="10" required />
                            <span>Baths</span>
                        </div>
                    </div>
                    <div className='flex gap-6 flex-row sm:flex-col'>
                        <div className='flex gap-2 items-center'>
                            <input value={formData.regularPrice} onChange={handleChange} id="regularPrice" className='p-3 border border-gray-300 rounded-lg' type='number' min="50" max="10000000" required />
                            <div className='flex flex-col text-center'>
                                <span>Regular Price</span>
                                {formData.type === 'rent' ? <small>($/Month)</small> : ""}
                            </div>
                        </div>
                        {formData.offer ? <div className='flex gap-2 items-center'>
                            <input value={formData.discountedPrice}  onChange={handleChange} id="discountedPrice" className='p-3 border border-gray-300 rounded-lg' type='number' min="0" max="10000000" required />
                            <div className='flex flex-col text-center'>
                                <span>Discounted Price</span>
                                {formData.type === 'rent' ? <small>($/Month)</small> : ""}
                            </div>
                        </div> : ""}
                    </div>
                </div>
                <div className='flex flex-col gap-4 flex-1'>
                    <div className='flex flex-row gap-1'><p className='font-semibold'>Images: </p><span className='text-slate-500'>The first image will be the cover (max 6)</span></div>
                    <div className='flex gap-4'>
                        <input onChange={(e) => setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept="image/*" multiple />
                        <button type='button' onClick={handleUploadClick} className='p-3 text-green-700 border rounded hover:shadow-lg disabled:opacity-80 border-green-700 ' disabled={fileLoading}>{fileLoading ? "UPLOADING..." : "UPLOAD"}</button>
                    </div>
                    <p className='text-red-700 text-center'>{imageUploadError ? imageUploadError : ""}</p>
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
                    <button type="submit" disabled={fileLoading || loading} className='bg-slate-700 p-3 uppercase text-center text-white w-full rounded-lg'>{loading ? "LOADING..." : "CREATE LISTING"}</button>
                    <p className='text-red-700 text-center'>{error ? error : ""}</p>
                </div>
            </form>
        </div>
    )
}

export default CreateListing