export interface Bitso {
  success: boolean;
  payload: {
    high: string;
    last: string;
    created_at: string;
    book: string;
    volume: string;
    vwap: string;
    ask: string;
    bid: string;
  };
}
