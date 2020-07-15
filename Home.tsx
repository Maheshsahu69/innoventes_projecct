import React from "react";
import {
  IonContent,
  IonPage,
  IonTitle,
  IonFooter,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonIcon,
} from "@ionic/react";
import "./Home.css";
import { logoFacebook } from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";
import logo from "../images/icon.png";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const Home: React.FC = () => {
  const history = useHistory();

  const token = useSelector<RootState, string>((state) => state.auth.token);

  if (token) {
    history.push("/posts");
  }

  return (
    <IonPage>
      <IonContent className="bg-img">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonImg src={logo} alt="topPic" className="top-img" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-padding">
              <IonTitle className="vault-txt">
                {" "}
                <p> VAULT29</p>{" "}
              </IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-padding">
              <IonText className="txt-title">
                <p>Connecting the world of wine through experiences</p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter className="btn-background">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                disabled
                fill="outline"
                expand="block"
                className="btn-facebook"
                size="large"
                strong
              >
                <IonIcon icon={logoFacebook} slot="start"></IonIcon>
                CONNECT WITH FACEBOOK
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <Link to='/usertype' className='link-join'>
                <IonButton
                  fill="outline"
                  expand="block"
                  className="btn-join"
                  size="large"
                  strong
                >
                  JOIN
                </IonButton>
              </Link>
            </IonCol>
            <IonCol>
              <Link to="/login" className="link-login">
                <IonButton
                  fill="outline"
                  expand="block"
                  className="btn-login"
                  size="large"
                  strong
                >
                  LOG IN
                </IonButton>
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
