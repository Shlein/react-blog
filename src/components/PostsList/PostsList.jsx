import React from 'react';
import PostItem from "../PostItem/PostItem";
import {v4 as uuid} from 'uuid'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styles from './PostList.module.css'
import {useSelector} from "react-redux";

const PostsList = () => {
	const {posts} = useSelector(state => state.posts)

	if (posts.length === 0) {
		return (
			<h2>Посты не найдены</h2>
		)
	}

	return (
		<React.Fragment>
			<h1>Список постов</h1>
			{/*<TransitionGroup>*/}
				{posts.map((post, index) =>
					// <CSSTransition
					// 	key={uuid()}
					// 	timeout={500}
					// 	classNames='post'
					// >
						<PostItem
							key={uuid()}
							id={post.id}
							title={post.title}
							body={post.body}
							// removePost={removePost}
						/>
					// </CSSTransition>
					)}
			{/*</TransitionGroup>*/}
		</React.Fragment>
	);
}

export default PostsList;