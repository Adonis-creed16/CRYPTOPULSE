import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [cryptoData, setCryptoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchData = useCallback(async (showLoading = false) => {
    try {
      if (showLoading) setLoading(true)
      const response = await axios.get('http://localhost:8000/api/crypto')
      setCryptoData(response.data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError('Error fetching data. Make sure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Calling fetchData in a timeout to avoid the synchronous setState warning in the effect
    const timer = setTimeout(() => {
      fetchData()
    }, 0)

    const interval = setInterval(() => fetchData(), 60000)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [fetchData])

  if (loading && cryptoData.length === 0) return <div className="loading">Loading...</div>
  if (error && cryptoData.length === 0) return <div className="error">{error}</div>

  return (
    <div className="container">
      <h1>Crypto Real-time Tracker</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Coin</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>24h Change</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((coin, index) => (
              <tr key={coin.id}>
                <td>{index + 1}</td>
                <td className="coin-name">
                  <img src={coin.image} alt={coin.name} />
                  {coin.name}
                </td>
                <td className="symbol">{coin.symbol.toUpperCase()}</td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td className={coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}>
                  {coin.price_change_percentage_24h > 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {lastUpdated && (
        <p className="last-updated">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}
      <button
        onClick={() => fetchData(true)}
        className="refresh-btn"
        disabled={loading}
        aria-label="Refresh cryptocurrency data"
      >
        {loading ? 'Refreshing...' : 'Refresh Now'}
      </button>
    </div>
  )
}

export default App
