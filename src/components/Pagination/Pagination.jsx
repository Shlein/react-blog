import React from 'react';
import {v4 as uuid} from "uuid";
import styles from './Pagination.module.css'
import {usePagination} from "../../hooks";

const Pagination = ({changePage, page, pageCount}) => {
	const pagesArray = usePagination(pageCount)
	return (
		<div className={styles.pages}>
			{
				pagesArray.map(pageNum => (
					<span
						className={page === pageNum ? [styles.page, styles.pageCurrent].join(' ') : styles.page}
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