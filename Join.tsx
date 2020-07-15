import React, { useState, useEffect } from 'react';
import './Join.css';
import {
  IonImg,
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonTitle,
  IonInput,
  IonItem,
  IonButton,
  IonList,
  IonCheckbox,
  IonLabel,
  IonDatetime
} from '@ionic/react';
import icon from '../images/consumer-inactive.png';
import close from '../images/close.png';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doJoin } from '../actions/auth';
import { JoinForm } from '../types';
import { UserType, AccountType } from '../constants';
import { setAlert } from '../actions/alert';
import { RootState } from '../reducers';
import moment from 'moment';

const Join: React.FC = () => {
  const token = useSelector<RootState, string>(state => state.auth.token);
  useEffect(() => {
    if (token) {
      history.push('/posts');
    }
    // eslint-disable-next-line
  }, [token]);
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [location, setLocation] = useState('');
  const [maleFill, setMaleFill] = useState<"clear" | "outline" | "solid" | "default">('outline');
  const [femaleFill, setFemaleFill] = useState<"clear" | "outline" | "solid" | "default">('outline');

  const maxDate = moment().subtract(18, 'years').format('YYYY-MM-DD');
  const minDate = moment().subtract(100, 'years').format('YYYY-MM-DD');

  const onJoin = () => {
    if (username && name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const joinForm: JoinForm = {
          username,
          password,
          name,
          email,
          gender,
          location,
          date_of_birth: birthday,
          user_type: UserType.Consumer,
          account_type: AccountType.Email
        };
        dispatch(doJoin(joinForm));
      } else {
        dispatch(setAlert('Password and confirm password must match', 'danger'));
      }
    } else {
      dispatch(setAlert('Required fields missing', 'danger'));
    }
  }

  const onMaleClicked = () => {
    setGender('Male');
    setFemaleFill('outline');
    setMaleFill('solid');
  }

  const onFemaleClicked = () => {
    setGender('Female');
    setMaleFill('outline');
    setFemaleFill('solid');
  }

  const onClose = () => {
    history.replace('/usertype');
  }

  return (
    <IonPage>
      <IonContent className='bg-img-join'>
        <IonGrid>
          <IonRow>
            <IonCol size='2'>
              <IonImg onClick={() => onClose()} src={close} alt='Close Button' className='button-close' />
            </IonCol>
            <IonCol size='10' className='image-add-photo'>
              <IonImg src={icon} alt='Add Photo' className='top-img-join' />
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonTitle className='ion-text-center' id='add-photo-txt'>
          Add Photo
        </IonTitle>

        <IonList className='bg-transparent'>
          <IonItem color='transparent' className='name-item'>
            <IonInput
              placeholder='Name'
              className='name-txtbx'
              type='text'
              onIonChange={(e) => setName(e.detail.value!)}
              value={name}
            />
          </IonItem>
          <IonItem color='transparent' className='username-item'>
            <IonInput
              placeholder='Username'
              className='username-txtbx'
              type='text'
              onIonChange={(e) => setUsername(e.detail.value!)}
              value={username}
            ></IonInput>
          </IonItem>
          <IonItem color='transparent' className='email-item'>
            <IonInput
              placeholder='Email Address'
              className='email-txtbx'
              type='email'
              onIonChange={(e) => {
                setEmail(e.detail.value!);
              }}
              value={email}
            ></IonInput>
          </IonItem>
          <IonItem color='transparent' className='password-item'>
            <IonInput
              placeholder='Password'
              className='password-txtbx'
              type='password'
              onIonChange={(e) => setPassword(e.detail.value!)}
              value={password}
            />
          </IonItem>
          <IonItem color='transparent' className='confirm-password-item'>
            <IonInput
              placeholder='Confirm Password'
              className='confirm-password-txtbx'
              type='password'
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              value={confirmPassword}
            ></IonInput>
          </IonItem>
          <IonItem color='transparent' className='location-item'>
            <IonInput
              placeholder='Location'
              className='location-txtbx'
              type='text'
              onIonChange={(e) => setLocation(e.detail.value!)}
              value={location}
            ></IonInput>
          </IonItem>
          <IonItem color='transparent' className='location-item'>
            <IonDatetime placeholder='Birthday' value={birthday} name='birthday'
              className='birthday-txt'
              displayFormat="DD MMM YYYY" min={minDate} max={maxDate}
              onIonChange={e => setBirthday(e.detail.value!)} >
            </IonDatetime>
          </IonItem>
        </IonList>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                size='large'
                expand='block'
                strong
                fill={maleFill}
                className='btn-join-joinpage'
                onClick={() => onMaleClicked()}
              >
                {' '}
                    MALE
                  </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                size='large'
                expand='block'
                strong
                fill={femaleFill}
                className='btn-join-joinpage'
                onClick={() => onFemaleClicked()}
              >
                {' '}
                    FEMALE
                  </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem color='transparent' lines='none'>
                <IonCheckbox className='cb-transparent' slot='start'></IonCheckbox>
                <IonLabel className='ion-text-wrap'>By accepting Terms of Use, I acknowledge that I am of legal drinking age</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                size='large'
                expand='block'
                strong
                fill='outline'
                className='btn-join-joinpage'
                onClick={() => onJoin()}
              >
                {' '}
                  JOIN
                </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage >
  );
};

export default Join;
