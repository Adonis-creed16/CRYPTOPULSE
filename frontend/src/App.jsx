import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [cryptoData, setCryptoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchData = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true)
      else setRefreshing(true)
      const response = await axios.get('http://localhost:8000/api/crypto')
      setCryptoData(response.data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError('Error fetching data. Make sure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    const init = async () => { await fetchData(true) }
    init()
    const interval = setInterval(() => fetchData(), 60000)
    return () => clearInterval(interval)
  }, [fetchData])

  if (loading && cryptoData.length === 0) return <div className="loading" aria-busy="true">Loading...</div>
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
                  <img src={coin.image} alt="" aria-hidden="true" />
                  {coin.name}
                </td>
                <td className="symbol">{coin.symbol.toUpperCase()}</td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td className={parseFloat(coin.price_change_percentage_24h.toFixed(2)) > 0 ? 'positive' : parseFloat(coin.price_change_percentage_24h.toFixed(2)) < 0 ? 'negative' : ''}>
                  {parseFloat(coin.price_change_percentage_24h.toFixed(2)) > 0 && <span aria-hidden="true">▲ </span>}
                  {parseFloat(coin.price_change_percentage_24h.toFixed(2)) < 0 && <span aria-hidden="true">▼ </span>}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="status-bar" aria-live="polite">
        {lastUpdated && <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>}
      </div>
      <button
        onClick={() => fetchData()}
        className="refresh-btn"
        disabled={refreshing}
        aria-label={refreshing ? "Refreshing data" : "Refresh data"}
      >
        {refreshing ? 'Refreshing...' : 'Refresh Now'}
      </button>
    </div>
  )
}

export default App
