import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, Building, Settings, LogOut, TrendingUp, Award, Calendar } from "lucide-react"
import { Layout } from "@/components/layout/layout"
import { useAuth } from "@/hooks/useAuth"

export default function MyPage() {
  const { user } = useAuth()

  const getTierColor = (tier: string) => {
    const colors = {
      "브론즈": "bg-amber-600",
      "실버": "bg-gray-400",
      "골드": "bg-yellow-500", 
      "프리미엄": "bg-purple-600"
    }
    return colors[tier as keyof typeof colors] || "bg-gray-400"
  }

  const mockStats = {
    totalOrders: 127,
    totalRevenue: 2840000,
    averageOrderValue: 22362,
    thisMonthOrders: 34
  }

  const mockRecentOrders = [
    { id: 1, product: "슈퍼스노우 항균 스프레이", quantity: 3, amount: 45000, date: "2025-01-27" },
    { id: 2, product: "프리미엄 비타민 C 세럼", quantity: 1, amount: 27000, date: "2025-01-26" },
    { id: 3, product: "천연 보습 크림", quantity: 2, amount: 36000, date: "2025-01-25" }
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">마이페이지</h1>
          <p className="mt-2 text-lg text-gray-600">
            계정 정보와 판매 현황을 확인하세요
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* 계정 상태 */}
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>계정 상태</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{user?.name || "김셀러"}</h3>
                  <div className="flex items-center justify-center space-x-2 mt-1">
                    <Badge className={`${getTierColor(user?.tier || "브론즈")} text-white`}>
                      {user?.tier || "브론즈"}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {user?.marginRate || 25}% 마진
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">인증 상태</span>
                  <Badge variant="default">인증완료</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">가입일</span>
                  <span>2024-12-15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">총 주문건</span>
                  <span className="font-medium">{mockStats.totalOrders}건</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 메인 컨텐츠 */}
          <div className="xl:col-span-3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">판매 현황</TabsTrigger>
                <TabsTrigger value="profile">프로필 관리</TabsTrigger>
                <TabsTrigger value="settings">계정 설정</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* 통계 카드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">이번 달 주문</p>
                          <p className="text-2xl font-bold">{mockStats.thisMonthOrders}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">총 주문건수</p>
                          <p className="text-2xl font-bold">{mockStats.totalOrders}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">총 매출</p>
                          <p className="text-2xl font-bold">{mockStats.totalRevenue.toLocaleString()}</p>
                        </div>
                        <Award className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">평균 주문액</p>
                          <p className="text-2xl font-bold">{mockStats.averageOrderValue.toLocaleString()}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-orange-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 최근 주문 */}
                <Card>
                  <CardHeader>
                    <CardTitle>최근 주문 내역</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRecentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{order.product}</h4>
                            <p className="text-sm text-gray-500">
                              수량: {order.quantity}개 | 주문일: {order.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{order.amount.toLocaleString()}원</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>기본 정보</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">이름</Label>
                        <Input id="name" defaultValue={user?.name || "김셀러"} />
                      </div>
                      <div>
                        <Label htmlFor="email">이메일</Label>
                        <Input id="email" defaultValue={user?.email || "seller@test.com"} />
                      </div>
                      <div>
                        <Label htmlFor="phone">연락처</Label>
                        <Input id="phone" defaultValue="010-1234-5678" />
                      </div>
                      <div>
                        <Label htmlFor="business">사업체명</Label>
                        <Input id="business" defaultValue={user?.businessName || "테스트 사업체"} />
                      </div>
                    </div>
                    <Button>정보 수정</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>계정 설정</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">알림 설정</h4>
                        <p className="text-sm text-gray-500">새 제품 및 프로모션 알림</p>
                      </div>
                      <Button variant="outline">설정</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">비밀번호 변경</h4>
                        <p className="text-sm text-gray-500">계정 보안을 위해 정기적으로 변경하세요</p>
                      </div>
                      <Button variant="outline">변경</Button>
                    </div>

                    <div className="border-t pt-4">
                      <Button variant="destructive" className="w-full">
                        <LogOut className="h-4 w-4 mr-2" />
                        로그아웃
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  )
}
