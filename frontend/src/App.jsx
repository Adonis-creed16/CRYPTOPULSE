import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [cryptoData, setCryptoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8000/api/crypto')
      setCryptoData(response.data)
      setLoading(false)
    } catch (err) {
      setError('Error fetching data. Make sure the backend is running.')
      setLoading(false)
      console.error(err)
    }
  }

  useEffect(() => {
    let mounted = true
    const initFetch = async () => {
      if (mounted) {
        await fetchData()
      }
    }
    initFetch()

    const interval = setInterval(fetchData, 60000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

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
                <td className={coin.price_change_percentage_24h > 0 ? 'positive' : coin.price_change_percentage_24h < 0 ? 'negative' : ''}>
                  {coin.price_change_percentage_24h > 0 ? '▲ ' : coin.price_change_percentage_24h < 0 ? '▼ ' : ''}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={fetchData}
        className="refresh-btn"
        disabled={loading}
        aria-label={loading ? "Refreshing cryptocurrency data" : "Refresh cryptocurrency data"}
        aria-busy={loading}
      >
        {loading ? 'Refreshing...' : 'Refresh Now'}
      </button>
    </div>
  )
}

export default App
