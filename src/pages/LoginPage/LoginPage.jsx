import React from 'react';
import MyInput from "../../UI/MyInput/MyInput";
import MyButton from "../../UI/MyButton/MyButton";
import styles from './LoginPage.module.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks";

const LoginPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const {signIn} = useAuth();

	const fromPage = location.state?.from?.pathname || '/home';

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const user = form.username.value;
		signIn(user, () => navigate(fromPage, {replace: true}));
	}

	return (
		<div className={styles.wrapper}>
			<h1>Authorization</h1>
			<form className={styles.form} onSubmit={handleSubmit}>
				<MyInput name='username' style={{'marginBottom': 30}} type='text' placeholder='Enter your login' />
				<MyInput style={{'marginBottom': 30}} type='password' placeholder='Enter your password' />
				<MyButton>Log in</MyButton>
			</form>
		</div>
	);
};

export default LoginPage;