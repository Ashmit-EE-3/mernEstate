import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import About from './pages/About.jsx'
import CreateListing from './pages/createListing.jsx'
import Header from './components/Header.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Listing from './pages/Listing.jsx'
import UpdateListing from './pages/UpdateListing.jsx'
import Search from './pages/Search.jsx'

export default function App() {
  return (
    <>
    
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing/>} />
            <Route path="/update-listing/:listingID" element={<UpdateListing/>} />  
          </Route>
          <Route path="/listing/:listingID" element={<Listing />}/>
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}