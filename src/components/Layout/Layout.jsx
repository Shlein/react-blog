import React from 'react';
import styles from './Layout.module.css'
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks";
import MyButton from "../../UI/MyButton/MyButton";

const Layout = () => {
	const {user, signOut} = useAuth();
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.navLinks}>
					<NavLink to='/home' className={({isActive}) => isActive ? styles.activeLink : styles.link}>Home</NavLink>
					<NavLink to='/posts' className={({isActive}) => isActive ? styles.activeLink : styles.link}>Posts</NavLink>
					<NavLink to='/about' className={({isActive}) => isActive ? styles.activeLink : styles.link}>About</NavLink>
				</div>
				{
					user
						? <MyButton onClick={() => signOut(() => navigate('/home', {replace: true}))}>Log out</MyButton>
						: null
				}
			</header>
			<h1 style={{'textAlign': 'center'}}>Blog Project</h1>
			<Outlet />
		</div>
	);
};

export default Layout;