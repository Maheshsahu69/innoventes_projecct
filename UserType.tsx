import React from "react";
import "./UserType.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonRow,
  IonCol,
  IonImg,
  IonTitle,
} from "@ionic/react";
import close from "../images/close.png";
import logo from "../images/icon.png";
import consumer from "../images/consumer-inactive.png";
import winary from "../images/winary-inactive.png";
import restaurant from "../images/restaurant-inactive.png";

const UserType: React.FC = () => {
  const history = useHistory();
  const onClose = () => {
    history.replace("/");
  };
  return (
    <IonPage>
      <IonContent className="bg-img-user-type">
        <IonRow>
          <IonCol>
            <IonImg
              src={close}
              alt="close button"
              className="close-button"
              onClick={() => {
                onClose();
              }}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonImg src={logo} alt="logo error" className="logo" />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonTitle className="txt-select-user-type">
              {" "}
              SELECT USER TYPE
            </IonTitle>
          </IonCol>
        </IonRow>
        <Link to="/join" className="link-decoration">
          <IonRow>
            <IonCol>
              <IonImg
                src={consumer}
                alt="consumer error"
                className="consumer-image"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonTitle className="txt-consumer">CONSUMER</IonTitle>
            </IonCol>
          </IonRow>
        </Link>
        <Link to="/join" className="link-decoration">
          <IonRow>
            <IonCol>
              <IonImg
                src={winary}
                alt="winery error"
                className="winary-image"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonTitle className="txt-winery"> WINERY</IonTitle>
            </IonCol>
          </IonRow>
          </Link>
          <Link to="/join" className="link-decoration">
          <IonRow>
            <IonCol>
              <IonImg
                src={restaurant}
                alt="restaurant error"
                className="restaurant-image "
              />
            </IonCol>
          </IonRow>
        
        <IonRow>
          <IonCol>
            <IonTitle className="txt-restaurant">
              {" "}
              RESTAURANT/BAR/OTHER
            </IonTitle>
          </IonCol>
        </IonRow>
        </Link>
      </IonContent>
    </IonPage>
  );
};

export default UserType;
