import React from 'react';
import { useSelector } from 'react-redux';
import { IonToast } from '@ionic/react';
import { AlertMessage } from '../types';
import { RootState } from '../reducers';


const Alert: React.FC = () => {

  const alerts = useSelector<RootState, AlertMessage[]>(state => state.alert.alerts);
  return (
    <>
      {alerts &&
        alerts.length > 0 &&
        alerts.map((alert: AlertMessage) => (<IonToast key={alert.id} isOpen message={alert.msg} color={alert.alertType} duration={2000} />))}
    </>
  )
}

export default Alert;