//import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';
const apiKey = 'e96a4cbef9eb6caf993f5e444df2ab14';
//var map = document.querySelector('#map');
var paths = document.querySelectorAll('.map-image a');
const container = document.querySelector(".container-1");


paths.forEach(function(path) {
    path.addEventListener('mouseenter', function(e) {
        var id = this.id.replace('TN-', '')
        console.log(id);
         requestAPI(id);
    })

})

function requestAPI(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`;
    fetch(api).then(reponse => (reponse.json())).then(result => weatheDetails(result));
    
}

function weatheDetails(info) {
    //nom de la region est invalide
    if (info.cod == "404") {
        alert("La region saisie est incorrecte!");
    }
    // name of city(esem l region)
    const s = info.name;
    //console.log(s);
    //name of country(tounes)
    const c = info.sys.country;
    //console.log(c);
    container.querySelector(".localisation").innerHTML = `${s},${c}`;
    //container.log(info);
    let long = info.coord.lon;
    //console.log(long);
    let lat = info.coord.lat;
    //console.log(lat);
    AppelAPI(long, lat);
     console.log(info);
}
// wakt l utilisateur yestaaml l form
const Form = document.querySelector('form');
let InputValue = '';

Form.addEventListener('submit', (a) => {
    a.preventDefault();
    InputValue = a.target.querySelector('input').value;
    requestAPI(InputValue);
});
//geolocalisation:: lorsque l utilisateur accepte la localisation ynajem yshouf takes mtaa lblasa ely howa fyha 
    document.querySelector("#locp").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Il faut accepter la localisation");
    }
});

function onSuccess(position){
    //console.log(position);
    //const {latitude, longitude} = position.coords;
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    //let con = position.coords.constructor.name;
    //console.log(con);
     AppelAPI(long, lat);
     console.log(position);
  
}
function onError(error){
    alert("Il faut accepter la localisation");
}

///////
let resultatsAPI;
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
function AppelAPI(long, lat) {
   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`)
        .then((rep) => {
            return rep.json();
        })
        .then((data) => {
           // console.log(data);
             resultatsAPI = data;
// les heures, , avec leur temperature.
         let heureActuelle = new Date().getHours();
            for (let i = 0; i < heure.length; i++) {
                let heureIncr = heureActuelle + i;

                if (heureIncr > 24) {
                    heure[i].innerText = `${heureIncr - 24} h`;
                } else if (heureIncr === 24) {
                    heure[i].innerText = "00 h"
                } else {
                    heure[i].innerText = `${heureIncr} h`;
                }

            }
 // temp pour 1h
            for (let j = 0; j < tempPourH.length; j++) {
                tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j ].temp)}°C`

            }
            container.querySelector(".temperature").innerHTML = tempPourH[0].innerText;
            container.querySelector(".de").innerHTML = resultatsAPI.current.weather[0].description;
            
            // trois premieres lettres des jours 
            /*
            for (let k = 0; k < tabJoursEnOrdre.length; k++) {
                joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0, 3);
            }


            // Temps par jour
            for (let m = 0; m < 7; m++) {
                tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`
            } */


        })

}
