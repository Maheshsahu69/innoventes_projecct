import { Post, PostDetail } from '../types';
import { PostActionTypes } from '../actions/post';
import { GET_POSTS_SUCCESS, GET_POSTS_FAIL, GET_POSTS_COMPLETE, GET_POST_DETAIL_SUCCESS, GET_POST_DETAIL_FAIL, SEARCH_POST_SUCCESS, FETCH_POST, SEARCH_QUERY } from '../actions/types';

export interface PostState {
  loading: boolean,
  posts: Post[],
  post: PostDetail,
  error: string,
  query: string,
  searchResults: PostDetail[],
  loadMore: boolean
}

const initialState: PostState = {
  loading: true,
  loadMore: true,
  posts: [],
  query: '',
  post: {} as PostDetail,
  searchResults: [],
  error: ''
}

export default function (state = initialState, action: PostActionTypes) {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, loading: true };
    case SEARCH_QUERY:
      return { ...state, query: action.query };
    case GET_POSTS_SUCCESS:
      if (action.offset === 0) {
        return { ...state, posts: action.posts, loadMore: true, loading: false };
      }
      return { ...state, posts: [...state.posts, ...action.posts], loadMore: true, loading: false };
    case GET_POSTS_FAIL:
      return { ...state, error: action.message, loading: false };
    case GET_POSTS_COMPLETE:
      return { ...state, loadMore: false }
    case GET_POST_DETAIL_SUCCESS:
      return { ...state, post: action.post, loading: false };
    case GET_POST_DETAIL_FAIL:
      return { ...state, error: action.message };
    case SEARCH_POST_SUCCESS:
      if (action.offset === 0) {
        return { ...state, searchResults: action.posts, loadMore: true, loading: false };
      } else {
        return { ...state, searchResults: [...state.searchResults, ...action.posts], loadMore: true, loading: false };
      }
    default:
      return state;
  }
}