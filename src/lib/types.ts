export interface User {
  id: string
  name: string
  email: string
  businessName: string
  role: 'seller' | 'admin'
  tier: '브론즈' | '실버' | '골드' | '프리미엄'
  marginRate: number
  isVerified: boolean
  joinDate: string
}

export interface Product {
  id: number
  name: string
  description: string
  category: string
  brand: string
  retailPrice: number
  wholesalePrice: number
  imageUrl: string
  isBestseller: boolean
  isNew: boolean
  tags: string[]
  stock: number
  salesCount: number
}

export interface Order {
  id: number
  sellerId: number
  productId: number
  productName: string
  quantity: number
  unitPrice: number
  totalAmount: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  orderDate: string
  buyerInfo: {
    name: string
    phone: string
    address: string
  }
}

export interface Seller {
  id: number
  username: string
  email: string
  name: string
  businessName: string
  tier: '브론즈' | '실버' | '골드' | '프리미엄'
  marginRate: number
  totalOrders: number
  totalRevenue: number
  isVerified: boolean
  joinDate: string
}

export interface ContentAsset {
  id: number
  title: string
  description: string
  type: 'image' | 'video' | 'document'
  category: string
  downloadCount: number
  fileSize: string
  uploadDate: string
  thumbnailUrl: string
}

export interface ForumTopic {
  id: number
  title: string
  content: string
  author: string
  authorTier: string
  category: string
  replyCount: number
  lastActivity: string
  isSticky: boolean
}

export interface ChatMessage {
  id: number
  author: string
  authorTier: string
  message: string
  timestamp: string
}

export interface CorporateApplication {
  id: number
  companyName: string
  businessNumber: string
  representative: string
  contactPerson: string
  email: string
  phone: string
  address: string
  website?: string
  businessType: string
  establishedYear?: string
  employees?: string
  description: string
  products: string
  targetMarket?: string
  expectedVolume?: string
  paymentTerms?: string
  specialRequests?: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  adminNotes?: string
}

export interface EventApplication {
  id: number
  sellerName: string
  sellerId?: string
  registeredEmail?: string
  instagramUrl?: string
  instagramFollowers?: string
  youtubeUrl?: string
  youtubeFollowers?: string
  tiktokUrl?: string
  tiktokFollowers?: string
  contentCommitment: string
  shippingAddress: string
  shippingPhone: string
  applicationReason: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  adminNotes?: string
}
