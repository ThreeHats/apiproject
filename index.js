const locationP = document.getElementById('location');
const inhabitantsUl = document.getElementById('inhabitants');
async function fetchLocation(){
    const locationRes = await fetch("http://api.open-notify.org/iss-now.json");
    const location = await locationRes.json();
    return location.iss_position;
}
async function fetchInhabitants(){
    const inhabitantsRes = await fetch("http://api.open-notify.org/astros.json");
    const inhabitants = await inhabitantsRes.json();
    return inhabitants.people.filter(person => person.craft === "ISS");
}

fetchLocation().then(loc => locationP.innerHTML = `Latitude: ${loc.latitude} Longitude: ${loc.longitude}`);
fetchInhabitants().then(inhab => {
    for(person of inhab){
        el = document.createElement("li");
        el.innerHTML = `${person.name}`;
        inhabitantsUl.appendChild(el);
    }
});