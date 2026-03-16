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
  async (city: string) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
      throw new Error("City not found")
    }

    const data: WeatherResponse = await response.json()
    return data
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
        state.error = action.error.message || "Something went wrong"
      })
  },
})

export default weatherSlice.reducer