import React from 'react';
import { 
	IonCard, 
	IonCardContent, 
	IonCardHeader, 
	IonCardSubtitle, 
	IonCardTitle,
	IonLabel
} from '@ionic/react';

interface Landmark {
	name: string;
	title: string;
	content: string;
	address: string;
	city: string;
	state?: string;
	country: string;
  }
  
  interface LocationCardProps {
	landmark?: Landmark;
  }

export function LocationCard({ landmark }: LocationCardProps) {
	const cardStyle = {
		width: '100%',  
		margin: '16px, 0px'       
	  };
	
	if (!landmark) {
		return (
		  <IonCard style={cardStyle}>
			<IonCardHeader>
			  <IonCardTitle>Error</IonCardTitle>
			  <IonCardSubtitle>Invalid Location Data</IonCardSubtitle>
			</IonCardHeader>
			<IonCardContent>
			  This location item is not properly formatted.
			</IonCardContent>
		  </IonCard>
		);
	  }
	return (
		<IonCard style={cardStyle}>
		<IonCardHeader>
		  <IonCardTitle>{landmark.name}</IonCardTitle>
		  <IonCardSubtitle>{landmark.title}</IonCardSubtitle>
		</IonCardHeader>
  
		<IonCardContent>{landmark.content}</IonCardContent>
		<IonCardContent>
			<IonLabel>{landmark.address}</IonLabel>
			<IonLabel>{landmark.city}</IonLabel>
		{landmark.state && <IonLabel>{landmark.state}</IonLabel>}
			<IonLabel>{landmark.country}</IonLabel>
		</IonCardContent>
	  </IonCard>
	);
  }