import React from 'react';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';

import {
  locationOutline,
  wineOutline,
  newspaperOutline,
  camera,
  starOutline,
} from 'ionicons/icons';

import WineWall from './WineWall';
import News from './News';
import Nearby from './Nearby';
import Favorite from './Favorite';
import Photo from './Photo';
import PrivateRoute from '../routing/PrivateRoute';
import Post from './Post';

const TabRoot: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <PrivateRoute path="/posts" exact>
          <WineWall />
        </PrivateRoute>
        <PrivateRoute path="/news" exact>
          <News />
        </PrivateRoute>
        <PrivateRoute path="/photo" exact>
          <Photo />
        </PrivateRoute>
        <PrivateRoute path="/posts/:id" exact>
          <Post />
        </PrivateRoute>
        <PrivateRoute path="/nearby" exact>
          <Nearby />
        </PrivateRoute>
        <PrivateRoute path="/favorite" exact>
          <Favorite />
        </PrivateRoute>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/posts">
          <IonIcon icon={wineOutline} />
          <IonLabel>WINE WALL</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/news">
          <IonIcon icon={newspaperOutline} />
          <IonLabel>NEWS</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/camera">
          <IonIcon icon={camera} />
        </IonTabButton>
        <IonTabButton tab="tab4" href="/nearby">
          <IonIcon icon={locationOutline} />
          <IonLabel>NEARBY</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab5" href="/favorite">
          <IonIcon icon={starOutline} />
          <IonLabel>FAVORITES</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default TabRoot;