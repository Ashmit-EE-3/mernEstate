import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate} from 'react-router-dom';

function PrivateRoute() {
  const {currentUser} = useSelector(state => state.user) ;

    return (<>
    
        {currentUser && currentUser.avatar ? <Outlet/> : <Navigate to="/sign-in"/>} 
        </>)
}

export default PrivateRoute