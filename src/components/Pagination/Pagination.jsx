import React from 'react';
import {v4 as uuid} from "uuid";
import styles from './Pagination.module.css'
import {usePagination} from "../../hooks";
import {useDispatch, useSelector} from "react-redux";

const Pagination = () => {
	const {page, pagesCount} = useSelector(state => state.posts);
	const dispatch = useDispatch();
	const pagesArray = usePagination(pagesCount);
	const changePage = (page) => {
		dispatch(() => changePage({page}))
	}
	return (
		<div className={styles.pages}>
			{
				pagesArray.map(pageNum => (
					<span
						className={page === pageNum ? [styles.page, styles.pageCurrent].join(' ') : styles.page}
						key={uuid()}
						onClick={() => changePage({pageNum})}
					>
            {pageNum}
          </span>
				))
			}
		</div>
	);
};

export default Pagination;