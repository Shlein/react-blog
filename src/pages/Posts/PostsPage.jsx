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

function PostsPage() {

	const [posts, setPosts] = useState([
		// {id: 1, title: 'JS', body: 'Nice'},
		// {id: 2, title: 'Python', body: 'Norm'},
		// {id: 3, title: 'Java', body: 'Kal'},
	])
	const [isModalVisible, setModalVisible] = useState(false);
	const [post, setPost] = useState({title: '', body: ''});
	const [filter, setFilter] = useState({sort: '', search: ''});
	const [queryParams, setQueryParams] = useState({page: 1, limit: 10, pagesCount: 0})
	const sortedPosts = useSortedPosts(posts, setFilter, filter.sort);

	const sortedAndSearchedPosts = useSortedAndSearchedPosts(filter.search, sortedPosts);
	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		setTimeout(async () => {
			const response = await PostService.getAllPosts(queryParams.limit, queryParams.page);
			const totalCount = response.headers['x-total-count'];
			setQueryParams({...queryParams, pagesCount: getPagesCount(totalCount, queryParams.limit)});
			setPosts(response.data);
		}, 1000)
	})

	const modalInputRef = useRef();

	useEffect(() => {
		fetchPosts();
	}, [queryParams.page])

	const changePage = (page) => {
		setQueryParams({...queryParams, page: page})
	}

	function handleModalButton() {
		setModalVisible(true);
	}

	const addPost = (e) => {
		e.preventDefault();
		const newPost = {
			'id': Date.now(),
			'title': post.title,
			'body': post.body,
		};
		setPosts([...posts, newPost]);
		setPost({title: '', body: ''});
		setModalVisible(false);
	}

	const removePost = (postId) => {
		setPosts([...posts].filter((post) => post.id !== postId))
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

			{postError && <h1>Error! {postError}</h1>}

			{
				isPostsLoading
					?
					<div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
						<Loader/>
					</div>
					:
					<PostsList
						posts={sortedAndSearchedPosts}
						removePost={removePost}
					/>
			}

			<Pagination page={queryParams.page} changePage={changePage} pageCount={queryParams.pagesCount}/>
		</div>
	)
}

export default PostsPage;
