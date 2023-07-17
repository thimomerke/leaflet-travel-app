import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Sidebar from './components/sidebar';
import AddCity from './components/add_city';
import cities from './CityList';

//Resert markers because they don't work by default for some reason
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

   function handleMapFly(coordinates) {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    map.flyTo(coordinates, 14, {
      duration: 2
    });
  }

  function addCity(dict){
    //alert(dict.name)
    setCityList((current) => { return [...current, dict]; })
  }

  return (
    <div className="App">
      <Map ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        {
          cityList.map(function(city){
              return(
                <Marker position={city.coordinates}>
                <Popup>
                  {city.name}
                </Popup>
              </Marker>
              )
          })
        }
      </Map>
      <AddCity callback = {addCity}></AddCity>
      <Sidebar citylist = {cityList} callback = {handleMapFly}></Sidebar>
    </div>
  );
}

export default App;
