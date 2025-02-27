/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/stockApi.ts
import axios from 'axios';

const API_KEY = 'GSHGAANBAIRCLAFW';
const BASE_URL = 'https://www.alphavantage.co/query';

export interface StockData {
  symbol: string;
  lastRefreshed: string;
  timeZone: string;
  timeSeries: {
    [key: string]: {
      open: string;
      high: string;
      low: string;
      close: string;
      volume: string;
    };
  };
}

export interface StockOverview {
  Symbol: string;
  Name: string;
  Description: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  Beta: string;
  FiftyTwoWeekHigh: string;
  FiftyTwoWeekLow: string;
  FiftyDayMovingAverage: string;
  TwoHundredDayMovingAverage: string;
}

export async function getStockIntraday(symbol: string, interval: '1min' | '5min' | '15min' | '30min' | '60min' = '5min') {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol,
        interval,
        apikey: API_KEY,
      },
      headers: {
        'User-Agent': 'request',
      },
    });

    const data = response.data;
    const timeSeriesKey = `Time Series (${interval})`;
    
    if (!data[timeSeriesKey]) {
      throw new Error('Invalid API response');
    }

    const result: StockData = {
      symbol: data['Meta Data']['2. Symbol'],
      lastRefreshed: data['Meta Data']['3. Last Refreshed'],
      timeZone: data['Meta Data']['6. Time Zone'],
      timeSeries: {},
    };

    // Convert the time series data
    Object.entries(data[timeSeriesKey]).forEach(([timestamp, values]: [string, any]) => {
      result.timeSeries[timestamp] = {
        open: values['1. open'],
        high: values['2. high'],
        low: values['3. low'],
        close: values['4. close'],
        volume: values['5. volume'],
      };
    });

    return result;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
}

export async function getStockOverview(symbol: string): Promise<StockOverview> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol,
        apikey: API_KEY,
      },
      headers: {
        'User-Agent': 'request',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching stock overview:', error);
    throw error;
  }
}

export async function getDailyStockData(symbol: string, outputSize: 'compact' | 'full' = 'compact') {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        outputsize: outputSize,
        apikey: API_KEY,
      },
      headers: {
        'User-Agent': 'request',
      },
    });

    const data = response.data;
    const result = {
      symbol: data['Meta Data']['2. Symbol'],
      lastRefreshed: data['Meta Data']['3. Last Refreshed'],
      timeZone: data['Meta Data']['5. Time Zone'],
      dailyData: Object.entries(data['Time Series (Daily)']).map(([date, values]: [string, any]) => ({
        date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume']),
      })),
    };

    return result;
  } catch (error) {
    console.error('Error fetching daily stock data:', error);
    throw error;
  }
}

// Get multiple stock quotes at once (up to 5 in free tier)
export async function getBatchStockQuotes(symbols: string[]) {
  try {
    const symbolString = symbols.join(',');
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'BATCH_STOCK_QUOTES',
        symbols: symbolString,
        apikey: API_KEY,
      },
      headers: {
        'User-Agent': 'request',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching batch stock quotes:', error);
    throw error;
  }
}

// Top gainers and losers function
export async function getTopGainersLosers() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TOP_GAINERS_LOSERS',
        apikey: API_KEY,
      },
      headers: {
        'User-Agent': 'request',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching top gainers and losers:', error);
    throw error;
  }
}