import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { 
  Package, 
  FileText, 
  ShoppingCart, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut,
  Shield,
  BookOpen,
  Crown
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();

  const menuItems = [
    { name: "제품 카탈로그", path: "/products", icon: Package },
    { name: "주문 관리", path: "/orders", icon: ShoppingCart },
    { name: "마케팅 자료실", path: "/content", icon: FileText },
    { name: "셀러 커뮤니티", path: "/community", icon: MessageSquare },
    { name: "셀러 이용방법", path: "/guide", icon: BookOpen },
  ];

  const sellerMenuItems = [
    { name: "마이페이지", path: "/my-page", icon: User },
  ];

  const adminMenuItems = user?.role === 'admin' ? [
    { name: "관리자", path: "/admin", icon: Shield },
  ] : [];

  const currentTier = user?.role === 'admin' ? 'ADMIN' : 'PREMIUM';
  const marginRate = user?.role === 'admin' ? 'N/A' : '40%';

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-50">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                 style={{ backgroundColor: '#1C2331' }}>
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-lg font-bold" style={{ color: 'hsl(0, 0%, 15%)' }}>
                Awesome
              </h1>
              <p className="text-xs text-gray-500">Communications</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={location === item.path ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setLocation(item.path)}
                style={location === item.path ? { backgroundColor: '#1C2331' } : {}}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              셀러 관리
            </p>
            <div className="space-y-2">
              {sellerMenuItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location === item.path ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setLocation(item.path)}
                  style={location === item.path ? { backgroundColor: '#1C2331' } : {}}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </div>
          </div>

          {adminMenuItems.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                관리자
              </p>
              <div className="space-y-2">
                {adminMenuItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={location === item.path ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setLocation(item.path)}
                    style={location === item.path ? { backgroundColor: '#1C2331' } : {}}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Card className="p-3 mb-4 bg-gray-50">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-700">{user?.name}</div>
              <div className="text-xs text-gray-500 mb-2">{user?.email}</div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                  {currentTier}
                </span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                  {marginRate}
                </span>
              </div>
            </div>
          </Card>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            로그아웃
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
