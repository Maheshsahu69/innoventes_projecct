import React, { useEffect } from 'react';
import { IonContent, IonPage, IonAvatar, IonBackButton, IonSpinner, IonText, IonItem, IonIcon, IonGrid, IonRow, IonCol, IonLabel, IonTitle } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useParams } from 'react-router';
import { User, PostDetail } from '../types';
import { API_ENDPOINT } from '../constants';
import { locationOutline, readerOutline } from 'ionicons/icons';
import './Profile.css';
import { getProfile, getUserPosts } from '../actions/profile';
import avatar from '../images/avatar-placeholder.png';
import ProfileList from '../components/ProfileList';

const Profile: React.FC = () => {
  const profile = useSelector<RootState, User>(state => state.profile.profile);
  const { id } = useParams();
  const user_id = useSelector<RootState, number>(state => state.auth.user.id);
  const dispatch = useDispatch();
  const loading = useSelector<RootState, boolean>(state => state.profile.loading);
  const posts = useSelector<RootState, PostDetail[]>(state => state.profile.posts);
  const count = useSelector<RootState, number>(state => state.profile.count);

  useEffect(() => {
    dispatch(getProfile(id, user_id));
    dispatch(getUserPosts(id, user_id));
    // eslint-disable-next-line
  }, []);

  const profileUrl = profile.facebook_uid ? `//graph.facebook.com/${profile.facebook_uid}/picture?type=large` : profile.photo_url ? `${API_ENDPOINT}/${profile.photo_url}` : avatar;

  return (
    <IonPage>

      {loading && posts.length < 1 ? <IonSpinner /> :
        (
          <IonContent>
            {}
            <div style={{
              background: `#fff url(${profileUrl}) no-repeat
    center center / cover`
            }}>
              <IonGrid className='opaque-grid'>
                <IonRow>
                  <IonCol size='2'>
                    <IonItem color='transparent' lines='none'><IonBackButton defaultHref='/posts'></IonBackButton></IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem color='transparent' lines='none'><IonTitle className='ion-text-center'>Profile</IonTitle>
                    </IonItem>
                  </IonCol>
                  <IonCol size='2'>
                    <IonItem color='transparent' lines='none'><IonLabel className='ion-text-end'>Block</IonLabel></IonItem></IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem color='transparent' lines='none' className='ion-text-center'>
                      <IonAvatar className='avatar-profile'>
                        <img alt='User Icon' src={profileUrl} />
                      </IonAvatar>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem color='transparent' className='ion-text-center' >
                      <IonLabel className='ion-no-padding'>
                        <IonText><h1>{profile.username}</h1></IonText>
                        <IonText><h2>@{profile.userid}</h2></IonText>
                        <IonText><span className='icon-location'><IonIcon slot='start' src={locationOutline} /></span>{profile.location}</IonText>
                      </IonLabel>
                    </IonItem>
                    <IonItem color='transparent' lines='none' className='ion-text-center ion-no-padding' >
                      <IonLabel className='ion-no-padding'>
                        <IonText><span className='icon-location'><IonIcon slot='start' src={readerOutline} /></span>{count} posts</IonText>
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
            {loading && posts.length < 1 ? <IonSpinner /> : <ProfileList id={id} />}
          </IonContent>
        )
      }

    </IonPage>
  );
};

export default Profile;
