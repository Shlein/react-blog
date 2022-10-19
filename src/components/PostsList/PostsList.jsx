import React, {useState} from 'react';
import PostItem from "../PostItem/PostItem";
import {v4 as uuid} from 'uuid'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styles from './PostList.module.css'
import {useSelector} from "react-redux";
import {useSortedAndSearchedPosts, useSortedPosts} from "../../hooks";

const PostsList = ({filter, setFilter}) => {
	const {posts} = useSelector(state => state.posts);
	// const [filter, setFilter] = useState({sort: '', search: ''});
	const sortedPosts = useSortedPosts(posts, setFilter, filter.sort);
	const sortedAndSearchedPosts = useSortedAndSearchedPosts(filter.search, sortedPosts);

	if (posts.length === 0) {
		return (
			<h2>Посты не найдены</h2>
		)
	}

	return (
		<React.Fragment>
			<h1>Список постов</h1>
				{sortedAndSearchedPosts.map((post) =>
						<PostItem
							key={uuid()}
							id={post.id}
							title={post.title}
							body={post.body}
						/>
					)}
		</React.Fragment>
	);
}

export default PostsList;