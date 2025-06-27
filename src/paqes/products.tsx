import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Layout } from "@/components/layout/layout"
import { useAuth } from "@/hooks/useAuth"

interface Product {
  id: number
  name: string
  description: string
  category: string
  brand: string
  originalPrice: number
  wholesalePrice: number
  retailPrice: number
  imageUrl: string
  isBestseller: boolean
  isNew: boolean
  tags: string[]
  stock: number
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "슈퍼스노우 항균 스프레이",
    description: "99.9% 항균 효과가 있는 프리미엄 항균 스프레이",
    category: "생활용품",
    brand: "슈퍼스노우",
    originalPrice: 25000,
    wholesalePrice: 15000,
    retailPrice: 25000,
    imageUrl: "/api/placeholder/300/300",
    isBestseller: true,
    isNew: false,
    tags: ["항균", "스프레이", "생활용품"],
    stock: 150
  },
  {
    id: 2,
    name: "프리미엄 비타민 C 세럼",
    description: "고농축 비타민 C로 피부 톤 개선 효과",
    category: "화장품",
    brand: "뷰티랩",
    originalPrice: 45000,
    wholesalePrice: 27000,
    retailPrice: 45000,
    imageUrl: "/api/placeholder/300/300",
    isBestseller: false,
    isNew: true,
    tags: ["비타민C", "세럼", "화장품"],
    stock: 80
  }
]

export default function Products() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [orderQuantity, setOrderQuantity] = useState(1)

  const getSupplyPrice = (product: Product) => {
    if (!user?.marginRate) return product.wholesalePrice

    const marginMultiplier = (100 - user.marginRate) / 100
    return Math.round(product.retailPrice * marginMultiplier)
  }

  const getMarginAmount = (product: Product) => {
    const supplyPrice = getSupplyPrice(product)
    return product.retailPrice - supplyPrice
  }

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleOrder = (product: Product) => {
    setSelectedProduct(product)
    setIsOrderDialogOpen(true)
  }

  const submitOrder = () => {
    if (!selectedProduct) return

    toast({
      title: "주문 등록 완료",
      description: `${selectedProduct.name} ${orderQuantity}개가 주문되었습니다.`,
    })

    setIsOrderDialogOpen(false)
    setOrderQuantity(1)
    setSelectedProduct(null)
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">제품 카탈로그</h1>
          <p className="mt-2 text-lg text-gray-600">
            티어별 마진율이 적용된 공급가로 주문하세요
          </p>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <Input
            placeholder="제품명 또는 브랜드 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 카테고리</SelectItem>
              <SelectItem value="화장품">화장품</SelectItem>
              <SelectItem value="생활용품">생활용품</SelectItem>
              <SelectItem value="식품">식품</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {product.isBestseller && (
                    <Badge variant="destructive">베스트셀러</Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-green-500">신상품</Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">소비자가</span>
                      <span className="font-medium">
                        {product.retailPrice.toLocaleString()}원
                      </span>
                    </div>
                    
                    {user && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">공급가</span>
                          <span className="font-bold text-blue-600">
                            {getSupplyPrice(product).toLocaleString()}원
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">마진</span>
                          <span className="font-medium text-green-600">
                            {getMarginAmount(product).toLocaleString()}원
                            <span className="text-xs ml-1">({user.marginRate}%)</span>
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleOrder(product)}
                    disabled={!user}
                  >
                    주문하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Dialog */}
        <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>제품 주문</DialogTitle>
            </DialogHeader>
            
            {selectedProduct && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{selectedProduct.name}</h3>
                    <p className="text-sm text-gray-500">{selectedProduct.brand}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">주문 수량</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                  />
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>단가</span>
                    <span>{getSupplyPrice(selectedProduct).toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>수량</span>
                    <span>{orderQuantity}개</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>총 주문금액</span>
                    <span>{(getSupplyPrice(selectedProduct) * orderQuantity).toLocaleString()}원</span>
                  </div>
                </div>

                <Button className="w-full" onClick={submitOrder}>
                  주문 확정
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}
