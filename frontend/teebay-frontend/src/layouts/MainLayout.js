 // layouts/MainLayout.js
 import React, {useEffect, useState} from 'react';
 import {useLocation} from 'react-router-dom';
 
 const MainLayout = ({children}) => {
    const location = useLocation();
    const [isInitializing, setIsInitializing] = useState(true);
 
    useEffect(() => {
        setIsInitializing(false)
    },[])
 
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