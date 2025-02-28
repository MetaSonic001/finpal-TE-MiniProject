"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Ticker {
  symbol: string;
  name: string;
  price: string;
  color: string;
  textColor: string;
}

const tickers: Ticker[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    price: "$2,678.00",
    color: "#627EEA",
    textColor: "white",
  },
  {
    symbol: "SPY",
    name: "S&P 500 ETF",
    price: "$536.40",
    color: "#E4003A",
    textColor: "white",
  },
  {
    symbol: "NFLX",
    name: "Netflix",
    price: "$624.32",
    color: "#E50914",
    textColor: "white",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: "$58,934.00",
    color: "#F7931A",
    textColor: "white",
  },
  {
    symbol: "ADBE",
    name: "Adobe",
    price: "$487.20",
    color: "#FF0000",
    textColor: "white",
  },
  {
    symbol: "RACE",
    name: "Ferrari",
    price: "$389.45",
    color: "#FFDA00",
    textColor: "black",
  },
  {
    symbol: "KO",
    name: "Coca-Cola",
    price: "$59.87",
    color: "#F40009",
    textColor: "white",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    price: "$824.40",
    color: "#76B900",
    textColor: "white",
  },
  {
    symbol: "AAPL",
    name: "Apple",
    price: "$192.53",
    color: "#000000",
    textColor: "white",
  },
  // Duplicate tickers to create continuous scrolling effect
  {
    symbol: "ETH",
    name: "Ethereum",
    price: "$2,678.00",
    color: "#627EEA",
    textColor: "white",
  },
  {
    symbol: "SPY",
    name: "S&P 500 ETF",
    price: "$536.40",
    color: "#E4003A",
    textColor: "white",
  },
  {
    symbol: "NFLX",
    name: "Netflix",
    price: "$624.32",
    color: "#E50914",
    textColor: "white",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: "$58,934.00",
    color: "#F7931A",
    textColor: "white",
  },
];

export default function Hero() {
  const [searchValue, setSearchValue] = useState("");
  const [borderPhase, setBorderPhase] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  // Live border animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBorderPhase((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Add scroll animation for the ticker container
  useEffect(() => {
    if (!tickerRef.current) return;

    const scrollSpeed = isHovered ? 0.5 : 2; // pixels per frame
    let tickerPosition = 0;
    let animationFrameId: number;

    const scrollTicker = () => {
      if (!tickerRef.current) return;

      tickerPosition -= scrollSpeed;

      // Reset position when enough items have scrolled out of view
      if (tickerPosition <= -1200) {
        tickerPosition = 0;
      }

      tickerRef.current.style.transform = `translateX(${tickerPosition}px)`;
      animationFrameId = requestAnimationFrame(scrollTicker);
    };

    animationFrameId = requestAnimationFrame(scrollTicker);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  const getBorderGradient = () => {
    const gradients = [
      "from-blue-500 via-purple-500 to-pink-500",
      "from-green-400 via-blue-500 to-purple-600",
      "from-yellow-400 via-red-500 to-pink-500",
      "from-indigo-500 via-purple-500 to-pink-500",
    ];

    return gradients[borderPhase];
  };

  return (
    <div className="gradient-bg min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-white mb-6">Omni Banking</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Discover everything you need to manage your bank accounts, analyze
            markets, and make informed investment decisions — all in one place.
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

        {/* Ticker container with overflow hidden */}
        <div
          className="overflow-hidden mb-16 py-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Inner scrolling container */}
          <div
            ref={tickerRef}
            className="flex items-center gap-8 whitespace-nowrap transition-transform duration-300"
          >
            {tickers.map((ticker, index) => (
              <motion.div
                key={`${ticker.symbol}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="ticker-item inline-flex items-center gap-2"
              >
                {/* Custom styled ticker logo square */}
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold shadow-md"
                  style={{
                    backgroundColor: ticker.color,
                    color: ticker.textColor,
                  }}
                >
                  {ticker.symbol.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-medium">
                    {ticker.symbol}
                  </span>
                  <span className="text-gray-400 text-xs">{ticker.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative p-1 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Live animated border */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${getBorderGradient()} rounded-2xl opacity-80 animate-pulse`}
          ></div>

          {/* Image container */}
          <div className="relative h-[600px] rounded-xl overflow-hidden">
            <Image
              src="/pNd6vSW1yvnTLdQSNcuT4c8h64.avif"
              alt="Trading Platform Interface"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
