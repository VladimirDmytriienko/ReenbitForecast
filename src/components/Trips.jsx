import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal/Modal';
import './trips.css';
import Aside from './Aside/Aside';

const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London/2024-02-22/2024-02-29?unitGroup=metric&include=days&key=VUFE68WKMGN3FLTPECAX8E626&contentType=json';

export default function Trips() {
    const [trips, setTrips] = useState(() => {
        const savedTrips = localStorage.getItem('trips');
        return savedTrips ? JSON.parse(savedTrips) : [
            {
                "city": "London",
                "photo": "https://media.istockphoto.com/id/1294454411/photo/london-symbols-with-big-ben-double-decker-buses-and-red-phone-booth-in-england-uk.jpg?s=612x612&w=0&k=20&c=IX4_XZC-_P60cq9ZZbxw1CbL68hlv1L5-r_vSgEfx4k=",
                'changedDate': "2024-02-26",
                'endDate': "2024-02-28"
            },
        ];
    });

    const [tripWeather, setTripWeather] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const weekWeatherInit = async () => {
            try {
                const response = await axios.get(url);
                setTripWeather(response.data);
                setSelectedTrip('London');
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
        weekWeatherInit();
    }, []);

    useEffect(() => {
        localStorage.setItem('trips', JSON.stringify(trips));
    }, [trips]);

    const weekWeatherData = async (trip) => {
        const tripUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${trip.city}/${trip.changedDate}/${trip.endDate}?unitGroup=metric&include=days&key=VUFE68WKMGN3FLTPECAX8E626&contentType=json`;

        try {
            const response = await axios.get(tripUrl);
            setTripWeather(response.data);
            setSelectedTrip(trip.city);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const filteredTrips = trips.filter(trip => trip?.city.toLowerCase().includes(searchInput.toLowerCase()));

    return (
        <div className='container'>
            <main className='main'>
                <input
                    placeholder='Search for a city'
                    onChange={(e) => setSearchInput(e.target.value)}
                />

                <div className='trips'>
                    <div className='row'>
                        {searchInput === '' ?
                            trips.map((trip, index) => (
                                <div className='city' key={trip.city + index} onClick={() => weekWeatherData(trip)}>
                                    <img src={trip.photo} alt={trip.city} />
                                    <h3>{trip.city}</h3>
                                    <p>From: {trip.changedDate}</p>
                                    <p>To: {trip.endDate}</p>
                                </div>
                            )) :
                            filteredTrips.map((trip, index) => (
                                <div className='city' key={trip.city + index} onClick={() => weekWeatherData(trip)}>
                                    <img src={trip.photo} alt={trip.city} />
                                    <h3>{trip.city}</h3>
                                    <p> From: {trip.changedDate}</p>
                                    <p>To: {trip.endDate}</p>
                                </div>
                            ))
                        }
                    </div>
                    <Modal trips={trips} setTrips={setTrips} />
                </div>

                <section className='trip-weather'>
                    {tripWeather !== null ?
                        tripWeather.days.map(i => (
                            <div key={i.datetime}>
                                <p>{i.datetime}</p>
                                {i.conditions}
                                <p>{i.tempmax}°C/ {i.tempmin}°C</p>
                            </div>
                        )) : ''
                    }
                </section>

            </main>
            <Aside city={selectedTrip} />
        </div>
    );
}
