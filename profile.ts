import { GET_PROFILE_SUCCESS, GET_PROFILE_FAIL, FETCH_PROFILE, USER_POSTS_SUCCESS, USER_POSTS_FAIL, USER_POSTS_COMPLETE } from "./types";
import { User, PostDetail } from "../types";
import { AppThunk } from "../store";
import { API_ENDPOINT } from "../constants";
import { setAlert } from "./alert";
import axios from 'axios';

interface FetchProfileAction {
  type: typeof FETCH_PROFILE
}

interface ProfileSuccessAction {
  type: typeof GET_PROFILE_SUCCESS,
  user: User
}

interface ProfileFailAction {
  type: typeof GET_PROFILE_FAIL,
  message: string
}

interface UserPostAction {
  type: typeof USER_POSTS_SUCCESS,
  posts: PostDetail[],
  offset: number,
  count: number
}

interface UserPostFailAction {
  type: typeof USER_POSTS_FAIL,
  message: string,
  count?: number
}

interface UserPostCompleteAction {
  type: typeof USER_POSTS_COMPLETE
}

export type ProfileActionTypes = ProfileSuccessAction | ProfileFailAction |
  FetchProfileAction | UserPostAction | UserPostFailAction | UserPostCompleteAction;

const profileSuccessAction = (user: User) => {
  return {
    type: GET_PROFILE_SUCCESS,
    user
  }
}

const profileFailAction = (message: string) => {
  return {
    type: GET_PROFILE_FAIL,
    message
  }
}

export const fetchProfileAction = () => {
  return {
    type: FETCH_PROFILE
  }
}

export const userPostAction = (posts: PostDetail[], offset: number, count: number): ProfileActionTypes => {
  return {
    type: USER_POSTS_SUCCESS,
    posts,
    offset,
    count
  }
}

export const userPostFailAction = (message: string, count = 0): ProfileActionTypes => {
  return {
    type: USER_POSTS_FAIL,
    message,
    count
  }
}

export const userPostCompleteAction = (): ProfileActionTypes => {
  return {
    type: USER_POSTS_COMPLETE
  }
}

export const getProfile = (id: number, my_id: number): AppThunk => async dispatch => {
  dispatch(fetchProfileAction());
  try {
    const res = await axios.get(`${API_ENDPOINT}/user/other`, {
      params: {
        id,
        my_id
      }
    });

    if (JSON.parse(res.data.success)) {
      dispatch(profileSuccessAction(res.data.user));
    } else {
      dispatch(setAlert(res.data.message, 'danger'));
      dispatch(profileFailAction(res.data.message));
    }
  } catch (err) {
    console.log(err);
    dispatch(setAlert('Unknown error occurred. Plesae retry', 'danger'));
    dispatch(profileFailAction('Unknown error'));
  }
};

export const getUserPosts = (user_id: number, my_id: number, offset = 0, limit = 20): AppThunk => async dispatch => {
  dispatch(fetchProfileAction());
  try {
    const res = await axios.get(`${API_ENDPOINT}/user/posts`, {
      params: {
        user_id,
        my_id,
        limit,
        offset
      }
    });

    if (JSON.parse(res.data.success)) {
      dispatch(userPostAction(res.data.data, offset, res.data.post_count));
      console.log("res.data.success",res.data.success);
    } else {
      dispatch(setAlert(res.data.message, 'danger'));
      dispatch(userPostFailAction(res.data.message, res.data.post_count));
      dispatch(userPostCompleteAction());
    }
  } catch (err) {
    console.log(err);
    dispatch(setAlert('Unknown error occurred. Plesae retry', 'danger'));
    dispatch(userPostFailAction('Unknown error'));
  }
};