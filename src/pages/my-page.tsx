import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, Building, Award, TrendingUp, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function MyPage() {
  const { user } = useAuth();

  const accountInfo = {
    name: user?.name || "테스트 셀러",
    email: user?.email || "test@example.com",
    phone: "010-1234-5678",
    businessName: "테스트 비즈니스",
    businessNumber: "123-45-67890",
    tier: "프리미엄",
    marginRate: "40%",
    joinDate: "2025-01-01",
    isVerified: true
  };

  const stats = [
    { label: "총 주문", value: "24건", icon: "📦" },
    { label: "이번 달 매출", value: "₩1,200,000", icon: "💰" },
    { label: "평균 마진율", value: "40%", icon: "📈" },
    { label: "고객 만족도", value: "4.8/5.0", icon: "⭐" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2" style={{ color: 'hsl(0, 0%, 15%)' }}>
          마이페이지
        </h1>
        <p className="text-gray-600">
          계정 정보와 판매 현황을 확인하고 관리하세요
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Account Status */}
        <div className="xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                계정 상태
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                  <User className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg">{accountInfo.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{accountInfo.email}</p>
                
                <div className="space-y-2">
                  <Badge className="bg-purple-100 text-purple-700 w-full justify-center py-2">
                    <Award className="w-4 h-4 mr-1" />
                    {accountInfo.tier} 등급
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 w-full justify-center py-2">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {accountInfo.marginRate} 마진
                  </Badge>
                  {accountInfo.isVerified && (
                    <Badge className="bg-blue-100 text-blue-700 w-full justify-center py-2">
                      ✓ 인증완료
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>빠른 통계</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{stat.icon}</span>
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="font-semibold">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-3">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">프로필 정보</TabsTrigger>
              <TabsTrigger value="business">사업자 정보</TabsTrigger>
              <TabsTrigger value="settings">계정 설정</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>프로필 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">이름</Label>
                      <Input id="name" defaultValue={accountInfo.name} />
                    </div>
                    <div>
                      <Label htmlFor="email">이메일</Label>
                      <Input id="email" type="email" defaultValue={accountInfo.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">전화번호</Label>
                      <Input id="phone" defaultValue={accountInfo.phone} />
                    </div>
                    <div>
                      <Label htmlFor="joinDate">가입일</Label>
                      <Input id="joinDate" defaultValue={accountInfo.joinDate} disabled />
                    </div>
                  </div>
                  <Button style={{ backgroundColor: '#1C2331' }}>
                    프로필 업데이트
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Business Tab */}
            <TabsContent value="business">
              <Card>
                <CardHeader>
                  <CardTitle>사업자 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="businessName">상호명</Label>
                      <Input id="businessName" defaultValue={accountInfo.businessName} />
                    </div>
                    <div>
                      <Label htmlFor="businessNumber">사업자등록번호</Label>
                      <Input id="businessNumber" defaultValue={accountInfo.businessNumber} />
                    </div>
                    <div>
                      <Label htmlFor="tier">셀러 등급</Label>
                      <Input id="tier" defaultValue={accountInfo.tier} disabled />
                    </div>
                    <div>
                      <Label htmlFor="marginRate">마진율</Label>
                      <Input id="marginRate" defaultValue={accountInfo.marginRate} disabled />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">프리미엄 등급 혜택</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• 최대 40% 마진율 적용</li>
                      <li>• 마케팅 자료 무제한 다운로드</li>
                      <li>• 우선 고객지원 서비스</li>
                      <li>• 신제품 우선 공급</li>
                    </ul>
                  </div>

                  <Button style={{ backgroundColor: '#1C2331' }}>
                    사업자 정보 업데이트
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>계정 설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">현재 비밀번호</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">새 비밀번호</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button style={{ backgroundColor: '#1C2331' }}>
                      비밀번호 변경
                    </Button>
                    <Button variant="outline" className="w-full">
                      알림 설정
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
