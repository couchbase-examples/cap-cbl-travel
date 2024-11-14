import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { business, location } from 'ionicons/icons';
import DatabaseProvider from './providers/DatabaseProvider';
import Hotels from './pages/Hotels';
import Locations from './pages/Locations';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <DatabaseProvider>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
        <Route exact path="/locations">
            <Locations />
          </Route>
          <Route exact path="/hotels">
            <Hotels />
          </Route>
          <Route exact path="/">
            <Redirect to="/locations" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        <IonTabButton tab="locations" href="/locations">
            <IonIcon aria-hidden="true" icon={location} />
            <IonLabel>Locations</IonLabel>
          </IonTabButton>
          <IonTabButton tab="hotels" href="/hotels">
            <IonIcon aria-hidden="true" icon={business} />
            <IonLabel>Hotels</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      </IonReactRouter>
    </DatabaseProvider>
  </IonApp>
);

export default App;
