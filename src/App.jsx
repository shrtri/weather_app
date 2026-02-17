import React from 'react'
import {useState } from "react";
import Weather from './components/Weather'
import "./index.css";

const App = () => {

  const [theme,setTheme] = useState("light");

  const applyThemeFromWeatherData = (data) => {
  const nowUTC = Date.now() / 1000; // current UTC time in seconds

  const isDay =
    nowUTC >= data.sys.sunrise &&
    nowUTC < data.sys.sunset;

  setTheme(isDay ? "light" : "dark");
};
const handleWeatherResponse = (data) => {
  applyThemeFromWeatherData(data);
};
return (
  <div
      className={`app ${theme}`}
      style={{
        minHeight: "100vh",
        backgroundImage:
          theme === "light"
            ? "url('/light.png')"
            : "url('/dark.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "all 0.5s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <Weather onWeatherData={applyThemeFromWeatherData}/>
    </div>
  )
}

export default App