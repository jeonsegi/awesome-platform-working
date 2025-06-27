import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, Image, Video, FileText, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock content data
const mockContent = [
  {
    id: 1,
    title: "슈퍼스노우 비타민C 세럼 상품 이미지",
    type: "image",
    category: "product_images",
    productName: "슈퍼스노우 비타민C 세럼",
    fileUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=800&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=300&fit=crop",
    fileSize: "2.1 MB",
    dimensions: "800x800",
    downloads: 145
  },
  {
    id: 2,
    title: "슈퍼스노우 브랜드 소개 영상",
    type: "video",
    category: "brand_content",
    productName: "슈퍼스노우",
    fileUrl: "#",
    thumbnailUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=200&fit=crop",
    fileSize: "45.2 MB",
    duration: "2:30",
    downloads: 67
  },
  {
    id: 3,
    title: "히알루론산 토너 상세 설명글",
    type: "text",
    category: "descriptions",
    productName: "슈퍼스노우 히알루론산 토너",
    fileUrl: "#",
    thumbnailUrl: null,
    fileSize: "15 KB",
    wordCount: "850자",
    downloads: 89
  }
];

const contentTypes = {
  image: { label: "이미지", icon: Image, color: "bg-blue-100 text-blue-800" },
  video: { label: "영상", icon: Video, color: "bg-purple-100 text-purple-800" },
  text: { label: "텍스트", icon: FileText, color: "bg-green-100 text-green-800" }
};

export default function Content() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const { toast } = useToast();

  const filteredContent = mockContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === "all" || item.type === selectedTab;
    return matchesSearch && matchesTab;
  });

  const handleDownload = (item: any) => {
    toast({
      title: "다운로드 완료",
      description: `${item.title}을(를) 다운로드했습니다.`
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2" style={{ color: 'hsl(0, 0%, 15%)' }}>
          마케팅 자료실
        </h1>
        <p className="text-gray-600">
          판매를 위한 이미지, 영상, 설명글을 다운로드하세요
        </p>
      </div>

      {/* Price Policy Warning */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">마케팅 자료 사용 시 주의사항</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>• 브랜드 이미지 및 설명 내용 임의 수정 금지</p>
              <p>• 권장소비자가격 변경하여 마케팅 절대 금지</p>
              <p>• 위반 시 즉시 계정 정지 및 법적 조치</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="제품명 또는 자료명으로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="image">이미지</TabsTrigger>
          <TabsTrigger value="video">영상</TabsTrigger>
          <TabsTrigger value="text">텍스트</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => {
              const TypeIcon = contentTypes[item.type as keyof typeof contentTypes].icon;
              return (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <TypeIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={contentTypes[item.type as keyof typeof contentTypes].color}>
                        <TypeIcon className="w-3 h-3 mr-1" />
                        {contentTypes[item.type as keyof typeof contentTypes].label}
                      </Badge>
                      <span className="text-xs text-gray-500">{item.downloads} 다운로드</span>
                    </div>

                    <h3 className="font-semibold text-lg mb-2" style={{ color: 'hsl(0, 0%, 15%)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{item.productName}</p>

                    <div className="text-xs text-gray-500 mb-4 space-y-1">
                      <div>크기: {item.fileSize}</div>
                      {item.dimensions && <div>해상도: {item.dimensions}</div>}
                      {item.duration && <div>재생시간: {item.duration}</div>}
                      {item.wordCount && <div>분량: {item.wordCount}</div>}
                    </div>

                    <Button 
                      className="w-full" 
                      style={{ backgroundColor: '#1C2331' }}
                      onClick={() => handleDownload(item)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      다운로드
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
