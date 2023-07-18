import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Sidebar from './components/sidebar';
import AddCity from './components/add_city';
import cities from './CityList';
import { db } from './firebase'
import {
  collection,
  onSnapshot,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

//Resert marker icons because they don't work by default for some reason
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const defaultCenter = [49.488888, 8.469167];
const defaultZoom = 8;

function App() {
  const mapRef = React.useRef();
  const cityListRef = React.useRef(cities);
  const [cityList, setCityList] = React.useState(cityListRef.current);
  const cityListCollectionRef = collection(db, "travel-cities");
  const [isLoadingCities, setLoadingCities] = React.useState(true);

   function handleMapFly(coordinates) {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    map.flyTo(coordinates, 14, {
      duration: 2
    });
  }

  //create new city entry
  async function addCity(dict){
    await addDoc(cityListCollectionRef, dict);  
  }

  /*const updateCity = async (id, age) => {
    const cityDoc = doc(db, "travel-cities", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "travel-cities", id);
    await deleteDoc(userDoc);
  };*/

  //load city list from firebase
  React.useEffect(() => {
    const getCities = async () => {
      const data = await getDocs(cityListCollectionRef);
      setCityList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //required to signal loading finished (otherwise <Marker> breaks due to coordinates being undefined)
      setLoadingCities(false)
    };
    getCities();
  }, []);

  return (
    <div className="App">
      <Map ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        {isLoadingCities === false ? (
          cityList.map(function(city){
            return(
                <Marker position={[city.coordinates[0], city.coordinates[1]]}>
                <Popup>
                  {[city.name]}
                </Popup>
              </Marker>
              )
          })
        ) : (<></>)}
      </Map>
      <AddCity callback = {addCity}></AddCity>
      <Sidebar citylist = {cityList} callback = {handleMapFly}></Sidebar>
    </div>
  );
}

export default App;
