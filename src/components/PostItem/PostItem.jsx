import React from 'react';
import MyButton from "../../UI/MyButton/MyButton";
import {useNavigate} from 'react-router-dom'
import {removeAsyncPost, removePost} from "../../store/PostSlice";
import {useDispatch} from "react-redux";

const PostItem = ({title, body, id}) => {
	const navigate = useNavigate();
	const goPost = () => navigate(`/posts/${id}`);
	const dispatch = useDispatch();

	const deletePost = (postId) => {
		dispatch(() => removeAsyncPost(postId))
	}

	return (
		<div className='post'>
			<div className='post__info'>
				<strong>{id}<div className='post__title'>{title}</div></strong>
				<div className='post__body'>{body}</div>
			</div>
			<div className='post__btns'>
				{/*bad approach*/}
				<MyButton onClick={goPost}>Open</MyButton>
				<MyButton onClick={() => dispatch(removeAsyncPost(id))}>Delete</MyButton>
			</div>
		</div>
	);
};

export default PostItem;