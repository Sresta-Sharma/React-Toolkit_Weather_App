import Search from './components/Search'
import WeatherCard from './components/WeatherCard'

function App() {
  return (

    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-950 text-white">

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
