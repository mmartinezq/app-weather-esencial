import{getWeeklyWeather} from "./services/weather.js"
import { getLatLon } from "./geolocation.js";
import {formatWeekList} from "./utils/format-data.js"
import {createDOM} from "./utils/dom.js"
import {createPeriodTime} from "./period-time.js"
import draggable from "./draggable.js"
/***** template for tab Panel */
function tabPaneltemplate(id){
    return `
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
    <div class="dayWeather" id="dayWeather-${id}">
      <ul class="dayWeather-list" id="dayWeather-list-${id}">
       
      </ul>
    </div>
  </div>
  `
}
function createTabPanel(id){
    const panel = createDOM(tabPaneltemplate(id));
    if (id>0) {
        panel.hidden = true;
    }
    return panel;
}
function configWeeklyWeather(weeklist){
    
        const container = document.querySelector(".tabs");
        const extraWeatherInfo = [];
        let myIndex = 0;
        weeklist.forEach((day,index)=>{
        const panel = createTabPanel(index);
        container.append(panel);
        day.forEach((weather,indexWeather)=>{
            extraWeatherInfo.push(weather);
        panel.querySelector(".dayWeather-list").append(createPeriodTime(weather,myIndex));
        const dayList = document.querySelectorAll(".dayWeather-item");
        dayList.forEach((element) => {
          element.addEventListener("click", getWeatherTabs);
        });
        myIndex++;
       })
    })


    function getWeatherTabs(event) {
        const dayList = document.querySelectorAll(".dayWeather-item");
        /*remover is-selected*/
        dayList.forEach((item) => item.classList.remove("is-selected"));
        event.currentTarget.classList.add("is-selected");
        const {
          wind: { speed },
          main: { humidity, temp_max, temp_min },
        } = extraWeatherInfo[event.currentTarget.dataset.id];
    //} = extraWeatherInfo[event.currentTarget.data];
    //const $showDataFeatures = document.querySelectorAll(".weather-features");
        const $showDataFeatures = document.querySelector(".weather-features");
        $showDataFeatures.innerHTML = `
        <p class="weather-max">Max: <strong>${temp_max}°</strong></p>
            <p class="weather-min">Min: <strong>${temp_min}°</strong></p>
                <p class="weather-wind">Viento: <strong>${speed} km/h</strong></p>
        <p class="weather-humidity">Humedad: <strong>${humidity}%</strong></p>
        `;
      }

}
/* FUNCION PARA LA TAREA DEL PROYECTO*/


export default async function weeklyWeather(){
    const container = document.querySelector(".weeklyWeather");
    const { lat,lon, isError } =  await getLatLon();
    if(isError) return console.log("Ha ocurrido un error ubicandote");
    const {isError: weeklyWeatherError, data:weather} = await getWeeklyWeather(lat,lon);
    if(weeklyWeatherError) return console.log("Ha ocurrido un error trayendo el pronostico del clima");
    const weeklist = formatWeekList(weather.list);
        configWeeklyWeather(weeklist)
        draggable(container);
}