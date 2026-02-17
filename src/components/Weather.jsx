import React, { useState,useEffect, useRef } from 'react'
import './Weather.css'
import search_icon from'../Assets/search.png'
import clear_icon from'../Assets/clear.png'
import clear_moon_icon from'../Assets/clear_moon.png'
import cloud_icon from'../Assets/cloud.png'
import cloud_moon_icon from'../Assets/cloud_moon.png'
import drizzle_icon from'../Assets/drizzle.png'
import drizzle_moon_icon from'../Assets/drizzle_moon.png'
import rain_icon from'../Assets/rain.png'
import rain_moon_icon from'../Assets/rain_moon.png'
import snow_icon from'../Assets/snow.png'
import humidity_icon from'../Assets/humidity.png'
import wind_icon from'../Assets/wind.png'

function Weather({ onWeatherData }) {
  const inputRef=useRef();
  console.log("API Key:", import.meta.env.VITE_APP_ID);

const[weatherData,setWeatherData]=useState(null);
const [loading, setLoading] = useState(false);


//icons
const allIcons={
  "01d":clear_icon,
  "01n":clear_moon_icon,
  "02d":cloud_icon,
  "02n":cloud_moon_icon,
  "03d": cloud_icon,
  "03n": cloud_moon_icon,
  "04d": cloud_icon,
  "04n": cloud_moon_icon,
  "10d":rain_icon,
  "10n":rain_moon_icon,
  "09d":drizzle_icon,
  "09n":drizzle_moon_icon,
  "13d":snow_icon,
}

const search=async(city)=>{
    if (!city) {
      alert("Please enter a city name!");
      return;
    }
    setLoading(true);
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      {loading && <p className="loading">Fetching weather...</p>}
      const response=await fetch(url);
      const data= await response.json();
      setLoading(false);
      if(!response.ok){
        alert(data.message);
        return;
      }

       localStorage.setItem("lastCity", city); // ✅ SAVE CITY
        useEffect(() => {
          const savedCity = localStorage.getItem("lastCity") || "london";
          search(savedCity);

          if (inputRef.current) {
            inputRef.current.value = savedCity;
          }
        }, []);
      console.log(data);
      onWeatherData(data);
      const icon=allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon: icon
      })
    }catch(error){
      setWeatherData(false);
      console.log("Error in fetching weather data");
    }
    inputRef.current.value = ""; // clear input
  }

  useEffect(()=>{
    search("london");
  },[])

  return (
    <div className='weather'>

    {/*serach_btn*/}

      <div className="search-bar">
        <input ref={inputRef}type="text" placeholder='Search city' onKeyDown={(e) => { if (e.key === "Enter") {search(inputRef.current.value);}}}/>
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>


      {weatherData?<>
      <img src={weatherData.icon} alt="" className='weather_icon'/>
      <p className='temp'>{weatherData.temperature} °C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather_data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div> 
        </div>
      </div>
      </>:<></>}
      
    </div>
  )
}

export default Weather
