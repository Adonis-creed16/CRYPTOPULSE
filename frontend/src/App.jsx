import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [cryptoData, setCryptoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8000/api/crypto')
      setCryptoData(response.data)
      setLastUpdated(new Date().toLocaleTimeString())
      setLoading(false)
    } catch (err) {
      setError('Error fetching data. Make sure the backend is running.')
      setLoading(false)
      console.error(err)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await fetchData()
    }
    init()
    const interval = setInterval(fetchData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [fetchData])

  if (loading && cryptoData.length === 0) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>

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
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '1.5rem', height: '1.5rem' }} aria-live="polite">
        {lastUpdated && (
          <p className="symbol" style={{ margin: 0, fontSize: '0.9rem' }}>
            Last updated: {lastUpdated}
          </p>
        )}
      </div>
      <button
        onClick={fetchData}
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
