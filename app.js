const searchForm=document.querySelector(".searchForm");
const cityInput=document.querySelector("#searchBar");
const apiKey="9f171f26a508c5fe1437076627195513";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


searchForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const city=cityInput.value.trim();
    if(city){
        checkWeather(cityInput.value)
            .then(addWeather)
            .catch(error=>{
                console.log(`Error :${error}`);
            });

    }
   

});

async function checkWeather(city){
    try{
        const response= await fetch(apiUrl+city+`&appid=${apiKey}`);
        const data= await response.json();
        console.log(data);
        return data;

    }catch(error){
        throw error;
    }

}

async function addWeather(data){
    document.querySelector("#city-name").innerHTML=data.name;
    document.querySelector("#temperature-number").innerHTML=Math.round(data.main.temp);
    document.querySelector("#feels-like").innerHTML=Math.round(data.main.feels_like);
    document.querySelector("#humidity-level").innerHTML=data.main.humidity;
    document.querySelector("#wind-speed").innerHTML=Math.round(data.wind.speed);


    let icon=document.querySelector("#icon-element");

    switch(data.weather[0].icon) {
        case "01d":
          icon.setAttribute("src", "icons/01d.svg");
          break;
        case "02d":
          icon.setAttribute("src", "icons/02d.svg");
          break;
        case "03d":
          icon.setAttribute("src", "icons/03d.svg");
          break;
        case "03n":
          icon.setAttribute("src", "icons/03n.svg");
          break;
        case "04d":
          icon.setAttribute("src", "icons/04d.svg");
          break;
        case "04n":
          icon.setAttribute("src", "icons/04n.svg");
          break;
        case "09d":
          icon.setAttribute("src", "icons/09d.svg");
          break;
        case "09n":
          icon.setAttribute("src", "icons/09n.svg");
          break;
        case "10d":
          icon.setAttribute("src", "icons/10d.svg");
          break;
        case "10n":
          icon.setAttribute("src", "icons/10n.svg");
          break;
        case "11d":
          icon.setAttribute("src", "icons/11d.svg");
          break;
        case "11n":
          icon.setAttribute("src", "icons/11n.svg");
          break;
        case "13d":
          icon.setAttribute("src", "icons/13d.svg");
          break;
        case "13n":
          icon.setAttribute("src", "icons/13n.svg");
          break;
        case "50d":
          icon.setAttribute("src", "icons/50d.svg");
          break;
        case "50n":
          icon.setAttribute("src", "icons/50n.svg");
          break;
        default:
          // Default case if none of the above matches
          icon.setAttribute("src", "icons/01d.svg"); // You can set a default icon
          break;
      }
    

    //Capitliaze the description

    const desc=data.weather[0].description;
    
    const capDesc=desc.split(' ')
                .map(word=>word.charAt(0).toUpperCase()+word.slice(1))
                .join(' ');

    
    document.querySelector("#weather-description").innerHTML=capDesc;

    
    //For the time
    const testObj=data.dt;
    const unixTime=data.dt+data.timezone-3600;
    const dataObj=new Date(unixTime*1000);

    console.log(dataObj);



    const weekday=dataObj.toLocaleDateString('en-US',{weekday:'long'})
    const date=dataObj.getDate();
    const month=dataObj.toLocaleDateString('en-US',{month:'long'});
    const year=dataObj.getFullYear();
    const time = dataObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).replace(':', ' : ');

    const final=`${weekday}, ${date} ${month} ${year} | ${time}`;
    console.log(final);
    document.querySelector("#date-hour").innerHTML=final;



    //For Checking if it's light or dark

    const sunriseTime=new Date((data.sys.sunrise+data.timezone)*1000)
    const sunsetTime=new Date((data.sys.sunset+data.timezone)*1000);
    console.log(sunriseTime);
    console.log(sunsetTime);

    const mainContainer=document.querySelector("#main-container");


    if(dataObj.getTime()>sunsetTime.getTime() || dataObj.getTime()<sunriseTime.getTime()){
        mainContainer.classList.add("nightMode");

    }else{
        mainContainer.classList.add("dayMode");
    }



}




