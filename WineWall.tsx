import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonSpinner,
  IonAvatar,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonSearchbar,
} from "@ionic/react";
import "./WineWall.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, searchQueryAction } from "../actions/post";
import { RootState } from "../reducers";
import WineList from "../components/WineList";
import logoWhite from "../images/logo-white.png";
import logoBlack from "../images/logo-black.png";
import logo from "../images/avatar-placeholder.png"; //icon.png
import { searchOutline } from "ionicons/icons";
import { setAlert } from "../actions/alert";
import { useHistory } from "react-router";
import { Post } from "../types";
const WineWall: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector<RootState, boolean>(
    (state) => state.post.loading
  );
  
  const posts = useSelector<RootState, Post[]>((state) => state.post.posts);
  const user_id = useSelector<RootState, number>((state) => state.auth.user.id);
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [query, setQuery] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);

  useEffect(() => {
    dispatch(getPosts(0, 40));
    // eslint-disable-next-line    
  },[]);

  const onSearchClicked = (e: any) => {
    e.preventDefault();
    dispatch(searchQueryAction(query));
    if (query.length > 2) {
      history.push("/search");
    
      
    } else {
      dispatch(setAlert("Enter at least 3 characters", "danger"));
    }
  };

  const onCleared = () => {
    setQuery("");
  };

  const onGetProfile=()=>{
    history.push(`/profile/${user_id}`)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-text-center">
          <button
            slot="start"
            onClick={() => {
              onGetProfile()
            }}
          >
            <IonAvatar slot="start">
              <img alt="Logged-in User Profile" src={logo} />
            </IonAvatar>
          </button>

          {isDarkMode ? (
            <img
              className="header-logo"
              alt="White Vault29 Logo"
              src={logoWhite}
            />
          ) : (
            <img
              className="header-logo"
              alt="Black Vault29 Logo"
              src={logoBlack}
            />
          )}
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              onClick={() => setSearchEnabled(!searchEnabled)}
            >
              <IonIcon src={searchOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {searchEnabled && (
          <IonItem lines="none">
            <IonSearchbar
              value={query}
              placeholder="Search"
              onKeyDown={(e) => e.key === "Enter" && onSearchClicked(e)}
              onIonChange={(e) => setQuery(e.detail.value!)}
              onIonCancel={() => onCleared()}
              onIonClear={() => onCleared()}
            ></IonSearchbar>
            <IonButton fill="clear" onClick={(e) => onSearchClicked(e)}>
              <IonIcon slot="icon-only" icon={searchOutline}></IonIcon>
            </IonButton>
          </IonItem>
        )}
        {loading && posts.length < 0 ? <IonSpinner /> : <WineList />}
      </IonContent>
    </IonPage>
  );
};

export default WineWall;
