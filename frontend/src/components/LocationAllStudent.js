
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
const LocationAllStudent= () => {
  
    const [ selected, setSelected ] = useState({});
    const [ locations, setLocations ] = useState({});
    const [ loading, setLoading ] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);

    const onSelect = item => {
      setSelected(item);
      if (infoOpen) {
        setInfoOpen(false);
      }
  
      setInfoOpen(true);
    }
  const mapStyles = {        
    height: "90vh",
    width: "90%"};
  
  useEffect(() => {
    axios
    .get(`http://localhost:8080/student/`)
    .then((res) => {
      console.log(res.data);
      setLocations(res.data)
      setLoading(true)
    //   setStudents(res.data.longitude);
     
    })
    .catch((err) => {
      console.log(err);
    });

  },[])
//   const defaultCenter = {lat:locations[0].latitude,lng: locations[0].longitude}

  const obj = {lat:selected.latitude,lng: selected.longitude}
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyDlLNJnrlRPNd1RcoB_1tN5mf4YzEQc0BY'>
            {loading? 
              
              <>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={{lat:locations[0].latitude,lng: locations[0].longitude}}>
             
                  {
            locations.map(item => {
              return (
              <Marker key={item.fName+item.lName } 
                position={{lat: item.latitude,
                    lng: item.longitude}}
                onClick={() => 
                    onSelect(item)}
              />
              )
            })
         }
        {infoOpen && obj && 
            (
              <InfoWindow
              key={selected.fName+selected.lName } 
              position={{lat:selected.latitude,lng: selected.longitude}}
              clickable={true}
              onCloseClick={() => {
                  
              setInfoOpen(false)}}
            >
              <p>{selected.fName}</p>
            </InfoWindow>
            )
         }
             
              
     </GoogleMap>
     </>
              
              
              : <h1>loading</h1>}
     </LoadScript>
  )
}
export default LocationAllStudent;
