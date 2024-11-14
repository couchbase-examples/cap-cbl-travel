import { useContext, useState } from "react";

import DatabaseContext from "../providers/DatabaseContext";
import { getLandmarkBySearchTerm } from "../hooks/getLandmarks";
import { NoLandmark } from "../components/noLandmark/NoLandmark";
import { LocationCard } from "../components/locationCard/LocationCard";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonToolbar,
} from "@ionic/react";

import { IonIcon } from "@ionic/react";
import { refresh } from "ionicons/icons";

const Locations: React.FC = () => {
  const { databaseService } = useContext(DatabaseContext)!;
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredLandmarks, setFilteredLandmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const activities = ["buy", "do", "drink", "eat", "see"];

  async function search() {
    setIsLoading(true);
    try {
      setErrorMessage("");
      const landmarks = await getLandmarkBySearchTerm(
        databaseService,
        searchName,
        searchAddress,
        activities[selectedIndex]
      );
      if (landmarks !== undefined && landmarks.length > 0) {
        setFilteredLandmarks(landmarks);
      } else {
        setFilteredLandmarks([]);
      }
    } catch (e) {
      const errorMsg =
        e instanceof Error ? e.message : "An unexpected error occurred";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  async function reset() {
    setSearchName("");
    setSearchAddress("");
    setSelectedIndex(0);
    setIsLoading(true);
    setFilteredLandmarks([]);
    setIsLoading(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Locations</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Locations</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={async () => await reset()}>
                <IonIcon icon={refresh}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar
          value={searchName}
          onIonInput={(e) => setSearchName(e.detail.value!)}
          placeholder="Search Location Name"
        ></IonSearchbar>
        <IonSearchbar
          value={searchAddress}
          onIonInput={(e) => setSearchAddress(e.detail.value!)}
          placeholder="Search Address"
        ></IonSearchbar>
        <IonSegment
          value={activities[selectedIndex]}
          onIonChange={(e) => {
            const strValue = e.detail.value?.toString() ?? "buy";
            const newIndex = activities.indexOf(strValue);
            setSelectedIndex(newIndex);
          }}
        >
          <IonSegmentButton value="buy">
            <IonLabel>buy</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="do">
            <IonLabel>do</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="drink">
            <IonLabel>drink</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="eat">
            <IonLabel>eat</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="see">
            <IonLabel>see</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonButton
          expand="block"
          style={{
            padding: "16px 0px",
            maxWidth: "60%",
            margin: "0 auto",
            "--color": "white",
          }}
          onClick={async () => await search()}
        >
          Search
        </IonButton>
        {isLoading ? (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            textAlign: 'center'
          }}>
            <IonSpinner />
          </div>
        ) : errorMessage.length > 0 ? (
          <IonLabel>{errorMessage}</IonLabel>
        ) : filteredLandmarks === undefined ||
          filteredLandmarks.length === 0 ? (
          <NoLandmark />
        ) : (
          <IonList>
            {filteredLandmarks.map((item) => (
              <IonItem>
                <LocationCard landmark={item.landmark} />
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Locations;
