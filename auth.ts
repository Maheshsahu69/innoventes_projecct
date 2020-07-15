import { User } from "../types";
import { AuthActionTypes } from "../actions/auth";
import { LOGIN_SUCCESS, LOGIN_FAIL, JOIN_SUCCESS, JOIN_FAIL } from "../actions/types";
import { loadState } from "../utils/localStorage";

export interface AuthState {
  loading: boolean,
  user: User,
  token: string,
  error: string
}

const initialState: AuthState = {
  loading: true,
  user: loadState('user') || {} as User,
  token: loadState('token') || '',
  error: ''
}

export default function (state = initialState, action: AuthActionTypes) {
  switch (action.type) {
    case JOIN_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, user: action.user, token: action.token, loading: false };
    case LOGIN_FAIL:
      return { ...state, user: {} as User, token: '', loading: false, error: action.message };
    case JOIN_FAIL:
      return { ...state, error: action.message };
    default:
      return state;
  }
}