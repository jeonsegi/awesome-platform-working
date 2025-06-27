import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  Package, 
  ShoppingCart, 
  FileText, 
  Users, 
  User, 
  Settings, 
  LogOut,
  BookOpen,
  Building,
  Menu,
  X
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigation = [
    { name: "대시보드", href: "/", icon: Home },
    { name: "제품 카탈로그", href: "/products", icon: Package },
    { name: "주문 관리", href: "/orders", icon: ShoppingCart },
    { name: "마케팅 자료실", href: "/content", icon: FileText },
    { name: "셀러 커뮤니티", href: "/community", icon: Users },
    { name: "셀러 이용방법", href: "/guide", icon: BookOpen },
  ]

  const userNavigation = [
    { name: "마이페이지", href: "/my-page", icon: User },
  ]

  const adminNavigation = user?.role === 'admin' ? [
    { name: "관리자 패널", href: "/admin", icon: Settings },
  ] : []

  const corporateNavigation = [
    { name: "기업 등록 신청", href: "/corporate-application", icon: Building },
  ]

  const getTierColor = (tier: string) => {
    const colors = {
      "브론즈": "bg-amber-600",
      "실버": "bg-gray-400", 
      "골드": "bg-yellow-500",
      "프리미엄": "bg-purple-600"
    }
    return colors[tier as keyof typeof colors] || "bg-gray-400"
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">어썸커뮤니케이션즈</h1>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {/* Main Navigation */}
            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                메인 메뉴
              </h3>
              <div className="mt-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* User Navigation */}
            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                셀러 관리
              </h3>
              <div className="mt-2 space-y-1">
                {userNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Admin Navigation */}
            {adminNavigation.length > 0 && (
              <div>
                <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  관리자
                </h3>
                <div className="mt-2 space-y-1">
                  {adminNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                    >
                      <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Corporate Navigation */}
            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                기업 서비스
              </h3>
              <div className="mt-2 space-y-1">
                {corporateNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* User Info */}
          {user && (
            <div className="p-4 border-t">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getTierColor(user.tier)} text-white text-xs`}>
                      {user.tier}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {user.marginRate}%
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">어썸커뮤니케이션즈</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
