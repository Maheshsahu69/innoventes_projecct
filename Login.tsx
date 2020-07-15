import React, { useState, useEffect } from 'react';
import logo from '../images/icon.png';
import './Login.css';
import {
  IonImg,
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonTitle,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doLogin } from '../actions/auth';
import { setAlert } from '../actions/alert';
import { RootState } from '../reducers';
import close from '../images/close.png';

const Login: React.FC = () => {
  const token = useSelector<RootState, string>(state => state.auth.token);
  useEffect(() => {
    if (token) {
      history.push('/posts');
    }
    // eslint-disable-next-line
  }, [token]);
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (email && password) {
      dispatch(doLogin(email, password));
    } else {
      dispatch(setAlert('All fields are required', 'danger'));
    }
  };

  const onClose = () => {
    history.replace('/');
  }

  return (
    <IonPage>
      <IonContent className='bg-img-login'>
        <IonGrid>
          <IonRow>
            <IonCol size='2'>
              <IonImg onClick={() => onClose()} src={close} alt='Close Button' className='button-close' />
            </IonCol>
            <IonCol size='10' className='image-add-photo'>
              <IonImg src={logo} alt='Vault29 Logo' className='top-img-login' />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonTitle className='login-txt'>LOG IN</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className='ion-padding'>
              <IonItem className='email-ion-item' color='transparent'>
                <IonInput
                  type='email'
                  className='email-txt'
                  placeholder='Email Address'
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  value={email}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className='ion-padding'>
              <IonItem className='pass-ion-item' color='transparent'>
                <IonInput
                  type='password'
                  className='password-login'
                  placeholder='Password'
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  value={password}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className='ion-padding'>
              <IonButton
                fill='outline'
                expand='block'
                strong
                size='large'
                className='btn-login'
                onClick={() => onLogin()}
              >
                LOG IN
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className='ion-padding'>
              <IonTitle className='dash-txt bold'>___</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className='ion-padding'>
              <IonTitle className='new-member-txt'> New member?</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className='ion-padding'>
              <Link to='/join' className='link-create-account'>
                <IonTitle className='create-account-txt bold'>
                  CREATE ACCOUNT
                  </IonTitle>
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
