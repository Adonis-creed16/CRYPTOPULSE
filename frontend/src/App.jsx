import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarketTable from './components/MarketTable'
import Footer from './components/Footer'

function App() {
  const [cryptoData, setCryptoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8000/api/crypto')
      setCryptoData(response.data)
      setError(null)
      setLoading(false)
    } catch (err) {
      setError('Error fetching data. Make sure the backend is running.')
      setLoading(false)
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      {error ? (
        <div className="market-section">
          <div className="error">{error}</div>
          <button onClick={fetchData} className="refresh-btn">Retry</button>
        </div>
      ) : (
        <MarketTable data={cryptoData} loading={loading} />
      )}
      <Footer />
    </div>
  )
}

export default App
