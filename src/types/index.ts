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
  buyerId: string;
  status: 'active' | 'pending' | 'closed';
  quantity: number;
  grade: string;
  region: string;
  loadingDate: string;
  createdAt: string;
} 