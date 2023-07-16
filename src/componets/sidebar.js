
import React from 'react';
import cities from '../CityList';
 
    export default function Sidebar (props) {
      return <div className="sidebar">
      {
        cities.map(function(city){
            return(
              <div>
                <h2>{city.name}</h2>
                <p>{city.country}</p>
                <p>First Visit: {city.date.toISOString().slice(0,10)}</p>
                <p>
                  <button onClick={() => props.callback(city.coordinates)}>
                    Go there
                  </button>
                </p>
              </div>
            )
        })
      }
    </div>;
    }