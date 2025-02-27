'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const tickers = [
  { symbol: 'ETH', name: 'Ethereum', price: '$2,678.00' },
  { symbol: 'SPY', name: 'S&P 500 ETF', price: '$536.40' },
  { symbol: 'NFLX', name: 'Netflix', price: '$624.32' },
  { symbol: 'BTC', name: 'Bitcoin', price: '$58,934.00' },
  { symbol: 'ADBE', name: 'Adobe', price: '$487.20' },
  { symbol: 'RACE', name: 'Ferrari', price: '$389.45' },
  { symbol: 'KO', name: 'Coca-Cola', price: '$59.87' },
  { symbol: 'NVDA', name: 'NVIDIA', price: '$824.40' },
];

export default function Hero() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="gradient-bg min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-white mb-6">
            All-in-one investment<br />management platform
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Discover everything you need to manage your portfolio, analyze markets,
            and make informed investment decisions — all in one place.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search markets here..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="search-bar w-full h-12 pl-12"
            />
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tickers.map((ticker, index) => (
            <motion.div
              key={ticker.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="ticker-item"
            >
              <Image
                src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${ticker.symbol.toLowerCase()}.png`}
                alt={ticker.name}
                width={24}
                height={24}
                className="asset-icon"
              />
              <span className="text-white">{ticker.symbol}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/dashboard-preview.png"
            alt="Trading Platform Interface"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </motion.div>
      </div>
    </div>
  );
}