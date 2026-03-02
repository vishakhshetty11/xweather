import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [loading, showLoading] = useState(false);
  const handleChange = (e) => {
    setCity(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const key = "b49c09caaeae4d62b77161706263101";
    showLoading(true)
    try {
      const resp = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`);
      const respData = await resp.json();
      setData([
        ...data,
        respData]);
      console.log(respData);
    }
    catch (error) {
      console.error("Error :", error);
      alert('Failed to fetch weather data')
    }
    finally {
      showLoading(false);
    }
  }
  return (
    <div>
      <div style={{ marginTop: "30px" }}>
        <input type='text' value={city} placeholder='Enter city name' onChange={handleChange}
          style={{ height: "35px", marginRight: "10px" }} />
        <button onClick={handleSubmit} style={{ backgroundColor: "green" }}>Search</button>
      </div>
      {loading ?
        <p>Loading data…</p>
        :
        data.length > 0 &&
        <div className='weather-cards' style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
          <div className="weather-card" style={{ width: "24%", backgroundColor: "#fff" }}>
            <h4>Temperature</h4>
            <p>{data[0].current.temp_c}°C</p>
          </div>
          <div className="weather-card" style={{ width: "24%", backgroundColor: "#fff" }}>
            <h4>Humidity</h4>
            <p>{data[0].current.humidity}%</p>
          </div>
          <div className="weather-card" style={{ width: "24%", backgroundColor: "#fff" }}>
            <h4>Condition</h4>
            <p>{data[0].current.condition.text}</p>
          </div>
          <div className="weather-card" style={{ width: "24%", backgroundColor: "#fff" }}>
            <h4>Wind Speed</h4>
            <p>{data[0].current.wind_kph} kph</p>
          </div>
        </div>
      }
    </div>
  )
}

export default App
