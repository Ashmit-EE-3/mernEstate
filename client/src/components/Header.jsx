import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Header() {
    const { currentUser } = useSelector(state => state.user)
    const [searchTerm, setSearchTerm] = useState('');
    console.log(searchTerm)
    const navigate = useNavigate() ; 
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search) ;
        urlParams.set('searchTerm',searchTerm) ; 
        const searchQuery = urlParams.toString() ; 
        navigate(`/search?${searchQuery}`) ; 
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search)
        setSearchTerm(urlParams.get('searchTerm',searchTerm)) ; 
    }, [location.search])
    return (
        <header className='shadow-md bg-slate-200 flex '>
            <div className='flex justify-between items-center max-w-6xl my-0 mx-auto p-3 space-x-16'>

                <div className='font-bold text-sm sm:text-lg leftSection'>
                    <span className='text-slate-500'>Easy</span>
                    <span className='text-slate-700'>Estate</span>
                </div>

                <form onSubmit={handleSearchSubmit} className='bg-slate-100 rounded-lg p-3 flex items-center'>
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='search' name='search' placeholder='Search....' className='w-24 sm:w-64 bg-transparent focus:outline-none' />
                    <button>
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>

                <div className='rightSection space-x-4 flex'>
                    <a href="/" className='hidden sm:inline text-slate-700 hover:underline'>Home</a>
                    <a href="/about" className='hidden sm:inline text-slate-700 hover:underline'>About</a>
                    <a href="/profile" className='text-slate-700'>
                        {currentUser.avatar ? <img src={currentUser.avatar} className='rounded-full object-cover h-7 w-7 ' alt='profile' /> : "Sign In"}
                    </a>
                </div>
            </div>
        </header>
    )
}
