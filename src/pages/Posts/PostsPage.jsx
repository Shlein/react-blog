import '../../App.css';
import styles from './PostsPage.module.css'
import {useEffect, useRef, useState} from "react";
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
	const {status, error} = useSelector(state => state.posts);
	const [isModalVisible, setModalVisible] = useState(false);
	const [post, setPost] = useState({title: '', body: ''});

	const [filter, setFilter] = useState({sort: '', search: ''});

	useEffect(() => {
		dispatch(fetchAllPosts({}))
	}, [dispatch])

	const modalInputRef = useRef();

	function handleModalButton() {
		setModalVisible(true);
	}

	const addPost = (e) => {
		e.preventDefault();
		dispatch(addAsyncPost({title: post.title, body: post.body}))
		setPost({title: '', body: ''});
		setModalVisible(false);
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

			<PostsList filter={filter} setFilter={setFilter}/>

			{status === 'loading'
				?
				<div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
					<Loader/>
				</div>
				: null
			}

			{error ? <h2>{error.message}</h2> : null}

			<Pagination />
		</div>
	)
}

export default PostsPage;
