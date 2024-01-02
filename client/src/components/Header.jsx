import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className='shadow-md bg-slate-200 flex '>
            <div className='flex justify-between items-center max-w-6xl my-0 mx-auto p-3 space-x-16'>

                <div className='font-bold text-sm sm:text-lg leftSection'>
        
                        <span className='text-slate-500'>Easy</span>
                        <span className='text-slate-700'>Estate</span>
        
                </div>

                <form className='bg-slate-100 rounded-lg p-3 flex items-center'>
                    <input type='search' name='search' placeholder='Search....' className='w-24 sm:w-64 bg-transparent focus:outline-none' />
                    <FaSearch className='text-slate-600' />
                </form>

                <div className='rightSection space-x-4 flex'>
                    <a href="/" className='hidden sm:inline text-slate-700 hover:underline'>Home</a>
                    <a href="/about" className='hidden sm:inline text-slate-700 hover:underline'>About</a>
                    <a href="/sign-in" className='text-slate-700'>Sign In</a>
                </div>

            </div>
        </header>
    )
}
