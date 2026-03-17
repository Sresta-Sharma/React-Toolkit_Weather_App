import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "./app/store"
import { fetchWeather } from "./features/weather/weatherSlice"

import Search from './components/Search'
import WeatherCard from './components/WeatherCard'

function App() {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          fetchWeather({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        )
      },
      () => {
        dispatch(fetchWeather({ city: "Kathmandu" }))
      }
    )
  }, [dispatch])

  return (

    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-700 to-indigo-950 text-white">

      <div className="flex justify-end p-6">
      <Search />
      </div>
      
      <div className="flex justify-center items-center">
      <WeatherCard />
      </div>
      
    </div>

  )
}

export default App
