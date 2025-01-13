import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { creds } from './constants';

const API_KEY = creds.API_KEY;

export const apiSlice = createApi({
    reducerPath: 'weather',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.openweathermap.org` }),
    endpoints: (builder)=>({
        currentCityWeather: builder.query({
            query:(cityName)=>`/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        }),
        currentCoordWeather: builder.query({
            query:(state)=>`/data/2.5/weather?lat=${state.lat}&lon=${state.lon}&units=metric&appid=${API_KEY}`
        }),
        searchCity: builder.query({
            query:(cityName)=>`/geo/1.0/direct?q=${cityName}&limit=10&appid=${API_KEY}`
        })
        ,
        fiveDayForecast: builder.query({
            query:(state)=>`/data/2.5/forecast?lat=${state.lat}&lon=${state.lon}&appid=${API_KEY}&units=metric`
        })
    })
})

export const { useCurrentCityWeatherQuery,useSearchCityQuery,useCurrentCoordWeatherQuery,useFiveDayForecastQuery } = apiSlice;