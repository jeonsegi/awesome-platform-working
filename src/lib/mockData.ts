export const mockSellers = [
  {
    id: 1,
    username: "seller1",
    email: "seller@test.com",
    name: "김셀러",
    businessName: "테스트 사업체",
    tier: "골드",
    marginRate: 35,
    totalOrders: 127,
    totalRevenue: 2840000,
    isVerified: true,
    joinDate: "2024-12-15"
  },
  {
    id: 2,
    username: "seller2", 
    email: "lee@test.com",
    name: "이판매",
    businessName: "리셀러 컴퍼니",
    tier: "실버",
    marginRate: 30,
    totalOrders: 89,
    totalRevenue: 1950000,
    isVerified: true,
    joinDate: "2024-11-20"
  },
  {
    id: 3,
    username: "seller3",
    email: "park@test.com", 
    name: "박상인",
    businessName: "프리미엄 스토어",
    tier: "프리미엄",
    marginRate: 40,
    totalOrders: 203,
    totalRevenue: 4520000,
    isVerified: true,
    joinDate: "2024-10-10"
  }
]

export const mockProducts = [
  {
    id: 1,
    name: "슈퍼스노우 항균 스프레이",
    description: "99.9% 항균 효과가 있는 프리미엄 항균 스프레이",
    category: "생활용품",
    brand: "슈퍼스노우",
    retailPrice: 25000,
    wholesalePrice: 15000,
    imageUrl: "/api/placeholder/300/300",
    isBestseller: true,
    isNew: false,
    tags: ["항균", "스프레이", "생활용품"],
    stock: 150,
    salesCount: 245
  },
  {
    id: 2,
    name: "프리미엄 비타민 C 세럼",
    description: "고농축 비타민 C로 피부 톤 개선 효과",
    category: "화장품",
    brand: "뷰티랩",
    retailPrice: 45000,
    wholesalePrice: 27000,
    imageUrl: "/api/placeholder/300/300",
    isBestseller: false,
    isNew: true,
    tags: ["비타민C", "세럼", "화장품"],
    stock: 80,
    salesCount: 189
  },
  {
    id: 3,
    name: "천연 보습 크림",
    description: "천연 성분으로 만든 순한 보습 크림",
    category: "화장품", 
    brand: "네이처랩",
    retailPrice: 32000,
    wholesalePrice: 19200,
    imageUrl: "/api/placeholder/300/300",
    isBestseller: true,
    isNew: false,
    tags: ["보습", "크림", "천연"],
    stock: 120,
    salesCount: 156
  }
]

export const mockOrders = [
  {
    id: 1,
    sellerId: 1,
    productId: 1,
    productName: "슈퍼스노우 항균 스프레이",
    quantity: 5,
    unitPrice: 15000,
    totalAmount: 75000,
    status: "paid",
    orderDate: "2025-01-27",
    buyerInfo: {
      name: "홍길동",
      phone: "010-1234-5678",
      address: "서울시 강남구 테헤란로 123, 456호"
    }
  },
  {
    id: 2,
    sellerId: 2,
    productId: 2,
    productName: "프리미엄 비타민 C 세럼",
    quantity: 2,
    unitPrice: 27000,
    totalAmount: 54000,
    status: "shipped",
    orderDate: "2025-01-26",
    buyerInfo: {
      name: "김영희",
      phone: "010-9876-5432",
      address: "부산시 해운대구 센텀중앙로 48, 101동 202호"
    }
  },
  {
    id: 3,
    sellerId: 3,
    productId: 3,
    productName: "천연 보습 크림",
    quantity: 3,
    unitPrice: 19200,
    totalAmount: 57600,
    status: "delivered",
    orderDate: "2025-01-25",
    buyerInfo: {
      name: "이철수",
      phone: "010-5555-7777",
      address: "대구시 중구 동성로 100, 202호"
    }
  }
]

export const mockContentAssets = [
  {
    id: 1,
    title: "슈퍼스노우 제품 소개서",
    description: "항균 스프레이 제품의 상세 정보와 마케팅 포인트",
    type: "document" as const,
    category: "제품소개",
    downloadCount: 245,
    fileSize: "2.1MB",
    uploadDate: "2025-01-20",
    thumbnailUrl: "/api/placeholder/150/150"
  },
  {
    id: 2,
    title: "비타민 C 세럼 상품 이미지",
    description: "고해상도 제품 이미지 및 라이프스타일 사진",
    type: "image" as const,
    category: "상품이미지",
    downloadCount: 189,
    fileSize: "15.3MB",
    uploadDate: "2025-01-19",
    thumbnailUrl: "/api/placeholder/150/150"
  },
  {
    id: 3,
    title: "제품 사용법 영상",
    description: "고객 교육용 제품 사용 가이드 영상",
    type: "video" as const,
    category: "교육자료",
    downloadCount: 156,
    fileSize: "45.7MB",
    uploadDate: "2025-01-18",
    thumbnailUrl: "/api/placeholder/150/150"
  }
]

export const mockForumTopics = [
  {
    id: 1,
    title: "신상품 슈퍼스노우 항균 스프레이 판매 후기",
    content: "지난 주에 주문한 항균 스프레이 정말 반응이 좋네요. 특히 요즘 같은 시기에...",
    author: "김셀러",
    authorTier: "골드",
    category: "판매후기",
    replyCount: 12,
    lastActivity: "2시간 전",
    isSticky: false
  },
  {
    id: 2,
    title: "비타민 C 세럼 마케팅 전략 공유",
    content: "인스타그램 릴스로 사용법 영상 올렸더니 문의가 급증했어요...",
    author: "박판매자",
    authorTier: "프리미엄",
    category: "마케팅",
    replyCount: 8,
    lastActivity: "4시간 전",
    isSticky: true
  }
]

export const mockChatMessages = [
  {
    id: 1,
    author: "이셀러",
    authorTier: "실버",
    message: "오늘 슈퍼스노우 재고 들어온다고 들었는데 맞나요?",
    timestamp: "14:30"
  },
  {
    id: 2,
    author: "관리자",
    authorTier: "관리자",
    message: "네, 오후 3시경 입고 예정입니다!",
    timestamp: "14:32"
  },
  {
    id: 3,
    author: "김셀러",
    authorTier: "골드",
    message: "비타민 세럼 반응 진짜 좋네요. 재주문 들어가야겠어요",
    timestamp: "14:35"
  }
]

export const getSupplyPrice = (retailPrice: number, marginRate: number) => {
  const marginMultiplier = (100 - marginRate) / 100
  return Math.round(retailPrice * marginMultiplier)
}

export const getMarginAmount = (retailPrice: number, marginRate: number) => {
  const supplyPrice = getSupplyPrice(retailPrice, marginRate)
  return retailPrice - supplyPrice
}
