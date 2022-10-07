import React from 'react';
import classes from './MyButton.module.css'

const MyButton = (props) => {
	return (
		<button
			className={[classes.btn, props.className].join(' ')}
			{...props}
		>
			{props.children}
		</button>
	);
};

export default MyButton;