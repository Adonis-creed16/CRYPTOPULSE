import React from 'react';

const Sparkline = ({ data, colorClass }) => {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
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

const MarketTable = ({ data, loading }) => {
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
        <a href="#" className="nav-link">View More Markets &gt;</a>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Price</th>
              <th>24h Change</th>
              <th className="hide-mobile">Market Cap</th>
              <th className="hide-mobile">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {data.map((coin) => {
              const isPositive = coin.price_change_percentage_24h > 0;
              return (
                <tr key={coin.id}>
                  <td>
                    <div className="coin-info">
                      <img src={coin.image} alt={coin.name} />
                      <div className="coin-name-group">
                        <span className="coin-symbol-main">{coin.symbol.toUpperCase()}</span>
                        <span className="coin-symbol"> {coin.name}</span>
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
