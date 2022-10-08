import React, {createContext, useState} from 'react';
import {useAuth} from "../hooks";

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
	const auth = useAuth()
	const [user, setUser] = useState(null)

	const signIn = (userName, callback) => {
		setUser(userName);
		callback();
	}

	const signOut = (callback) => {
		setUser(null);
		callback();
	}

	return (
			<AuthContext.Provider value={{user, signIn, signOut}}>
				{children}
			</AuthContext.Provider>
		)
};