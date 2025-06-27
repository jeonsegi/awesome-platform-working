import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Building, Smartphone, CheckCircle, AlertCircle } from "lucide-react"
import { Layout } from "@/components/layout/layout"
import { useToast } from "@/hooks/use-toast"

export default function Payment() {
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock order data
  const orderData = {
    id: "ORD-2025-001",
    product: "슈퍼스노우 항균 스프레이",
    quantity: 5,
    unitPrice: 15000,
    totalAmount: 75000,
    buyerInfo: {
      name: "홍길동",
      phone: "010-1234-5678",
      address: "서울시 강남구 테헤란로 123, 456호"
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "결제가 완료되었습니다",
        description: `주문번호 ${orderData.id}의 결제가 성공적으로 처리되었습니다.`,
      })
      
      // Redirect to orders page after payment
      setTimeout(() => {
        window.location.href = "/orders"
      }, 2000)
    }, 3000)
  }

  const paymentMethods = [
    {
      id: "card",
      label: "신용카드",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Visa, MasterCard, JCB 등"
    },
    {
      id: "bank",
      label: "계좌이체",
      icon: <Building className="h-5 w-5" />,
      description: "실시간 계좌이체"
    },
    {
      id: "mobile",
      label: "휴대폰 결제",
      icon: <Smartphone className="h-5 w-5" />,
      description: "통신사 결제"
    }
  ]

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">결제</h1>
          <p className="mt-2 text-lg text-gray-600">
            주문 정보를 확인하고 결제를 진행하세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 주문 정보 */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>주문 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <img src="/api/placeholder/64/64" alt={orderData.product} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{orderData.product}</h3>
                    <p className="text-sm text-gray-500">주문번호: {orderData.id}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>수량: {orderData.quantity}개</span>
                      <span>단가: {orderData.unitPrice.toLocaleString()}원</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>배송 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">수령인</span>
                  <span className="font-medium">{orderData.buyerInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">연락처</span>
                  <span className="font-medium">{orderData.buyerInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">배송지</span>
                  <span className="font-medium text-right">{orderData.buyerInfo.address}</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-blue-700">셀러 브랜딩으로 직접 배송됩니다</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>결제 수단</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex items-center space-x-3 cursor-pointer flex-1">
                          {method.icon}
                          <div>
                            <p className="font-medium">{method.label}</p>
                            <p className="text-sm text-gray-500">{method.description}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardNumber">카드번호</Label>
                        <Input id="cardNumber" placeholder="1234-5678-9012-3456" />
                      </div>
                      <div>
                        <Label htmlFor="expiryDate">유효기간</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                      <div>
                        <Label htmlFor="cardPassword">카드비밀번호 앞 2자리</Label>
                        <Input id="cardPassword" type="password" placeholder="••" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 결제 요약 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>결제 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>상품금액</span>
                    <span>{orderData.totalAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>배송비</span>
                    <span className="text-green-600">무료</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>수수료</span>
                    <span>무료</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>총 결제금액</span>
                  <span className="text-blue-600">{orderData.totalAmount.toLocaleString()}원</span>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-700">
                      <p className="font-medium mb-1">드롭십 시스템 안내</p>
                      <p>결제 완료 후 고객에게 셀러 브랜딩으로 직접 배송됩니다.</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>결제 처리중...</span>
                    </div>
                  ) : (
                    `${orderData.totalAmount.toLocaleString()}원 결제하기`
                  )}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  결제 시 <span className="font-medium">이용약관</span> 및 <span className="font-medium">개인정보처리방침</span>에 동의한 것으로 간주됩니다.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
