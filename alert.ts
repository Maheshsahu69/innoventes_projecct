import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
import { AlertActionTypes } from '../actions/alert';
import { AlertMessage } from '../types';

export interface AlertState {
  alerts: AlertMessage[];
}

const initialState: AlertState = {
  alerts: []
}

export default function (state = initialState, action: AlertActionTypes) {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, alerts: [...state.alerts, action.payload] };
    case REMOVE_ALERT:
      return { ...state, alerts: state.alerts.filter(alert => alert.id !== action.id) };
    default:
      return state;
  }
}