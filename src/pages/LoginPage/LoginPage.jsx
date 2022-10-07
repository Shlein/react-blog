import React from 'react';
import MyInput from "../../UI/MyInput/MyInput";
import MyButton from "../../UI/MyButton/MyButton";

const LoginPage = () => {
	return (
		<div>
			<h1>Authorization</h1>
			<form>
				<MyInput type='text' placeholder='Enter your login' />
				<MyInput type='password' placeholder='Enter your password' />
				<MyButton>Login</MyButton>
			</form>
		</div>
	);
};

export default LoginPage;