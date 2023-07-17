import React, {useEffect,useState} from 'react';

export default function AddCity (props) {
    const [city, setCity] = useState([])

    //set references for the input fields so they can be accessed without using state updates
    const nameInput = React.useRef();
    const countryInput = React.useRef();
    const dateInput = React.useRef();
    const cityCoordinates = React.useRef();
    const calledOnce = React.useRef(false);

    //fetch coordinates for new city/adress
      const fetchCoordinates = (e) => {
        e.preventDefault()

        /*this prevent the useEffect from running infinite times and adding the same city again and again
        there are surely better options but this was the quickest fix*/
        calledOnce.current = false

        var cityName = nameInput.current.value
        //alert(cityName)
        fetch(`https://nominatim.openstreetmap.org/search?q=${cityName}&format=json`, { method: 'GET' })
          .then(response => {
            return response.json()
          })
          .then(data => {
            setCity(data)
          })
  
      }

      //wait for results and state update before submitting form
      useEffect(() => {

        if (city.length > 0){
          cityCoordinates.current = [city[0].lat, city[0].lon]
            var resultDict = {
              coordinates: cityCoordinates.current,
              name: nameInput.current.value,
              country: countryInput.current.value,
              date: new Date(dateInput.current.value)
            }
            //alert(resultDict.coordinates)
            if (calledOnce.current === false)
              props.callback(resultDict)
            calledOnce.current = true           
            }
        })



    return (
        <div>
            
<fieldset>
<form onSubmit={fetchCoordinates}>

<legend>Add City</legend>


<div class="form-group">
  <label class="col-md-4 control-label" for="name">Name</label>  
  <div class="col-md-4">
  <input ref={nameInput} id="name" name="name" type="text" placeholder="e.g. Berlin" class="form-control input-md" required=""/>
    
  </div>
</div>


<div class="form-group">
  <label class="col-md-4 control-label" for="country">Country</label>  
  <div class="col-md-4">
  <input ref={countryInput} id="country" name="country" type="text" placeholder="e.g. Germany" class="form-control input-md" required=""/>   
  </div>
</div>

<div class="form-group">
  <label class="col-md-4 control-label" for="date">Coordinates</label>  
  <div class="col-md-4">
  <input id="date" name="date" type="text" placeholder="e.g. 49.4103619, 8.4141602" value={city.length > 0 && city[0].boundingbox[0]+", "+city[0].boundingbox[2]} onChange={(e) => setCity(e.target.value)} class="form-control input-md" required=""/>  
  </div>
</div>


<div class="form-group">
  <label class="col-md-4 control-label" for="date">Date</label>  
  <div class="col-md-4">
  <input ref={dateInput} id="date" name="date" type="text" placeholder="e.g. 1999-12-31" class="form-control input-md" required=""/>   
  </div>
</div>


<div class="form-group">
  <label class="col-md-4 control-label" for="submit"></label>
  <div class="col-md-4">
  <button type="submit">Submit</button>
  </div>
</div>
</form>
</fieldset>
        </div>
    )
}


//https://nominatim.openstreetmap.org/search?q=hessische+str+54+mannheim&format=json <-- use api to find coordinates for city / adress