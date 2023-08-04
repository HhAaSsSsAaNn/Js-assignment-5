let searchInput = document.getElementById("search")
let searchBtn = document.getElementById("submit")

//============day1==================
let day1Day = document.getElementById("day1Day")
let day1Date = document.getElementById("day1Date")
let day1City = document.getElementById("day1City")
let day1Temp = document.getElementById("day1Temp")
let day1Sun = document.getElementById("day1Sun")
let day1Hum = document.getElementById("day1Hum")
let day1Wind = document.getElementById("day1Wind")
let day1WindDir = document.getElementById("day1WindDir")
//==============day2==========================
let day2Day = document.getElementById("day2Day")
let day2Img = document.getElementById("day2Img")
let day2Tempmax = document.getElementById("day2Tempmax")
let day2Tempmin = document.getElementById("day2Tempmin")
let day2Sun = document.getElementById("day2Sun")
//==============day3=====================
let day3Day = document.getElementById("day3Day")
let day3Img = document.getElementById("day3Img")
let day3Tempmax = document.getElementById("day3Tempmax")
let day3Tempmin = document.getElementById("day3Tempmin")
let day3Sun = document.getElementById("day3Sun")


let response ={}

let date = new Date();
let dayOfWeek = "";
let month = "";
let windDir = "";
let city = "";

let http = [];


(async function(){
    await getlocation();
    await getData();
})();

async function getlocation(){
    return new Promise( function(resolved){
             navigator.geolocation.getCurrentPosition(p=> {
            city = `${p.coords.latitude},${p.coords.longitude}`
            
            resolved()
    })
        
        
        
    })
} 

searchInput.addEventListener("input", async function(){
    await search();
})

searchBtn.addEventListener("click", async function(){
    await search();
})

async function search(){
    
    let Mycity = searchInput.value
     http = await (await fetch(`https://api.weatherapi.com/v1/search.json?key=737d5374363f44bfa6d132414230208&q=${Mycity}`)).json();
     if (http.length > 0) {
        city = http[0].name;
        console.log(city)
        await getData();
     }
}

async function getWeather(){
    
    let x = await (await fetch(`https://api.weatherapi.com/v1/forecast.json?key=737d5374363f44bfa6d132414230208&q=${city}&days=3&aqi=no&alerts=no`)).json();
    
    response = x
}


async function getData(){
   
    await getWeather();
    let days = response.forecast.forecastday;
    await setHTMLelements( days);
   
    
}




async function setHTMLelements( days){
    return new Promise(async function(resolved){
        //===================day1===================
        let day1 = days[0].hour[date.getHours()];
    await setVariables(day1.wind_dir);
        day1Day.innerHTML = dayOfWeek;
    day1Date.innerHTML = date.getDate()+month;
    day1City.innerHTML = response.location.name;
    
    day1Temp.innerHTML = `${Math.round(day1.temp_c)} <sup>o</sup>C <img id="day1Img" width="90px" src="${day1.condition.icon}" alt="${day1.condition.text}"> `;
    day1Sun.innerHTML = day1.condition.text;
    day1Hum.innerHTML = day1.humidity+"%";
    day1Wind.innerHTML = day1.wind_kph +"Km/h";
    day1WindDir.innerHTML = windDir;

    //=================day2====================
    setDay(date.getDay() +1)
    day2Day.innerHTML = dayOfWeek;
    day2Img.src = days[1].day.condition.icon;
    day2Tempmax.innerHTML = days[1].day.maxtemp_c
    day2Tempmin.innerHTML = days[1].day.mintemp_c
    day2Sun.innerHTML = days[1].day.condition.text

     //=================day3====================
     setDay(date.getDay() +2)
     day3Day.innerHTML = dayOfWeek;
     day3Img.src = days[2].day.condition.icon;
     day3Tempmax.innerHTML = days[2].day.maxtemp_c
     day3Tempmin.innerHTML = days[2].day.mintemp_c
     day3Sun.innerHTML = days[2].day.condition.text

    resolved();
    })
}

async function setVariables(winDir){
    return new Promise(function(resolved){
        setDay(date.getDay());
        setMonth();
        setWindDir(winDir);
        
        resolved();
    })
}

function setDay(dayOfWeak){
    switch (dayOfWeak) {
        case 0:
            dayOfWeek = "Sunday"
            break;
        case 1:
            dayOfWeek = "Monday"
            break;
        case 2:
            dayOfWeek = "Tuesday"
            break;
        case 3:
            dayOfWeek = "Wednesday"
            break;
        case 4:
            dayOfWeek = "Thurasday"
            break;
        case 5:
            dayOfWeek = "friday"
            break;
        case 6:
            dayOfWeek = "Saturday"
            break;
    
        default:
            break;
    }
}

function setMonth(){
    switch (date.getMonth()) {
        case 0:
            month = "junuary"
            break;
        case 1:
            month = "Febraury"
            break;
        case 2:
            month = "March"
            break;
        case 3:
            month = "April"
            break;
        case 4:
            month = "May"
            break;
        case 5:
            month = "June"
            break;
        case 6:
            month = "July"
            break;
        case 7:
            month = "August"
            break;
        case 8:
            month = "Septemper"
            break;
        case 9:
            month = "October"
            break;
        case 10:
            month = "November"
            break;
        case 11:
            month = "December"
            break;
    
        default:
            break;
    }
}

function setWindDir(windir){
    switch (windir) {
        case "NNE":
            windDir = "North-northeast"
            break;
        case "N":
            windDir = "North"
            break;
        case "NE":
            windDir = "northeast"
            break;
        case "ENE":
            windDir = "east-northeast"
            break;
        case "E":
            windDir = "East"
            break;
        case "ESE":
            windDir = "east-southeast"
            break;
        case "SE":
            windDir = "southeast"
            break;
        case "SSE":
            windDir = "south-southeast"
            break;
        case "S":
            windDir = "South"
            break;
        case "SSW":
            windDir = "south-southwest"
            break;
        case "SW":
            windDir = "southwest"
            break;
        case "WSW":
            windDir = "west-southwest"
            break;
        case "W":
            windDir = "west"
            break;
        case "WNW":
            windDir = "west-northwest"
            break;
        case "NW":
            windDir = "northwest"
            break;
        case "NNW":
            windDir = "north-northwest"
            break;
    
        default:
            break;
    }
}