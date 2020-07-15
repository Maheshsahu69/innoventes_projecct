import { SW_INIT, SW_UPDATE } from "../actions/types";
import { WorkerActionTypes } from "../actions/worker";

export interface ServiceWorkerState {
  serviceWorkerInitialized: boolean,
  serviceWorkerUpdated: boolean,
  serviceWorkerRegistration: ServiceWorkerRegistration
}

const initialState: ServiceWorkerState = {
  serviceWorkerInitialized: false,
  serviceWorkerUpdated: false,
  serviceWorkerRegistration: {} as ServiceWorkerRegistration
}

export default function (state = initialState, action: WorkerActionTypes) {
  switch (action.type) {
    case SW_INIT:
      return {
        ...state,
        serviceWorkerInitialized: !state.serviceWorkerInitialized,
      };
    case SW_UPDATE:
      return {
        ...state,
        serviceWorkerUpdated: !state.serviceWorkerUpdated,
        serviceWorkerRegistration: action.payload,
      };
    default:
      return state;
  }
}
