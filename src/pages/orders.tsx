import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-2025-001",
    productName: "슈퍼스노우 비타민C 세럼",
    quantity: 2,
    unitPrice: 15000,
    totalPrice: 30000,
    status: "paid",
    buyerName: "김고객",
    buyerPhone: "010-1234-5678",
    buyerAddress: "서울시 강남구 테헤란로 123",
    createdAt: "2025-01-15",
    paidAt: "2025-01-15",
    shippedAt: null,
    deliveredAt: null
  },
  {
    id: "ORD-2025-002",
    productName: "슈퍼스노우 히알루론산 토너",
    quantity: 1,
    unitPrice: 12000,
    totalPrice: 12000,
    status: "shipped",
    buyerName: "이구매",
    buyerPhone: "010-5678-9012",
    buyerAddress: "부산시 해운대구 해운대로 456",
    createdAt: "2025-01-10",
    paidAt: "2025-01-10",
    shippedAt: "2025-01-12",
    deliveredAt: null
  },
  {
    id: "ORD-2025-003",
    productName: "슈퍼스노우 레티놀 크림",
    quantity: 3,
    unitPrice: 18000,
    totalPrice: 54000,
    status: "delivered",
    buyerName: "박만족",
    buyerPhone: "010-9012-3456",
    buyerAddress: "대구시 중구 중앙대로 789",
    createdAt: "2025-01-05",
    paidAt: "2025-01-05",
    shippedAt: "2025-01-07",
    deliveredAt: "2025-01-10"
  }
];

const statusConfig = {
  paid: { label: "결제완료", color: "bg-blue-100 text-blue-800", icon: Clock },
  shipped: { label: "배송중", color: "bg-yellow-100 text-yellow-800", icon: Truck },
  delivered: { label: "배송완료", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "취소됨", color: "bg-red-100 text-red-800", icon: AlertCircle }
};

export default function Orders() {
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredOrders = selectedTab === "all" 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedTab);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2" style={{ color: 'hsl(0, 0%, 15%)' }}>
          주문 관리
        </h1>
        <p className="text-gray-600">
          등록한 주문의 현황을 확인하고 관리하세요
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">전체 주문</p>
                <p className="text-2xl font-bold">3건</p>
              </div>
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">배송중</p>
                <p className="text-2xl font-bold text-yellow-600">1건</p>
              </div>
              <Truck className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">배송완료</p>
                <p className="text-2xl font-bold text-green-600">1건</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">총 매출</p>
                <p className="text-2xl font-bold">₩96,000</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="paid">결제완료</TabsTrigger>
          <TabsTrigger value="shipped">배송중</TabsTrigger>
          <TabsTrigger value="delivered">배송완료</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredOrders.map((order) => {
            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
            return (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[order.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-1">{order.productName}</p>
                      <p className="text-sm text-gray-500">주문일: {order.createdAt}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">₩{order.totalPrice.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{order.quantity}개</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <h4 className="font-medium mb-2">구매자 정보</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">이름:</span> {order.buyerName}</p>
                        <p><span className="font-medium">전화:</span> {order.buyerPhone}</p>
                        <p><span className="font-medium">주소:</span> {order.buyerAddress}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">배송 정보</h4>
                      <div className="space-y-1 text-sm">
                        {order.paidAt && <p><span className="font-medium">결제일:</span> {order.paidAt}</p>}
                        {order.shippedAt && <p><span className="font-medium">발송일:</span> {order.shippedAt}</p>}
                        {order.deliveredAt && <p><span className="font-medium">배송완료:</span> {order.deliveredAt}</p>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
