import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { mockSeller, mockAdmin } from "@/lib/mockData";
import { ArrowLeft, Crown, Shield } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication
    setTimeout(() => {
      if (email === "admin@awesome.com") {
        login(mockAdmin);
        setLocation("/admin");
      } else {
        login(mockSeller);
        setLocation("/");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickLogin = (user: any, redirectPath: string) => {
    setIsLoading(true);
    setTimeout(() => {
      login(user);
      setLocation(redirectPath);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-8 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            랜딩 페이지로 돌아가기
          </Button>

          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center" 
                   style={{ backgroundColor: '#1C2331' }}>
                <Crown className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold" style={{ color: 'hsl(0, 0%, 15%)' }}>
                셀러 포털 로그인
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                어썸커뮤니케이션즈 셀러 전용 플랫폼
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일을 입력해주세요"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력해주세요"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  style={{ backgroundColor: '#1C2331' }}
                  disabled={isLoading}
                >
                  {isLoading ? "로그인 중..." : "로그인"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">개발용 빠른 로그인</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleQuickLogin(mockSeller, "/")}
                  disabled={isLoading}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  셀러로 로그인
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleQuickLogin(mockAdmin, "/admin")}
                  disabled={isLoading}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  관리자로 로그인
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
