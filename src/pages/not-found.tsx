import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(0, 0%, 15%)' }}>
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={() => setLocation("/")}
            className="w-full"
            style={{ backgroundColor: '#1C2331' }}
          >
            <Home className="mr-2 h-4 w-4" />
            홈으로 돌아가기
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전 페이지로
          </Button>
        </div>
      </div>
    </div>
  );
}
