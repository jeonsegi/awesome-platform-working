import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, AlertTriangle, Package, CreditCard, Truck, Star } from "lucide-react";

export default function Guide() {
  const steps = [
    {
      number: 1,
      title: "회원가입 및 셀러 등급 확인",
      description: "어썸커뮤니케이션즈에 셀러로 등록하고 초기 브론즈 등급을 확인합니다.",
      details: [
        "이메일 인증 및 사업자 정보 등록",
        "초기 브론즈 등급 (25% 마진) 자동 부여",
        "셀러 대시보드 접근 권한 획득"
      ],
      icon: CheckCircle
    },
    {
      number: 2,
      title: "가격 정책 숙지 (필수)",
      description: "브랜드 권장소비자가격 유지 의무를 반드시 준수해야 합니다.",
      details: [
        "✗ 권장소비자가격 할인 판매 절대 금지",
        "✗ 임의 가격 변경 금지",
        "✓ 브랜드 가격 정책 100% 준수",
        "⚠️ 위반 시 즉시 계정 정지 및 손해배상"
      ],
      icon: AlertTriangle,
      isWarning: true
    },
    {
      number: 3,
      title: "제품 카탈로그 탐색",
      description: "검증된 브랜드 제품을 둘러보고 판매할 상품을 선택합니다.",
      details: [
        "카테고리별 제품 검색",
        "등급별 공급가 및 마진율 확인",
        "마케팅 자료 미리보기"
      ],
      icon: Package
    },
    {
      number: 4,
      title: "본인 플랫폼에서 고객 주문 접수",
      description: "셀러님의 온라인 스토어에서 고객이 제품을 구매합니다.",
      details: [
        "고객이 셀러 스토어에서 주문",
        "판매가는 권장소비자가격으로 고정",
        "주문 정보 및 배송지 수집"
      ],
      icon: Star
    },
    {
      number: 5,
      title: "어썸 플랫폼에서 드롭쉬핑 주문",
      description: "고객 주문 정보를 바탕으로 어썸 플랫폼에서 해당 제품을 주문 등록합니다.",
      details: [
        "제품 선택 및 수량 입력",
        "실제 구매자 배송 정보 입력",
        "주문 등록 및 결제 대기"
      ],
      icon: CreditCard
    },
    {
      number: 6,
      title: "도매가 결제",
      description: "등급별 공급가로 결제를 진행합니다.",
      details: [
        "브론즈: 25% 마진 (월 신규가입)",
        "실버: 30% 마진 (월 10건 이상)",
        "골드: 35% 마진 (월 50건 이상)",
        "프리미엄: 40% 마진 (월 200건 이상)"
      ],
      icon: CreditCard
    },
    {
      number: 7,
      title: "셀러 브랜딩으로 직배송",
      description: "어썸커뮤니케이션즈가 셀러님의 브랜딩으로 고객에게 직접 배송합니다.",
      details: [
        "셀러 브랜딩 포장재 사용",
        "배송 추적 정보 제공",
        "고객은 셀러에게서 구매한 것으로 인식"
      ],
      icon: Truck
    }
  ];

  const tierBenefits = [
    { tier: "브론즈", margin: "25%", requirement: "신규 가입", color: "bg-orange-100 text-orange-700" },
    { tier: "실버", margin: "30%", requirement: "월 10건 이상", color: "bg-gray-100 text-gray-700" },
    { tier: "골드", margin: "35%", requirement: "월 50건 이상", color: "bg-yellow-100 text-yellow-700" },
    { tier: "프리미엄", margin: "40%", requirement: "월 200건 이상", color: "bg-purple-100 text-purple-700" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold font-heading mb-4" style={{ color: 'hsl(0, 0%, 15%)' }}>
          셀러 이용방법
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          어썸커뮤니케이션즈 드롭쉬핑 플랫폼 이용 가이드
        </p>
      </div>

      {/* Business Flow Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6" style={{ color: 'hsl(0, 0%, 15%)' }}>
            비즈니스 플로우 개요
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">1. 고객 주문</h3>
              <p className="text-sm text-gray-600">셀러 플랫폼에서 고객이 구매</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">2. 드롭쉬핑 주문</h3>
              <p className="text-sm text-gray-600">어썸에서 제품 주문 등록</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">3. 브랜딩 배송</h3>
              <p className="text-sm text-gray-600">셀러 브랜딩으로 직배송</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center" style={{ color: 'hsl(0, 0%, 15%)' }}>
          단계별 이용 가이드
        </h2>
        
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <Card key={index} className={`${step.isWarning ? 'border-red-200 bg-red-50' : 'hover:shadow-md'} transition-shadow`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                    step.isWarning ? 'bg-red-500' : 'bg-gray-700'
                  }`}>
                    {step.isWarning ? (
                      <StepIcon className="h-6 w-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'hsl(0, 0%, 15%)' }}>
                      Step {step.number}: {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className={`flex items-center gap-2 ${
                          detail.startsWith('✗') ? 'text-red-600' :
                          detail.startsWith('✓') ? 'text-green-600' :
                          detail.startsWith('⚠️') ? 'text-red-700 font-semibold' :
                          'text-gray-700'
                        }`}>
                          {!detail.startsWith('✗') && !detail.startsWith('✓') && !detail.startsWith('⚠️') && (
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          )}
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tier Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">셀러 등급별 마진율 안내</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tierBenefits.map((tier, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <Badge className={`mb-3 ${tier.color}`}>
                  {tier.tier}
                </Badge>
                <div className="text-2xl font-bold mb-1">{tier.margin}</div>
                <div className="text-sm text-gray-600">{tier.requirement}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              💡 <strong>등급 업그레이드는 월별 주문 실적을 기준으로 자동 적용됩니다</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
