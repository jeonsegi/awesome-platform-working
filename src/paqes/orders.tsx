import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layout } from "@/components/layout/layout"

const mockOrders = [
  {
    id: 1,
    productName: "슈퍼스노우 항균 스프레이",
    quantity: 5,
    totalAmount: 75000,
    status: "paid",
    orderDate: "2025-01-27",
  },
  {
    id: 2,
    productName: "프리미엄 비타민 C 세럼",
    quantity: 2,
    totalAmount: 54000,
    status: "shipped",
    orderDate: "2025-01-26",
  }
]

export default function Orders() {
  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: "대기중", variant: "secondary" as const },
      paid: { label: "결제완료", variant: "default" as const },
      shipped: { label: "배송중", variant: "secondary" as const },
      delivered: { label: "배송완료", variant: "default" as const },
    }
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: "secondary" as const }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">주문 관리</h1>
          <p className="mt-2 text-lg text-gray-600">
            주문 현황을 확인하고 관리하세요
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">전체 주문</TabsTrigger>
            <TabsTrigger value="pending">결제대기</TabsTrigger>
            <TabsTrigger value="processing">처리중</TabsTrigger>
            <TabsTrigger value="completed">완료</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockOrders.map((order) => {
              const status = getStatusBadge(order.status)
              return (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{order.productName}</h3>
                        <p className="text-sm text-gray-500">
                          주문번호: #{order.id} | 주문일: {order.orderDate}
                        </p>
                        <p className="text-sm">
                          수량: {order.quantity}개 | 금액: {order.totalAmount.toLocaleString()}원
                        </p>
                      </div>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="pending">
            <p className="text-center text-gray-500 py-8">결제 대기중인 주문이 없습니다.</p>
          </TabsContent>

          <TabsContent value="processing">
            <p className="text-center text-gray-500 py-8">처리중인 주문이 없습니다.</p>
          </TabsContent>

          <TabsContent value="completed">
            <p className="text-center text-gray-500 py-8">완료된 주문이 없습니다.</p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
