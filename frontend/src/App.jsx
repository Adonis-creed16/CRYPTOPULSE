import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarketTable from './components/MarketTable'
import Footer from './components/Footer'
import Modal from './components/Modal'

function App() {
  const [cryptoData, setCryptoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal states
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

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

  const handleBuyClick = (coin) => {
    setSelectedCoin(coin)
    setIsBuyModalOpen(true)
  }

  const handleBuySubmit = (e) => {
    e.preventDefault()
    alert(`Successfully simulated purchase of ${selectedCoin.name}!`)
    setIsBuyModalOpen(false)
  }

  return (
    <div className="app-container">
      <Navbar
        onLogin={() => setIsLoginModalOpen(true)}
        onRegister={() => setIsRegisterModalOpen(true)}
      />
      <Hero />
      {error ? (
        <div className="market-section">
          <div className="error">{error}</div>
          <button onClick={fetchData} className="refresh-btn">Retry</button>
        </div>
      ) : (
        <MarketTable data={cryptoData} loading={loading} onBuy={handleBuyClick} />
      )}
      <Footer />

      {/* Buy Modal */}
      <Modal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        title={`Buy ${selectedCoin?.name}`}
      >
        <form onSubmit={handleBuySubmit}>
          <div className="form-group">
            <label>Amount (USD)</label>
            <input type="number" placeholder="0.00" required step="any" />
          </div>
          <div className="form-group">
            <label>Estimated {selectedCoin?.symbol.toUpperCase()}</label>
            <input type="text" value="Calculation hidden..." disabled />
          </div>
          <button type="submit" className="btn-submit">Buy {selectedCoin?.symbol.toUpperCase()}</button>
        </form>
      </Modal>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Log In"
      >
        <form onSubmit={(e) => { e.preventDefault(); setIsLoginModalOpen(false); alert('Logged in!'); }}>
          <div className="form-group">
            <label>Email / Phone Number</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required />
          </div>
          <button type="submit" className="btn-submit">Log In</button>
        </form>
      </Modal>

      {/* Register Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="Register"
      >
        <form onSubmit={(e) => { e.preventDefault(); setIsRegisterModalOpen(false); alert('Account created!'); }}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required />
          </div>
          <button type="submit" className="btn-submit">Create Account</button>
        </form>
      </Modal>
    </div>
  )
}

export default App
