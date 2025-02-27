// src/lib/alpha-vantage.ts
import axios from 'axios';

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

// Cache object to store API responses and avoid hitting rate limits
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

/**
 * Fetch data from Alpha Vantage API with caching to avoid rate limits
 */
async function fetchWithCache(url: string) {
  // Check if we have a cached response that isn't expired
  if (cache[url] && Date.now() - cache[url].timestamp < CACHE_DURATION) {
    return cache[url].data;
  }

  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'financial-platform' }
    });
    
    // Save response to cache
    cache[url] = {
      data: response.data,
      timestamp: Date.now()
    };
    
    return response.data;
  } catch (error) {
    console.error('Error fetching from Alpha Vantage:', error);
    throw error;
  }
}

export const AlphaVantageService = {
  /**
   * Get intraday time series data for a symbol
   */
  getIntraday: async (symbol: string, interval: '1min' | '5min' | '15min' | '30min' | '60min' = '5min') => {
    const url = `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`;
    return fetchWithCache(url);
  },

  /**
   * Get daily time series data for a symbol
   */
  getDaily: async (symbol: string, outputSize: 'compact' | 'full' = 'compact') => {
    const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=${outputSize}&apikey=${API_KEY}`;
    return fetchWithCache(url);
  },

  /**
   * Get weekly time series data for a symbol
   */
  getWeekly: async (symbol: string) => {
    const url = `${BASE_URL}?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${API_KEY}`;
    return fetchWithCache(url);
  },

  /**
   * Get monthly time series data for a symbol
   */
  getMonthly: async (symbol: string) => {
    const url = `${BASE_URL}?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${API_KEY}`;
    return fetchWithCache(url);
  },

  /**
   * Get quote data for a symbol
   */
  getQuote: async (symbol: string) => {
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    return fetchWithCache(url);
  },

  /**
   * Search for symbols
   */
  searchSymbol: async (keywords: string) => {
    const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`;
    return fetchWithCache(url);
  },

  /**
   * Get overview data for a symbol
   */
  getOverview: async (symbol: string) => {
    const url = `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
    return fetchWithCache(url);
  },

  /**
   * Get earnings data for a symbol
   */
  getEarnings: async (symbol: string) => {
    const url = `${BASE_URL}?function=EARNINGS&symbol=${symbol}&apikey=${API_KEY}`;
    return fetchWithCache(url);
  },

  /**
   * Get income statement data for a symbol
   */
  getIncomeStatement: async (symbol: string) => {
    const url = `${BASE_URL}?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${API_KEY}`;
    return fetchWithCache(url);
  },

  /**
   * Get balance sheet data for a symbol
   */
  getBalanceSheet: async (symbol: string) => {
    const url = `${BASE_URL}?function=BALANCE_SHEET&symbol=${symbol}&apikey=${API_KEY}`;
    return fetchWithCache(url);
  },

  /**
   * Get cash flow data for a symbol
   */
  getCashFlow: async (symbol: string) => {
    const url = `${BASE_URL}?function=CASH_FLOW&symbol=${symbol}&apikey=${API_KEY}`;
    return fetchWithCache(url);
  },
};