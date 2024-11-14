import { useContext, useEffect, useState } from "react";

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

import { startLogging } from "../hooks/startLogging";
import { getHotels, getHotelsBySearch } from "../hooks/getHotels";
import DatabaseContext from "../providers/DatabaseContext";
import { NoHotel } from "../components/noHotel/NoHotel";
import { HotelCard } from "../components/hotelCard/HotelCard";
import { debounce } from "../util/debounce";
import { IonIcon } from "@ionic/react";
import { refresh } from "ionicons/icons";

const Hotels: React.FC = () => {
  const { databaseService } = useContext(DatabaseContext)!;
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const initialize = async () => {
      await startLogging();
      const hotelData = await getHotels(databaseService);
      setFilteredHotels(hotelData);
      setIsLoading(false);
    };
    initialize().then();
  }, []);

  async function reload() {
    setSearch("");
    setIsLoading(true);
    const hotelData = await getHotels(databaseService);
    setFilteredHotels(hotelData);
    setIsLoading(false);
  }

  async function searchHotels(search: string) {
    if (search.length > 2) {
      setIsLoading(true);
      const hotelData = await getHotelsBySearch(databaseService, search);
      setFilteredHotels(hotelData);
      setIsLoading(false);
    } else if (search.length === 0) {
      await reload();
    }
  }

  function onSearch(search: string) {
    setSearch(search);
    debouncedSearch(search);
  }

  const debouncedSearch = debounce(searchHotels, 500);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hotels</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={async () => await reload()}>
              <IonIcon icon={refresh}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Hotels</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar
          value={search}
          onIonInput={(e) => onSearch(e.detail.value!)}
          placeholder="Search Hotels"
        ></IonSearchbar>
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
        ) : filteredHotels === undefined || filteredHotels.length === 0 ? (
          <NoHotel />
        ) : (
          <IonList>
            {filteredHotels.map((item) => (
              <IonItem>
                <HotelCard hotel={item.hotel} />
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Hotels;
