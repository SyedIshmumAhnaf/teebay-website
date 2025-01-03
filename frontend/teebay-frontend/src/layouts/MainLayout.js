// layouts/MainLayout.js
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const MainLayout = ({children}) => {
   const location = useLocation();
   const [isInitializing, setIsInitializing] = useState(true);
   const navigate = useNavigate();


   useEffect(() => {
       console.log("MainLayout useEffect: ", location.pathname);
       const token = localStorage.getItem('token');
       console.log("Token: ", token)
        if(!token && location.pathname !== '/login' && location.pathname !== '/register'){
            navigate('/login');
        }
       setIsInitializing(false)
   },[navigate, location.pathname])

   if (isInitializing) {
     return <div>Initializing...</div>;
   }

   return(
        <div>
             {children}
        </div>
    )
}

export default MainLayout;