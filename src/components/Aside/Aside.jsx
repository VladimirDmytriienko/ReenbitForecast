import { useEffect, useState } from 'react';
import axios from 'axios';
import './aside.css'

export default function Aside({city}) {
    const [todaySWeather, setTodaySWeather] = useState(null);
    useEffect(() => {
        todayWeather();
    }, [city]);

    const todayWeather = async () => {
        try {
            const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&key=VUFE68WKMGN3FLTPECAX8E626`);
            setTodaySWeather(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    const  date = new Date();
    const dayOfWeek = date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekText = days[dayOfWeek];

    return (
        <aside className="weather-card">
            <h2 className="weather-card-title">Today: {dayOfWeekText}</h2>
            <h3 className="weather-card-city">{city}</h3>
            <h3 className="weather-card-conditions">
                {todaySWeather?.currentConditions.conditions}
            </h3>
            <p className="weather-card-sunrise-sunset">
                Sunrise at: {todaySWeather?.currentConditions.sunrise} - Sunset at:{" "}
                {todaySWeather?.currentConditions.sunset}
            </p>
            <p className="weather-card-temp">
                Temp: {todaySWeather?.currentConditions.temp} °C
            </p>
            <p className="weather-card-feelslike">
                Feels like: {todaySWeather?.currentConditions.feelslike} °C
            </p>
            <p className="weather-card-forecast">
                Forecast for today: {todaySWeather?.days[0].description}
            </p>
        </aside>

    )
}
