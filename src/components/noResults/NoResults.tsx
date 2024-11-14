import {
	IonLabel,
  } from '@ionic/react';

type Props = {
    message: string;
};

export function NoResults({ message }: Props) {
    return (
        <IonLabel>{message}</IonLabel>
    );
}