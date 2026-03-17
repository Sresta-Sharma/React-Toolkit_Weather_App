import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { WeatherResponse } from "./weatherApi"

interface WeatherState {
  weather: WeatherResponse | null
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  weather: null,
  loading: false,
  error: null,
}

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (
    params: { city?: string; lat?: number; lon?: number }
  ) => {

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

    let url = ""

    if (params.city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${API_KEY}&units=metric`
    } else if (params.lat !== undefined && params.lon !== undefined) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=${API_KEY}&units=metric`
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Failed to fetch weather")
    }

    return await response.json()
  }
)

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false
        state.weather = action.payload
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Something went wrong!"
      })
  },
})

export default weatherSlice.reducer