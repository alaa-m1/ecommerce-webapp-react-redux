import React from 'react'
import {Navigate} from "react-router-dom"
import { useAppSelector } from 'utils/redux/hooks';

const ProtectedRoute = ({children}: {children: React.ReactElement | null}) => {
    const user = useAppSelector((state) => state.user);

    if(!user.currentUser) {
        return <Navigate to="/auth"/>
    }
 return children

};

export default ProtectedRoute;