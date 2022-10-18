import React from 'react';
import {v4 as uuid} from "uuid";
import styles from './Pagination.module.css'
import {usePagination} from "../../hooks";
import {useDispatch, useSelector} from "react-redux";
import {getPagesCount} from "../../utils/pages";
import {useParams} from "react-router-dom";
import {fetchAllPosts, setCurrentPage} from "../../store/PostSlice";

const Pagination = () => {
	const {currentPage, pageLimit, posts} = useSelector(state => state.posts);
	const postsAmount = posts.length;
	const dispatch = useDispatch();
	const pagesArray = usePagination(getPagesCount(postsAmount, pageLimit && true));
	const changePage = (page) => dispatch(fetchAllPosts({limit: 10, page}));

	// console.log(currentPage, pageLimit, postsAmount)

	return (
		<div className={styles.pages}>
			{
				pagesArray.map(pageNum => (
					<span
						className={currentPage === pageNum ? [styles.page, styles.pageCurrent].join(' ') : styles.page}
						key={uuid()}
						onClick={() => changePage(pageNum)}
					>
            {pageNum}
          </span>
				))
			}
		</div>
	);
};

export default Pagination;