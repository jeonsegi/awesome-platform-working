import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Users, Package, ShoppingCart, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock admin data
const mockSellers = [
  { id: 1, name: "김셀러", email: "seller1@test.com", tier: "프리미엄", status: "활성", joinDate: "2025-01-01" },
  { id: 2, name: "이셀러", email: "seller2@test.com", tier: "골드", status: "활성", joinDate: "2025-01-02" },
  { id: 3, name: "박셀러", email: "seller3@test.com", tier: "실버", status: "대기", joinDate: "2025-01-03" }
];

const mockOrders = [
  { id: "ORD-001", seller: "김셀러", product: "슈퍼스노우 비타민C 세럼", status: "paid", amount: 30000 },
  { id: "ORD-002", seller: "이셀러", product: "슈퍼스노우 토너", status: "shipped", amount: 12000 },
  { id: "ORD-003", seller: "박셀러", product: "레티놀 크림", status: "delivered", amount: 54000 }
];

const mockApplications = [
  {
    id: 1,
    applicantName: "신규셀러",
    email: "new@seller.com",
    businessName: "뷰티샵",
    snsAccounts: [
      { platform: "Instagram", url: "@beauty_shop", followers: "8,500" },
      { platform: "YouTube", url: "뷰티샵TV", followers: "2,300" }
    ],
    status: "pending",
    appliedDate: "2025-01-15"
  }
];

export default function Admin() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { toast } = useToast();

  const handleApproveApplication = (id: number) => {
    toast({
      title: "신청 승인",
      description: "이벤트 신청이 승인되었습니다. 신청자에게 이메일이 발송됩니다."
    });
  };

  const handleRejectApplication = (id: number) => {
    toast({
      title: "신청 거부",
      description: "이벤트 신청이 거부되었습니다."
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
             style={{ backgroundColor: '#1C2331' }}>
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-heading" style={{ color: 'hsl(0, 0%, 15%)' }}>
            관리자 패널
          </h1>
          <p className="text-gray-600">시스템 전체를 관리하고 모니터링합니다</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">총 셀러</p>
                <p className="text-2xl font-bold">127명</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">등록 제품</p>
                <p className="text-2xl font-bold">45개</p>
              </div>
              <Package className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">이번 달 주문</p>
                <p className="text-2xl font-bold">234건</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">대기 신청</p>
                <p className="text-2xl font-bold text-orange-600">3건</p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">대시보드</TabsTrigger>
          <TabsTrigger value="sellers">셀러 관리</TabsTrigger>
          <TabsTrigger value="orders">주문 관리</TabsTrigger>
          <TabsTrigger value="applications">이벤트 신청</TabsTrigger>
          <TabsTrigger value="products">제품 관리</TabsTrigger>
        </TabsList>

        {/* Sellers Management */}
        <TabsContent value="sellers" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">셀러 관리</h2>
            <Button style={{ backgroundColor: '#1C2331' }}>
              신규 셀러 등록
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">이름</th>
                      <th className="text-left p-4">이메일</th>
                      <th className="text-left p-4">등급</th>
                      <th className="text-left p-4">상태</th>
                      <th className="text-left p-4">가입일</th>
                      <th className="text-left p-4">관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSellers.map((seller) => (
                      <tr key={seller.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{seller.name}</td>
                        <td className="p-4 text-gray-600">{seller.email}</td>
                        <td className="p-4">
                          <Badge className="bg-purple-100 text-purple-700">
                            {seller.tier}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={seller.status === '활성' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                            {seller.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-gray-600">{seller.joinDate}</td>
                        <td className="p-4">
                          <Button variant="outline" size="sm">
                            편집
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Management */}
        <TabsContent value="orders" className="space-y-6">
          <h2 className="text-xl font-semibold">주문 관리</h2>
          
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{order.id}</h3>
                        <Badge className={
                          order.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'shipped' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {order.status === 'paid' ? '결제완료' :
                           order.status === 'shipped' ? '배송중' : '배송완료'}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{order.product}</p>
                      <p className="text-sm text-gray-500">셀러: {order.seller}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₩{order.amount.toLocaleString()}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        상세보기
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Event Applications */}
        <TabsContent value="applications" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">30명 선착순 이벤트 신청 관리</h2>
            <Badge className="bg-red-100 text-red-700">
              대기중: {mockApplications.length}건
            </Badge>
          </div>

          <div className="space-y-4">
            {mockApplications.map((app) => (
              <Card key={app.id}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">{app.applicantName}</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">이메일:</span> {app.email}</p>
                        <p><span className="font-medium">사업체:</span> {app.businessName}</p>
                        <p><span className="font-medium">신청일:</span> {app.appliedDate}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">SNS 계정 정보</h4>
                      <div className="space-y-2">
                        {app.snsAccounts.map((account, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                            <div>
                              <span className="font-medium">{account.platform}</span>
                              <p className="text-sm text-gray-600">{account.url}</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-700">
                              {account.followers} 팔로워
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6 pt-4 border-t">
                    <Button 
                      className="flex-1" 
                      style={{ backgroundColor: '#1C2331' }}
                      onClick={() => handleApproveApplication(app.id)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      승인
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => handleRejectApplication(app.id)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      거부
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Products Management */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">제품 관리</h2>
            <Button style={{ backgroundColor: '#1C2331' }}>
              신규 제품 등록
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>제품 등록</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName">제품명</Label>
                  <Input id="productName" placeholder="제품명을 입력하세요" />
                </div>
                <div>
                  <Label htmlFor="brand">브랜드</Label>
                  <Input id="brand" placeholder="브랜드명을 입력하세요" />
                </div>
                <div>
                  <Label htmlFor="category">카테고리</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skincare">스킨케어</SelectItem>
                      <SelectItem value="makeup">메이크업</SelectItem>
                      <SelectItem value="bodycare">바디케어</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="wholesalePrice">도매가</Label>
                  <Input id="wholesalePrice" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="retailPrice">권장판매가</Label>
                  <Input id="retailPrice" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="imageUrl">제품 이미지 URL</Label>
                  <Input id="imageUrl" placeholder="https://..." />
                </div>
              </div>
              
              <Button style={{ backgroundColor: '#1C2331' }}>
                제품 등록
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
