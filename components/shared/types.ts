export interface MarketIndex {
    name: string;
    value: string;
    change: string;
    percentChange: string;
  }
  
  export interface Stock {
    id: number;
    ticker: string;
    name: string;
    price: number;
    priceChange: number;
    percentChange: string;
    marketCap: string;
    pe: number;
    tm: string;
    ytd: string;
    chart: string;
    isFavorite?: boolean;
  }