import {configureStore} from "@reduxjs/toolkit";
import posts from './PostSlice'

export default configureStore({
	reducer: {
		posts: posts
	}
})