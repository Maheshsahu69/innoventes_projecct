import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import {
  IonApp, IonRouterOutlet, IonToast, IonAlert
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import TabRoot from './pages/TabRoot';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Alert from './components/Alert';
import { setAccept, setAuthToken } from './utils/setCommonHeaders';
import Join from './pages/Join';
import { loadState } from './utils/localStorage';
import PublicRoute from './routing/PublicRoute';
import PrivateRoute from './routing/PrivateRoute';
import Search from './pages/Search';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';
import { RootState } from './reducers';
import UserType from './pages/UserType';

setAccept();

const token = loadState('token');
token && setAuthToken(token);

const App: React.FC = () => {

  const [showAlert, setShowAlert] = useState(false);

  const isServiceWorkerInitialized = useSelector<RootState, boolean>(
    state => state.worker.serviceWorkerInitialized,
  );

  const isServiceWorkerUpdated = useSelector<RootState, boolean>(
    state => state.worker.serviceWorkerUpdated,
  );

  const serviceWorkerRegistration = useSelector<RootState, ServiceWorkerRegistration>(
    state => state.worker.serviceWorkerRegistration,
  );

  useEffect(() => {
    if (isServiceWorkerUpdated) {
      setShowAlert(true);
    }
  }, [isServiceWorkerUpdated]);

  const updateServiceWorker = () => {
    const registrationWaiting = serviceWorkerRegistration.waiting;

    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });

      registrationWaiting.addEventListener('statechange', (e: any) => {
        if (e.target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  };

  return (<IonApp>
    <Alert />
    {isServiceWorkerInitialized && (
      <IonToast isOpen message='This app is now available off-line' color='primary' duration={2000} />
    )}
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={() => setShowAlert(false)}
      header={'App Update Available'}
      message={`An updated version of this app is available.  Update now ?`}
      buttons={[
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            setShowAlert(false);
          }
        },
        {
          text: 'Ok',
          handler: () => {
            setShowAlert(false);
            updateServiceWorker();
          }
        }
      ]}
    />
    <IonReactRouter>
      <IonRouterOutlet>
        <PublicRoute exact path="/">
          <Home />
        </PublicRoute>
        <PublicRoute exact path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute exact path="/join">
          <Join />
        </PublicRoute>
        <PrivateRoute exact path="/search">
          <Search />
        </PrivateRoute>
        <PrivateRoute exact path="/profile/:id">
          <Profile />
        </PrivateRoute>
        <Route>
          <TabRoot />
        </Route>
        <PublicRoute exact path="/usertype">
          <UserType />
        </PublicRoute>
      </IonRouterOutlet>
    </IonReactRouter>``
  </IonApp>
  )
};

export default App;
