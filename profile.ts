import { User, PostDetail } from '../types';
import { ProfileActionTypes } from '../actions/profile';
import { GET_PROFILE_SUCCESS, FETCH_PROFILE, GET_PROFILE_FAIL, USER_POSTS_SUCCESS, USER_POSTS_FAIL, USER_POSTS_COMPLETE } from '../actions/types';

export interface ProfileState {
  profile: User,
  loadMore: boolean,
  loading: boolean,
  error: string,
  posts: PostDetail[],
  count: number
}

const initialState: ProfileState = {
  profile: {} as User,
  loadMore: true,
  loading: true,
  error: '',
  posts: [],
  count: 0
}

export default function (state = initialState, action: ProfileActionTypes) {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return { ...state, profile: action.user, loading: false };
    case FETCH_PROFILE:
      return { ...state, loading: true };
    case GET_PROFILE_FAIL:
      return { ...state, error: action.message, loading: false };
    case USER_POSTS_SUCCESS:
      if (action.offset === 0) {
        return { ...state, posts: action.posts, count: action.count, loadMore: true, loading: false };
      }
      return { ...state, posts: [...state.posts, ...action.posts], loadMore: true, count: action.count, loading: false };
    case USER_POSTS_FAIL:
      return { ...state, loading: false, error: action.message };
    case USER_POSTS_COMPLETE:
      return { ...state, loadMore: false };
    default:
      return state;
  }
}
