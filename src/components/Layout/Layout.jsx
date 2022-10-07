import React from 'react';
import styles from './Layout.module.css'
import {NavLink, Outlet} from "react-router-dom";

const Layout = () => {
	return (
		<div>
			<header className={styles.header}>
				<NavLink to='/home' className={({isActive}) => isActive ? styles.activeLink : styles.link}>Home</NavLink>
				<NavLink to='/posts' className={({isActive}) => isActive ? styles.activeLink : styles.link}>Posts</NavLink>
				<NavLink to='/about' className={({isActive}) => isActive ? styles.activeLink : styles.link}>About</NavLink>
			</header>
			<h1 style={{'textAlign': 'center'}}>Blog Project</h1>
			<Outlet />
		</div>
	);
};

export default Layout;