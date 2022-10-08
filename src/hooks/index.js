import {useState, useMemo, useContext} from "react";
import {AuthContext} from "../hoc/AuthProvider";

const useFetching = (callback) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const fetching = async (a) => {
		try {
			setIsLoading(true);
			await callback(a);
		}
		catch (e) {
			setError(e.message);
		}
		finally {
			setIsLoading(false);
		}
	}
	return [fetching, isLoading, error]
}

const useSortedPosts = (posts, sortFunc, sortBy) => {
	return useMemo(() => {
		if (sortBy) {
			return [...posts].sort((a,b) => a[sortBy].localeCompare(b[sortBy]));
		}
		return posts
	}, [sortBy, posts])
}

const useSortedAndSearchedPosts = (searchQuery, sortedPosts) => {
	return useMemo(() => {
		return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
	}, [searchQuery, sortedPosts])
}

const usePagination = (pagesCount) => {
	return useMemo(() => {
		const pagesArray = [];
		for (let i = 1; i <= pagesCount; i++) {
			pagesArray.push(i)
		}
		return pagesArray
	}, [pagesCount])
}

const useAuth = () => {
	return useContext(AuthContext)
}

export {useFetching, useSortedPosts, useSortedAndSearchedPosts, usePagination, useAuth}