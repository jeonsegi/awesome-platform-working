import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Truck, ArrowRight, Sparkles, Crown } from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleLogin = () => {
    setLocation("/login");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32" style={{ backgroundColor: '#F3F1ED' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" 
                 style={{ backgroundColor: 'hsl(0, 0%, 75%)', color: 'hsl(0, 0%, 15%)' }}>
              <Crown className="h-4 w-4" />
              <span className="text-sm font-medium">셀러 전용 프리미엄 플랫폼</span>
            </div>
            
            <h1 className="font-heading text-5xl lg:text-7xl font-bold mb-6" 
                style={{ color: 'hsl(0, 0%, 15%)' }}>
              Awesome
              <br />
              Communications
            </h1>
            
            <p className="text-xl lg:text-2xl mb-4 max-w-3xl mx-auto font-medium" 
               style={{ color: 'hsl(0, 0%, 15%)' }}>
              검증된 브랜드를 셀러만을 위해 선별합니다
            </p>
            
            <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed" 
               style={{ color: 'hsl(0, 0%, 35%)' }}>
              판매를 돕는 콘텐츠와 마진 구조, 어썸커뮤니케이션즈에서 제공하는<br />
              프리미엄 제품 드롭쉬핑 플랫폼
            </p>
            
            <Button 
              size="lg" 
              className="text-lg px-10 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ 
                backgroundColor: '#1C2331', 
                color: 'white',
                border: 'none'
              }}
              onClick={handleLogin}
            >
              셀러 포털 접속
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 특별 이벤트 배너 */}
      <section className="py-16" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="bg-yellow-400 text-black font-bold px-4 py-2 text-sm rounded-full animate-pulse">
                    🎉 런칭 기념
                  </div>
                  <div className="bg-red-600 text-white font-bold px-4 py-2 text-sm rounded-full">
                    첫 파트너 30명
                  </div>
                  <div className="bg-green-600 text-white font-bold px-4 py-2 text-sm rounded-full">
                    선착순 혜택
                  </div>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">어썸의 첫 파트너 30명 선착순 혜택</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-lg font-semibold">제품 샘플 2개 무료 체험</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-lg font-semibold">마케팅 콘텐츠 무료 제공</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-lg font-semibold">프리미엄 등급 즉시 승급</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-lg font-semibold text-yellow-300">최대 40% 마진 혜택</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-12 py-4 text-xl rounded-xl shadow-lg transition-all transform hover:scale-105"
                  onClick={handleLogin}
                >
                  지금 신청하기
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-6" 
                style={{ color: 'hsl(0, 0%, 15%)' }}>
              신뢰 중심의 담백한 정보 제공
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" 
               style={{ color: 'hsl(0, 0%, 35%)' }}>
              프리미엄 큐레이션으로 셀러의 성공을 지원합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300" 
                  style={{ backgroundColor: 'white' }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center" 
                     style={{ backgroundColor: 'hsl(0, 0%, 75%)', color: 'hsl(0, 0%, 15%)' }}>
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-xl mb-4" style={{ color: 'hsl(0, 0%, 15%)' }}>
                  검증된 브랜드
                </h3>
                <p className="leading-relaxed" style={{ color: 'hsl(0, 0%, 35%)' }}>
                  소비자 만족도와 재구매율이 높은 제품만을 
                  데이터 기반으로 엄선하여 제공합니다
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300" 
                  style={{ backgroundColor: 'white' }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center" 
                     style={{ backgroundColor: 'hsl(0, 0%, 75%)', color: 'hsl(0, 0%, 15%)' }}>
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-xl mb-4" style={{ color: 'hsl(0, 0%, 15%)' }}>
                  셀러 브랜딩 직배송
                </h3>
                <p className="leading-relaxed" style={{ color: 'hsl(0, 0%, 35%)' }}>
                  재고 관리부터 포장, 배송까지 
                  셀러님의 브랜딩으로 대행합니다
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300" 
                  style={{ backgroundColor: 'white' }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center" 
                     style={{ backgroundColor: 'hsl(0, 0%, 75%)', color: 'hsl(0, 0%, 15%)' }}>
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-xl mb-4" style={{ color: 'hsl(0, 0%, 15%)' }}>
                  완성된 콘텐츠
                </h3>
                <p className="leading-relaxed" style={{ color: 'hsl(0, 0%, 35%)' }}>
                  마케팅 소재부터 상품 설명까지 
                  판매에 필요한 모든 자료를 제공합니다
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
