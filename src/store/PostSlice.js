const {createSlice, createAsyncThunk} = require("@reduxjs/toolkit");

export const fetchAllPosts = createAsyncThunk(
	'posts/fetchPosts',
	async function({limit = 10, page = 1}, {rejectWithValue}) {
		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

			if (!response.ok) {
				throw new Error('Server Error!');
			}

			return await response.json()

		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

export const addAsyncPost = createAsyncThunk(
	'posts/addNewPost',
	async function({title, body}, {rejectWithValue, getState, dispatch}, ) {
		try {
			const postsAmount = getState(state => state.posts.length)
			const post = {
				id: postsAmount + 1,
				title: title,
				body: body,
			}

			const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(post)
			})

			if (!response.ok) {
				throw new Error(`Cannot add post`);
			}

			const data = await response.json();

			dispatch(addPost(data))

		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

const setError = (state, action) => {
	state.status = 'rejected';
	state.error = action.payload;
}

const postSlice = createSlice({
	name: 'posts',
	initialState: {
		posts: [],
		status: null,
		error: null,
	},
	reducers: {
		addPost(state, action) {
			state.posts.push(action.payload)
		}
	},
	extraReducers: {
		[fetchAllPosts.pending]: (state) => {
			state.status = 'loading';
			state.error = null;
		},
		[fetchAllPosts.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.posts = action.payload;
		},
		[fetchAllPosts.rejected]: setError,
		[addAsyncPost.rejected]: setError,
	}
})

export default postSlice.reducer;

export const {addPost} = postSlice.actions