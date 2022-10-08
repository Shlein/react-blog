import React, {useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom'
import {useAuth} from "../hooks";


const RequireAuth = ({children}) => {
	const location = useLocation();
	const {user} = useAuth();

	if (!user) {
		return <Navigate to='/login' state={{from: location}} replace/>
	}

	return children
};

export default RequireAuth;