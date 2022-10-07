import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import styles from './PostPage.module.css'
import PostService from "../../services/PostService";
import {useFetching} from "../../hooks";
import Loader from "../../UI/Loader/Loader";
import MyButton from "../../UI/MyButton/MyButton";

const PostPage = () => {
	const {id} = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [areCommentsVisible, setCommentsVisible] = useState(false);
	const [fetchPostById, isPostLoading, postError] = useFetching(async (postId) => {
		const response = await PostService.getPostById(postId);
		setPost(response.data)
	})

	const [fetchCommentsById, areCommentsLoading, commentsError] = useFetching(async (postId) => {
		const response = await PostService.getCommentsByPostId(postId);
		setComments(response.data)
	})

	useEffect(() => {
		fetchPostById(id)
	}, [])

	useEffect(() => {
		fetchCommentsById(id)
	}, [id])

	const toggleComments = () => {
		setCommentsVisible(!areCommentsVisible)
	}

	const renderComments = (isVisible) => {
		if (isVisible) {
			return (
				<div className={styles.commentsContainer}>
					{comments.map(comment =>
						<div className={styles.commentItem} key={comment.id}>
							<p className={styles.commentName}>{comment.name}</p>
							<p className={styles.commentEmail}>{comment.email}</p>
							<p className={styles.commentBody}>{comment.body}</p>
						</div>
					)}
					<MyButton onClick={toggleComments}>Hide comments</MyButton>
				</div>
			)
		} else {
			return (
				<MyButton onClick={toggleComments}>Show comments</MyButton>
			)
		}
	}

	const renderPost = (post) => {
		if (post) {
			return (
				<>
					<h2>Post # {post.id}</h2>
					<h2>{post.title}</h2>
					<p>{post.body}</p>
				</>
			)
		} else {
			return <Loader/>
		}
	}

	return (
		<div className={styles.wrapper}>
			{renderPost(post)}
			{renderComments(areCommentsVisible)}
		</div>
	);
};

export default PostPage;