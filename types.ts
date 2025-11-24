
export interface OrderData {
  orderId: string;
  date: string;
  customerName: string;
  productName: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  paymentMode: 'UPI' | 'Credit Card' | 'Cash' | 'Debit Card';
}

export interface OrderStatus {
  salesRep: string;
  status: 'Delivered' | 'Pending' | 'Cancelled';
  region: string;
  email: string;
  phone: string;
  verified: string | boolean;
  comment: string;
}

export interface CombinedOrder extends OrderData, OrderStatus {}

export interface Prediction {
  monthly: number;
  quarterly: number;
}

export interface DailySales {
  date: string;
  totalSales: number;
}

export interface CategorySales {
  name: string;
  value: number;
}

export interface RegionSales {
  name: string;
  value: number;
}
