import React, { useState } from 'react';

const Sparkline = ({ data, colorClass }) => {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 40;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="sparkline-container">
      <svg className="sparkline-svg">
        <polyline
          fill="none"
          strokeWidth="1.5"
          points={points}
          className={colorClass}
        />
      </svg>
    </div>
  );
};

const MarketTable = ({ data, loading, onBuy }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap', direction: 'desc' });

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = data
    .filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (sortConfig.direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

  if (loading && data.length === 0) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="market-section">
      <div className="market-header">
        <h2>Market Trend</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search coin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} style={{cursor: 'pointer'}}>Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th onClick={() => handleSort('current_price')} style={{cursor: 'pointer'}}>Last Price {sortConfig.key === 'current_price' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th onClick={() => handleSort('price_change_percentage_24h')} style={{cursor: 'pointer'}}>24h Change {sortConfig.key === 'price_change_percentage_24h' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th className="hide-mobile" onClick={() => handleSort('market_cap')} style={{cursor: 'pointer'}}>Market Cap {sortConfig.key === 'market_cap' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th className="hide-mobile">Last 7 Days</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((coin) => {
              const isPositive = coin.price_change_percentage_24h > 0;
              return (
                <tr key={coin.id}>
                  <td>
                    <div className="coin-info">
                      <img src={coin.image} alt={coin.name} />
                      <div className="coin-name-group">
                        <div className="coin-symbol-main">{coin.symbol.toUpperCase()}</div>
                        <div className="coin-symbol">{coin.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="price-cell">
                    ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className={isPositive ? 'price-up' : 'price-down'}>
                    {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="hide-mobile">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                  <td className="hide-mobile">
                    <Sparkline
                      data={coin.sparkline_in_7d?.price}
                      colorClass={isPositive ? 'sparkline-up' : 'sparkline-down'}
                    />
                  </td>
                  <td>
                    <button className="btn-buy-small" onClick={() => onBuy(coin)}>Buy</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTable;
