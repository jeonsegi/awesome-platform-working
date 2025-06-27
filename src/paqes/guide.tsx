import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, TrendingUp, Users, Package, CreditCard, Truck } from "lucide-react"
import { Layout } from "@/components/layout/layout"

export default function Guide() {
  const steps = [
    {
      number: 1,
      title: "플랫폼 가입 및 인증",
      description: "셀러 계정을 생성하고 사업자 인증을 완료하세요",
      icon: <Users className="h-6 w-6" />,
      details: [
        "사업자등록증 또는 개인사업자 신고증 제출",
        "SNS 계정 연동 (Instagram, YouTube, TikTok 등)",
        "최소 팔로워 요구사항 확인 (브론즈: 1,000명 이상)",
        "계정 승인 후 초기 브론즈 티어로 시작"
      ]
    },
    {
      number: 2,
      title: "가격 정책 준수 (필수)",
      description: "브랜드 무결성 유지를 위한 엄격한 가격 정책을 준수해야 합니다",
      icon: <AlertTriangle className="h-6 w-6" />,
      details: [
        "✗ 브랜드 소비자가 임의 변경 절대 금지",
        "✗ 할인 쿠폰, 적립금 등 추가 혜택 제공 금지", 
        "✗ 번들 상품으로 실질적 할인 제공 금지",
        "✓ 제공된 소비자가 그대로 판매 필수",
        "위반 시 즉시 계정 정지 및 영구 이용 제한"
      ]
    },
    {
      number: 3,
      title: "제품 카탈로그 확인",
      description: "티어별 마진율에 따른 공급가를 확인하고 판매할 제품을 선택하세요",
      icon: <Package className="h-6 w-6" />,
      details: [
        "브론즈 25% → 실버 30% → 골드 35% → 프리미엄 40% 마진",
        "티어별 차등 공급가 시스템",
        "베스트셀러 및 신상품 우선 노출",
        "제품별 상세 정보 및 마케팅 자료 제공"
      ]
    },
    {
      number: 4,
      title: "셀러 플랫폼에서 제품 판매",
      description: "고객이 셀러님의 온라인 스토어에서 제품을 구매합니다",
      icon: <TrendingUp className="h-6 w-6" />,
      details: [
        "Instagram 쇼핑, 스마트스토어, 개인 웹사이트 등 활용",
        "제공된 제품 이미지 및 설명 자료 사용",
        "소비자가 그대로 판매 (가격 정책 준수)",
        "고객 주문 접수 및 결제 완료 확인"
      ]
    },
    {
      number: 5,
      title: "드롭십 주문 등록",
      description: "고객 주문 확정 후 어썸 플랫폼에서 해당 제품을 주문 등록하세요",
      icon: <CreditCard className="h-6 w-6" />,
      details: [
        "실제 구매자 정보 입력 (이름, 연락처, 주소)",
        "티어별 공급가로 결제 진행",
        "주문 수량 및 배송 요청사항 입력",
        "결제 완료 후 주문 확정"
      ]
    },
    {
      number: 6,
      title: "브랜딩 직접 배송",
      description: "어썸커뮤니케이션즈에서 셀러 브랜딩으로 고객에게 직접 배송합니다",
      icon: <Truck className="h-6 w-6" />,
      details: [
        "셀러명으로 발송자 정보 설정",
        "셀러 브랜딩 포장재 사용",
        "고객은 셀러에게서 직접 구매한 것으로 인식",
        "배송 완료 후 셀러에게 알림 발송"
      ]
    },
    {
      number: 7,
      title: "티어 업그레이드 및 혜택 확대",
      description: "월 주문량에 따라 티어가 상승하며 더 높은 마진율을 획득하세요",
      icon: <CheckCircle className="h-6 w-6" />,
      details: [
        "브론즈 → 실버: 월 10건 이상 주문",
        "실버 → 골드: 월 50건 이상 주문", 
        "골드 → 프리미엄: 월 200건 이상 주문",
        "티어 상승 시 전용 마케팅 자료 및 1:1 지원 제공"
      ]
    }
  ]

  const tierBenefits = [
    { tier: "브론즈", margin: "25%", requirement: "신규 가입", color: "bg-amber-600" },
    { tier: "실버", margin: "30%", requirement: "월 10건 주문", color: "bg-gray-400" },
    { tier: "골드", margin: "35%", requirement: "월 50건 주문", color: "bg-yellow-500" },
    { tier: "프리미엄", margin: "40%", requirement: "월 200건 주문", color: "bg-purple-600" }
  ]

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">셀러 이용방법</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            어썸커뮤니케이션즈 드롭십 플랫폼 완벽 가이드
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
            <p className="text-blue-800 font-medium">
              셀러 플랫폼 판매 → 고객 구매 → 드롭십 주문 → 브랜딩 직접 배송
            </p>
          </div>
        </div>

        {/* 티어별 마진율 */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">티어별 마진율 시스템</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {tierBenefits.map((tier) => (
                <div key={tier.tier} className="text-center space-y-2">
                  <Badge className={`${tier.color} text-white text-lg px-4 py-2`}>
                    {tier.tier}
                  </Badge>
                  <p className="font-bold text-2xl text-green-600">{tier.margin}</p>
                  <p className="text-sm text-gray-600">{tier.requirement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 단계별 가이드 */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">7단계 비즈니스 플로우</h2>
          
          {steps.map((step, index) => (
            <Card key={step.number} className="overflow-hidden">
              <CardHeader className={`${step.number === 2 ? 'bg-red-50 border-red-200' : 'bg-gray-50'}`}>
                <CardTitle className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${step.number === 2 ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-full flex items-center justify-center font-bold text-lg`}>
                    {step.number}
                  </div>
                  <div className="flex items-center space-x-3">
                    {step.icon}
                    <span className={step.number === 2 ? 'text-red-800' : ''}>{step.title}</span>
                  </div>
                  {step.number === 2 && (
                    <Badge variant="destructive" className="ml-auto">필수 준수</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      {detail.startsWith('✗') ? (
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      ) : detail.startsWith('✓') ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 bg-gray-300 rounded-full mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        detail.startsWith('✗') ? 'text-red-700' : 
                        detail.startsWith('✓') ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 추가 안내사항 */}
        <Card className="max-w-4xl mx-auto bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">중요 공지사항</h3>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• 가격 정책 위반 시 사전 경고 없이 즉시 계정 정지</li>
                  <li>• 브랜드 무결성 훼손 행위 절대 금지</li>
                  <li>• 월 주문량 기준은 결제 완료된 주문 건수 기준</li>
                  <li>• 티어 혜택은 승급 시점부터 즉시 적용</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
