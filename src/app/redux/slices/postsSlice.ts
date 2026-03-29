import { IPost } from "@/app/interfaces/postInterFace";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IPostsState {
  loading: boolean;
  posts: IPost[];
  post:IPost|null
}

const initialState: IPostsState = {
  loading: false,
  posts: [],
  post:null
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    if (localStorage.getItem("token")) {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/posts?limit=50",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      // API response: { success: true, data: { posts: [...] } }
      return data.data?.posts ?? data.posts;
    }
  } catch (error) {
    return error
  }
});

export const getSinglePost = createAsyncThunk("posts/getSinglePost", async (id:string) => {
  try {
    if (localStorage.getItem("token")) {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/posts/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );


      // API response: { success: true, data: { post: {...} } }
      return data.data?.post ?? data.post;
    }
  } catch (error) {
    return error
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.posts = action.payload;
      }
    });
    builder.addCase(getSinglePost.pending, (state)=>{
      state.loading = true
    })
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.post = action.payload;
      }
    })
  },
});

export const posts = postsSlice.reducer;
