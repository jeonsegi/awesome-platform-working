import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Search, FileText, Image, Video } from "lucide-react"
import { Layout } from "@/components/layout/layout"

interface ContentAsset {
  id: number
  title: string
  description: string
  type: "image" | "video" | "document"
  category: string
  downloadCount: number
  fileSize: string
  uploadDate: string
  thumbnailUrl: string
}

const mockAssets: ContentAsset[] = [
  {
    id: 1,
    title: "슈퍼스노우 제품 소개서",
    description: "항균 스프레이 제품의 상세 정보와 마케팅 포인트",
    type: "document",
    category: "제품소개",
    downloadCount: 245,
    fileSize: "2.1MB",
    uploadDate: "2025-01-20",
    thumbnailUrl: "/api/placeholder/150/150"
  },
  {
    id: 2,
    title: "비타민 C 세럼 상품 이미지",
    description: "고해상도 제품 이미지 및 라이프스타일 사진",
    type: "image",
    category: "상품이미지",
    downloadCount: 189,
    fileSize: "15.3MB",
    uploadDate: "2025-01-19",
    thumbnailUrl: "/api/placeholder/150/150"
  },
  {
    id: 3,
    title: "제품 사용법 영상",
    description: "고객 교육용 제품 사용 가이드 영상",
    type: "video",
    category: "교육자료",
    downloadCount: 156,
    fileSize: "45.7MB",
    uploadDate: "2025-01-18",
    thumbnailUrl: "/api/placeholder/150/150"
  }
]

export default function Content() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-4 w-4" />
      case "video": return <Video className="h-4 w-4" />
      case "document": return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      image: "bg-green-500",
      video: "bg-blue-500", 
      document: "bg-purple-500"
    }
    return variants[type as keyof typeof variants] || "bg-gray-500"
  }

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">마케팅 자료실</h1>
          <p className="mt-2 text-lg text-gray-600">
            판매에 도움이 되는 마케팅 자료를 다운로드하세요
          </p>
          
          {/* Warning Alert */}
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-amber-800">가격 정책 준수 필수</h3>
                <p className="text-sm text-amber-700 mt-1">
                  ✗ 브랜드 소비자가 임의 변경 금지 (즉시 계정 정지)
                  <br />
                  ✓ 제공된 소비자가 그대로 판매 (브랜드 무결성 유지)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="자료 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
            >
              전체
            </Button>
            <Button
              variant={selectedCategory === "제품소개" ? "default" : "outline"}
              onClick={() => setSelectedCategory("제품소개")}
            >
              제품소개
            </Button>
            <Button
              variant={selectedCategory === "상품이미지" ? "default" : "outline"}
              onClick={() => setSelectedCategory("상품이미지")}
            >
              상품이미지
            </Button>
            <Button
              variant={selectedCategory === "교육자료" ? "default" : "outline"}
              onClick={() => setSelectedCategory("교육자료")}
            >
              교육자료
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src={asset.thumbnailUrl}
                  alt={asset.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className={`${getTypeBadge(asset.type)} text-white`}>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(asset.type)}
                      <span className="capitalize">{asset.type}</span>
                    </div>
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{asset.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{asset.description}</p>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>다운로드: {asset.downloadCount}회</span>
                    <span>{asset.fileSize}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{asset.category}</span>
                    <span>{asset.uploadDate}</span>
                  </div>

                  <Button className="w-full" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    다운로드
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}
