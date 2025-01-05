export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'buyer' | 'seller';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Order {
  id: string;
  buyer_id: string;
  status: 'pending' | 'active' | 'completed';
  created_at: string;
  loading_date: string;
  region: string;
  quantity: number;
  grade: string;
  notes?: string;
  special_requirements?: string;
}

export interface Bid {
  id: string;
  rfq_id: string;
  seller_id: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
} 