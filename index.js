const locationP = document.getElementById('location');
const inhabitantsUl = document.getElementById('inhabitants');

//yucky hack
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const locationURL = `${CORS_PROXY}http://api.open-notify.org/iss-now.json`;
const inhabitantsURL = `${CORS_PROXY}http://api.open-notify.org/astros.json`;

async function fetchLocation(){
    const locationRes = await fetch(locationURL , {headers: { Origin: window.location.host }});
    const location = await locationRes.json();
    return location.iss_position;
}
async function fetchInhabitants(){
    const inhabitantsRes = await fetch(inhabitantsURL , {headers: { Origin: window.location.host }});
    const inhabitants = await inhabitantsRes.json();
    return inhabitants.people.filter(person => person.craft === "ISS");
}

fetchLocation().then(loc => locationP.innerHTML = `Latitude: ${loc.latitude} Longitude: ${loc.longitude}`)
    .catch(err => {
        locationP.innerHTML = "Error: " + err.message;
        console.error(err);
    });
fetchInhabitants().then(inhab => {
    for(person of inhab){
        el = document.createElement("li");
        el.innerHTML = `${person.name}`;
        inhabitantsUl.appendChild(el);
    }
}).catch(err => console.error(err));