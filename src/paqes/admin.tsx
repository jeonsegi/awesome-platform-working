import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Package, ShoppingCart, FileText, Plus, Edit, Trash2 } from "lucide-react"
import { Layout } from "@/components/layout/layout"

const mockSellers = [
  { id: 1, name: "김셀러", email: "seller@test.com", tier: "골드", orders: 127, revenue: 2840000, status: "active" },
  { id: 2, name: "이판매", email: "lee@test.com", tier: "실버", orders: 89, revenue: 1950000, status: "active" },
  { id: 3, name: "박상인", email: "park@test.com", tier: "프리미엄", orders: 203, revenue: 4520000, status: "active" }
]

const mockProducts = [
  { id: 1, name: "슈퍼스노우 항균 스프레이", brand: "슈퍼스노우", category: "생활용품", price: 25000, stock: 150, status: "active" },
  { id: 2, name: "프리미엄 비타민 C 세럼", brand: "뷰티랩", category: "화장품", price: 45000, stock: 80, status: "active" },
  { id: 3, name: "천연 보습 크림", brand: "네이처랩", category: "화장품", price: 32000, stock: 0, status: "inactive" }
]

const mockOrders = [
  { id: 1, seller: "김셀러", product: "슈퍼스노우 항균 스프레이", quantity: 5, amount: 75000, status: "paid", date: "2025-01-27" },
  { id: 2, seller: "이판매", product: "프리미엄 비타민 C 세럼", quantity: 2, amount: 54000, status: "shipped", date: "2025-01-26" },
  { id: 3, seller: "박상인", product: "천연 보습 크림", quantity: 3, amount: 48000, status: "delivered", date: "2025-01-25" }
]

export default function Admin() {
  const [selectedTab, setSelectedTab] = useState("overview")
  
  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default" as const,
      inactive: "secondary" as const,
      paid: "default" as const,
      shipped: "secondary" as const,
      delivered: "default" as const
    }
    return variants[status as keyof typeof variants] || "secondary" as const
  }

  const getTierColor = (tier: string) => {
    const colors = {
      "브론즈": "bg-amber-600",
      "실버": "bg-gray-400",
      "골드": "bg-yellow-500",
      "프리미엄": "bg-purple-600"
    }
    return colors[tier as keyof typeof colors] || "bg-gray-400"
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">관리자 패널</h1>
          <p className="mt-2 text-lg text-gray-600">
            시스템 전체를 관리하고 모니터링하세요
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">대시보드</TabsTrigger>
            <TabsTrigger value="sellers">셀러 관리</TabsTrigger>
            <TabsTrigger value="products">제품 관리</TabsTrigger>
            <TabsTrigger value="orders">주문 관리</TabsTrigger>
            <TabsTrigger value="applications">신청 관리</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">총 셀러</p>
                      <p className="text-2xl font-bold">{mockSellers.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">등록 제품</p>
                      <p className="text-2xl font-bold">{mockProducts.length}</p>
                    </div>
                    <Package className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">총 주문</p>
                      <p className="text-2xl font-bold">{mockOrders.length}</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">총 매출</p>
                      <p className="text-2xl font-bold">
                        {mockSellers.reduce((sum, seller) => sum + seller.revenue, 0).toLocaleString()}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sellers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">셀러 관리</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                새 셀러 추가
              </Button>
            </div>

            <div className="space-y-4">
              {mockSellers.map((seller) => (
                <Card key={seller.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{seller.name}</h3>
                          <Badge className={`${getTierColor(seller.tier)} text-white`}>
                            {seller.tier}
                          </Badge>
                          <Badge variant={getStatusBadge(seller.status)}>
                            {seller.status === 'active' ? '활성' : '비활성'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{seller.email}</p>
                        <p className="text-sm">
                          주문: {seller.orders}건 | 매출: {seller.revenue.toLocaleString()}원
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">제품 관리</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                새 제품 추가
              </Button>
            </div>

            <div className="space-y-4">
              {mockProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{product.name}</h3>
                          <Badge variant="outline">{product.category}</Badge>
                          <Badge variant={getStatusBadge(product.status)}>
                            {product.status === 'active' ? '판매중' : '판매중지'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                        <p className="text-sm">
                          가격: {product.price.toLocaleString()}원 | 재고: {product.stock}개
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">주문 관리</h2>
              <div className="flex space-x-2">
                <Button variant="outline">결제완료</Button>
                <Button variant="outline">배송중</Button>
                <Button variant="outline">배송완료</Button>
              </div>
            </div>

            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">주문 #{order.id}</h3>
                          <Badge variant={getStatusBadge(order.status)}>
                            {order.status === 'paid' ? '결제완료' : 
                             order.status === 'shipped' ? '배송중' : '배송완료'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {order.seller} | {order.product}
                        </p>
                        <p className="text-sm">
                          수량: {order.quantity}개 | 금액: {order.amount.toLocaleString()}원 | {order.date}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">상태 변경</Button>
                        <Button variant="outline" size="sm">상세보기</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">기업 신청 관리</h2>
              <div className="flex space-x-2">
                <Button variant="outline">대기중</Button>
                <Button variant="outline">승인</Button>
                <Button variant="outline">거절</Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="text-center text-gray-500 py-8">
                  신청된 기업 등록이 없습니다.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
