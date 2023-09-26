import React from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { useAppSelector } from 'utils/redux/hooks';

const UnAuthorizedRoute = ({children}: {children: React.ReactElement | null}) => {
    const user = useAppSelector((state) => state.user);
    let location = useLocation();

    if(!user.currentUser) {
        return children
    }
 return <Navigate to="/" state={{ from: location}} replace />

};

export default UnAuthorizedRoute;