import { v4 as uuidv4 } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
import { AlertMessage } from '../types';

interface SetAlertAction {
  type: typeof SET_ALERT,
  payload: AlertMessage
}

interface RemoveAlertAction {
  type: typeof REMOVE_ALERT,
  id: string
}

export type AlertActionTypes = SetAlertAction | RemoveAlertAction;

const setAlertAction = (alert: AlertMessage): AlertActionTypes => {
  return {
    type: SET_ALERT,
    payload: alert
  }
}

const removeAlertAction = (id: string): AlertActionTypes => {
  return {
    type: REMOVE_ALERT,
    id
  }
}

export const setAlert = (msg: string, alertType: string, timeout = 5000) => (dispatch: (arg0: AlertActionTypes) => void) => {
  const id = uuidv4();
  dispatch(setAlertAction({ msg, alertType, id }));
  setTimeout(() => dispatch(removeAlertAction(id)), timeout);
};
