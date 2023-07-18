
import React from 'react';
 
    export default function Sidebar (props) {
      return(
      <div className="Sidebar">
      {
        props.citylist.map(function(city){
            return(
              <div>
                <h2>{city.name}</h2>
                <p>{city.country}</p>
                <p>First Visit: {city.date.toString()/*.toISOString().slice(0,10)*/}</p>
                <p>
                  <button onClick={() => props.callback(city.coordinates)}>
                    Go there
                  </button>
                </p>
              </div>
            )
        })
      }
    </div>
    );
    }