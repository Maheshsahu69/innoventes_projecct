import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonSpinner, IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import './WineWall.css';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../actions/post';
import { RootState } from '../reducers';
import SearchResults from '../components/SearchResults';
import { PostDetail } from '../types';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector<RootState, boolean>(state => state.post.loading);
  const query = useSelector<RootState, string>(state => state.post.query);
  const posts = useSelector<RootState, PostDetail[]>(state => state.post.searchResults);
  const user_id = useSelector<RootState, number>(state => state.auth.user.id);

  useEffect(() => {
    dispatch(searchPosts(query, user_id));
    // eslint-disable-next-line
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/posts' />
          </IonButtons>
          <IonTitle>{query}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading && posts.length < 1 ? <IonSpinner /> : <SearchResults />}
      </IonContent>
    </IonPage>
  );
};

export default Search;
