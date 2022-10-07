import React from 'react';
import MyButton from "../../UI/MyButton/MyButton";
import {useNavigate} from 'react-router-dom'

const PostItem = ({title, body, removePost, id}) => {
	const navigate = useNavigate();
	const goPost = () => navigate(`/posts/${id}`);

	return (
		<div className='post'>
			<div className='post__info'>
				<strong>{id}<div className='post__title'>{title}</div></strong>
				<div className='post__body'>{body}</div>
			</div>
			<div className='post__btns'>
				{/*bad approach*/}
				<MyButton onClick={goPost}>Open</MyButton>
				<MyButton onClick={() => removePost(id)}>Delete</MyButton>
			</div>
		</div>
	);
};

export default PostItem;