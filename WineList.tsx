import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { getPosts, fetchPostAction } from '../actions/post';
import { IonInfiniteScroll, IonInfiniteScrollContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import { Post } from '../types';
import { API_ENDPOINT } from '../constants';
import './WineList.css';
import { useHistory } from 'react-router';

const WineList: React.FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const loadMore = useSelector<RootState, boolean>(state => state.post.loadMore);
  const posts = useSelector<RootState, Post[]>(state => state.post.posts);

  const getMorePosts = ($event: CustomEvent<void>) => {
    dispatch(getPosts(posts.length));
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  const onPostDetails = (id: number) => {
    dispatch(fetchPostAction());
    history.push(`/posts/${id}`);
  }

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol size="12" size-sm>
            {posts.map(post =>
              <img className='gallery-post' key={post.id} src={`${API_ENDPOINT}/${post.thumbnail_url}`}
                alt={post.comment} onClick={() => onPostDetails(post.id)} />
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonInfiniteScroll threshold='100px' disabled={!loadMore}
        onIonInfinite={(e: CustomEvent<void>) => getMorePosts(e)}>
        <IonInfiniteScrollContent
          loadingText='Loading more posts...'>
        </IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </>
  );
};

export default WineList;