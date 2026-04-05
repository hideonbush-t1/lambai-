import axios from 'axios';

const api = axios.create({
  // URL này Thành BE sẽ cung cấp sau, tạm thời để localhost
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: { 
    'Content-Type': 'application/json' 
  }
});

export default api;