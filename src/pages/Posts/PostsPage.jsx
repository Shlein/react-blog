import '../../App.css';
import styles from './PostsPage.module.css'
import {useEffect, useRef, useState} from "react";
import {useFetching, useSortedAndSearchedPosts, useSortedPosts} from "../../hooks";
import PostService from "../../services/PostService";
import {getPagesCount} from "../../utils/pages";
import MyModal from "../../UI/MyModal/MyModal";
import MyInput from "../../UI/MyInput/MyInput";
import MyButton from "../../UI/MyButton/MyButton";
import PostFilter from "../../components/PostFilter/PostFilter";
import Loader from "../../UI/Loader/Loader";
import PostsList from "../../components/PostsList/PostsList";
import Pagination from "../../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {addAsyncPost, fetchAllPosts} from "../../store/PostSlice";

function PostsPage() {

	const dispatch = useDispatch();
	const {posts, status, error} = useSelector(state => state.posts);
	// const [posts, setPosts] = useState([])
	const [isModalVisible, setModalVisible] = useState(false);
	const [post, setPost] = useState({title: '', body: ''});
	const [filter, setFilter] = useState({sort: '', search: ''});
	const [queryParams, setQueryParams] = useState({page: 1, limit: 10, pagesCount: 0})
	// const sortedPosts = useSortedPosts(posts, setFilter, filter.sort);

	// const sortedAndSearchedPosts = useSortedAndSearchedPosts(filter.search, sortedPosts);
	// const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
	// 	setTimeout(async () => {
	// 		// const response = dispatch(fetchAllPosts);
	// 		// const totalCount = response.headers['x-total-count'];
	// 		// setQueryParams({...queryParams, pagesCount: getPagesCount(totalCount, queryParams.limit)});
	// 		// setPosts(response.data);
	// 	}, 1000)
	// })

	useEffect(() => {
		dispatch(fetchAllPosts({limit: queryParams.limit, page: queryParams.page}))
	}, [dispatch])

	const modalInputRef = useRef();

	// useEffect(() => {
	// 	fetchPosts();
	// }, [queryParams.page])

	const changePage = (page) => {
		setQueryParams({...queryParams, page: page})
	}

	function handleModalButton() {
		setModalVisible(true);
	}

	const addPost = (e) => {
		e.preventDefault();
		dispatch(addAsyncPost({title: post.title, body: post.body}))

		// const newPost = {
		// 	'id': posts.length + 1,
		// 	'title': post.title,
		// 	'body': post.body,
		// };
		// // setPosts([...posts, newPost]);
		setPost({title: '', body: ''});
		setModalVisible(false);
	}

	const removePost = (postId) => {
		// setPosts([...posts].filter((post) => post.id !== postId))
	}

	return (
		<div className={styles.wrapper}>
			<MyModal
				isVisible={isModalVisible}
				setVisible={setModalVisible}
			>
				<h3>Создать пост</h3>
				<form>
					<MyInput
						placeholder='Введите название поста'
						onChange={(e) => setPost({title: e.target.value, body: post.body})}
						value={post.title}
						ref={modalInputRef}
					/>
					<MyInput
						placeholder='Введите описание поста'
						onChange={(e) => setPost({title: post.title, body: e.target.value})}
						value={post.body}
					/>
					<MyButton
						onClick={addPost}
					>
						Создать пост
					</MyButton>
				</form>
			</MyModal>

			<MyButton
				onClick={handleModalButton}
				style={{marginBottom: 20}}
			>
				Добавить пост
			</MyButton>

			<PostFilter filter={filter} setFilter={setFilter}/>

			<PostsList
				posts={posts}
				removePost={removePost}
			/>

			{/*{postError && <h1>Error! {postError}</h1>}*/}

			{/*{*/}
			{/*	isPostsLoading*/}
			{/*		?*/}
			{/*		<div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>*/}
			{/*			<Loader/>*/}
			{/*		</div>*/}
			{/*		:*/}
			{/*		<PostsList*/}
			{/*			posts={posts}*/}
			{/*			removePost={removePost}*/}
			{/*		/>*/}
			{/*}*/}

			{status === 'loading'
				?
				<div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
					<Loader/>
				</div>
				: null
			}

			{error ? <h2>{error.message}</h2> : null}

			<Pagination page={queryParams.page} changePage={changePage} pageCount={queryParams.pagesCount}/>
		</div>
	)
}

export default PostsPage;
