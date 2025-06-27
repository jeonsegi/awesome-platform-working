import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ShoppingCart, TrendingUp, Award, Package, FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const stats = [
    {
      title: "이번 달 주문",
      value: "12건",
      icon: ShoppingCart,
      change: "+8.2%",
      changeType: "positive" as const
    },
    {
      title: "총 매출",
      value: "₩2,450,000",
      icon: DollarSign,
      change: "+12.5%",
      changeType: "positive" as const
    },
    {
      title: "평균 마진율",
      value: "40%",
      icon: TrendingUp,
      change: "프리미엄",
      changeType: "neutral" as const
    },
    {
      title: "셀러 등급",
      value: "프리미엄",
      icon: Award,
      change: "최고 등급",
      changeType: "positive" as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading" style={{ color: 'hsl(0, 0%, 15%)' }}>
            어썸커뮤니케이션즈
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            검증된 브랜드를 셀러만을 위해 선별합니다
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">환영합니다</p>
          <p className="text-lg font-semibold" style={{ color: 'hsl(0, 0%, 15%)' }}>
            {user?.name}님
          </p>
        </div>
      </div>

      {/* Event Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6 text-white shadow-lg">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-yellow-400 text-black font-bold">🎉 런칭 기념</Badge>
            <Badge className="bg-red-600 text-white font-bold">첫 파트너 30명</Badge>
            <Badge className="bg-green-600 text-white font-bold">선착순 혜택</Badge>
          </div>
          <h2 className="text-2xl font-bold mb-3">어썸의 첫 파트너 30명 선착순 혜택</h2>
          <p className="text-lg mb-4">
            🎁 제품 샘플 2개 무료 + 마케팅 콘텐츠 + 프리미엄 등급 + 최대 40% 마진
          </p>
        </div>
      </div>

      {/* Price Policy Warning */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-700">
              <strong>가격 정책 준수 필수:</strong> 브랜드 권장소비자가격 유지 의무 (위반 시 즉시 계정 정지)
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {stats.map((stat, index) => (
          <Card key={index} className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold" style={{ color: 'hsl(0, 0%, 15%)' }}>
                    {stat.value}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                     style={{ backgroundColor: 'hsl(0, 0%, 75%)', color: 'hsl(0, 0%, 15%)' }}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' :
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setLocation("/products")}>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" 
                 style={{ backgroundColor: '#1C2331', color: 'white' }}>
              <Package className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'hsl(0, 0%, 15%)' }}>
              제품 주문하기
            </h3>
            <p className="text-gray-600 mb-4">
              검증된 브랜드 제품을 도매가로 주문하세요
            </p>
            <Button className="w-full" style={{ backgroundColor: '#1C2331' }}>
              제품 카탈로그 보기
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setLocation("/content")}>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" 
                 style={{ backgroundColor: '#1C2331', color: 'white' }}>
              <FileText className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'hsl(0, 0%, 15%)' }}>
              마케팅 자료실
            </h3>
            <p className="text-gray-600 mb-4">
              판매를 위한 이미지, 영상, 설명글을 다운로드하세요
            </p>
            <Button className="w-full" style={{ backgroundColor: '#1C2331' }}>
              마케팅 자료실 이동
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
