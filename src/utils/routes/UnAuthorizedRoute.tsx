import React from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { useAppSelector } from 'utils/redux/hooks';

const UnAuthorizedRoute = ({children}: {children: React.ReactElement | null}) => {
    const user = useAppSelector((state) => state.user);
    const location = useLocation();

    if(!user.currentUser) {
        return children
    }
 return <Navigate to="/" state={{ from: location}} />

};

export default UnAuthorizedRoute;