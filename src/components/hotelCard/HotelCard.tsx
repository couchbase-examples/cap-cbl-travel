import React from 'react';
import { 
	IonCard, 
	IonCardContent, 
	IonCardHeader, 
	IonCardSubtitle, 
	IonCardTitle,
	IonLabel
} from '@ionic/react';

interface Hotel {
	name: string;
	description: string;
	address: string;
	city: string;
	state?: string;
	country: string;
  }
  
  interface HotelCardProps {
	hotel?: Hotel;
  }

export function HotelCard({ hotel }: HotelCardProps) {
	const cardStyle = {
		width: '100%',  
		margin: '16px, 0px'       
	  };
	
	if (!hotel) {
		return (
		  <IonCard style={cardStyle}>
			<IonCardHeader>
			  <IonCardTitle>Error</IonCardTitle>
			  <IonCardSubtitle>Invalid Hotel Data</IonCardSubtitle>
			</IonCardHeader>
			<IonCardContent>
			  This Hotel item is not properly formatted.
			</IonCardContent>
		  </IonCard>
		);
	  }
	return (
		<IonCard style={cardStyle}>
		<IonCardHeader>
		  <IonCardTitle>{hotel.name}</IonCardTitle>
		</IonCardHeader>
  
		<IonCardContent>{hotel.description}</IonCardContent>
		<IonCardContent>
			<IonLabel>{hotel.address}</IonLabel>
			<IonLabel>{hotel.city}</IonLabel>
		{hotel.state && <IonLabel>{hotel.state}</IonLabel>}
			<IonLabel>{hotel.country}</IonLabel>
		</IonCardContent>
	  </IonCard>
	);
  }