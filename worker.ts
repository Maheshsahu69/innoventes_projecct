import { SW_INIT, SW_UPDATE } from "./types";

interface ServiceWorkerInitAction {
  type: typeof SW_INIT,
  payload?: ServiceWorkerRegistration
}

interface ServiceWorkerUpdateAction {
  type: typeof SW_UPDATE,
  payload: ServiceWorkerRegistration
}

export type WorkerActionTypes = ServiceWorkerInitAction | ServiceWorkerUpdateAction;

export const serviceWorkerInitAction = (registration: ServiceWorkerRegistration): WorkerActionTypes => {
  return {
    type: SW_INIT,
    payload: registration
  }
}

export const serviceWorkerUpdateAction = (registration: ServiceWorkerRegistration): WorkerActionTypes => {
  return {
    type: SW_UPDATE,
    payload: registration
  }
}