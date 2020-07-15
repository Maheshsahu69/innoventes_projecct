 import { LOGIN_SUCCESS, LOGIN_FAIL, JOIN_SUCCESS, JOIN_FAIL } from "./types";
import { User, JoinForm } from "../types";
import { AppThunk } from "../store";
import axios from 'axios';
import { API_ENDPOINT } from "../constants";
import { setAlert } from "./alert";
import { setAuthToken } from "../utils/setCommonHeaders";
import { saveState } from "../utils/localStorage";

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS,
  user: User,
  token: string
}

interface JoinSuccessAction {
  type: typeof JOIN_SUCCESS,
  user: User,
  token: string
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL,
  message: string
}

interface JoinFailAction {
  type: typeof JOIN_FAIL,
  message: string
}

export type AuthActionTypes = LoginSuccessAction | LoginFailAction | JoinSuccessAction | JoinFailAction;

const loginAction = (user: User, token: string): AuthActionTypes => {
  return {
    type: LOGIN_SUCCESS,
    user,
    token
  }
}

const joinAction = (user: User, token: string): AuthActionTypes => {
  return {
    type: JOIN_SUCCESS,
    user,
    token
  }
}

const loginFailAction = (message: string): AuthActionTypes => {
  return {
    type: LOGIN_FAIL,
    message
  }
}

const joinFailAction = (message: string): AuthActionTypes => {
  return {
    type: JOIN_FAIL,
    message
  }
}

export const doLogin = (email: string, password: string): AppThunk => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`${API_ENDPOINT}/v2/user/signin`, { email, password }, config);

    if (JSON.parse(res.data.success)) {
      setAuthToken(res.data.token);
      saveState('token', res.data.token);
      saveState('user', res.data.user);
      dispatch(loginAction(res.data.user, res.data.token));
    } else {
      localStorage.removeItem('token');
      dispatch(setAlert(res.data.message, 'danger'));
      dispatch(loginFailAction(res.data.message));
    }
  } catch (err) {
    console.log(err);
    localStorage.removeItem('token');
    dispatch(setAlert('Unknown error occurred. Plesae retry', 'danger'));
    dispatch(loginFailAction('Unknown error'));
  }
};

export const doJoin = (joinForm: JoinForm): AppThunk => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`${API_ENDPOINT}/v2/user/signup`, joinForm, config);

    if (JSON.parse(res.data.success)) {
      setAuthToken(res.data.token);
      saveState('token', res.data.token);
      saveState('user', res.data.user);
      dispatch(joinAction(res.data.user, res.data.token));
    } else {
      dispatch(setAlert(res.data.message, 'danger'));
      dispatch(joinFailAction(res.data.message));
    }
  } catch (err) {
    console.log(err);
    dispatch(setAlert('Unknown error occurred. Plesae retry', 'danger'));
    dispatch(loginFailAction('Unknown error'));
  }
};