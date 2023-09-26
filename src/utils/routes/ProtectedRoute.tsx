import React from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { useAppSelector } from 'utils/redux/hooks';

const ProtectedRoute = ({children}: {children: React.ReactElement | null}) => {
    const user = useAppSelector((state) => state.user);
    let location = useLocation();

    if(!user.currentUser) {
        return <Navigate to="/auth" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;