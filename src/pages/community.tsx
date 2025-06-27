import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, Clock, Send, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// Mock forum data
const mockTopics = [
  {
    id: 1,
    title: "슈퍼스노우 제품 마케팅 팁 공유해요!",
    author: "셀러킹",
    authorTier: "프리미엄",
    createdAt: "2시간 전",
    replies: 12,
    views: 145,
    category: "마케팅",
    isHot: true
  },
  {
    id: 2,
    title: "비타민C 세럼 재고 현황 어떠신가요?",
    author: "뷰티셀러",
    authorTier: "골드",
    createdAt: "5시간 전",
    replies: 8,
    views: 89,
    category: "재고",
    isHot: false
  },
  {
    id: 3,
    title: "고객 문의 대응 방법 질문드려요",
    author: "신규셀러",
    authorTier: "브론즈",
    createdAt: "1일 전",
    replies: 15,
    views: 234,
    category: "고객응대",
    isHot: true
  }
];

const mockChatMessages = [
  {
    id: 1,
    author: "셀러킹",
    authorTier: "프리미엄",
    message: "안녕하세요! 오늘 비타민C 세럼 주문량이 많네요",
    timestamp: "14:32",
    isOwn: false
  },
  {
    id: 2,
    author: "뷰티셀러",
    authorTier: "골드",
    message: "저도요! 마케팅 효과가 좋은 것 같아요",
    timestamp: "14:35",
    isOwn: false
  },
  {
    id: 3,
    author: "테스트 셀러",
    authorTier: "프리미엄",
    message: "혹시 인스타그램 광고 비용 어느 정도 쓰고 계신가요?",
    timestamp: "14:37",
    isOwn: true
  }
];

const tierColors = {
  "브론즈": "bg-orange-100 text-orange-700",
  "실버": "bg-gray-100 text-gray-700",
  "골드": "bg-yellow-100 text-yellow-700",
  "프리미엄": "bg-purple-100 text-purple-700"
};

export default function Community() {
  const [selectedTab, setSelectedTab] = useState("forum");
  const [chatMessage, setChatMessage] = useState("");
  const { user } = useAuth();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // Mock message sending
    console.log("Sending message:", chatMessage);
    setChatMessage("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2" style={{ color: 'hsl(0, 0%, 15%)' }}>
          셀러 커뮤니티
        </h1>
        <p className="text-gray-600">
          다른 셀러들과 정보를 공유하고 소통하세요
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">활성 셀러</p>
                <p className="text-2xl font-bold">47명</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">오늘 게시글</p>
                <p className="text-2xl font-bold">12개</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">실시간 채팅</p>
                <p className="text-2xl font-bold">8명</p>
              </div>
              <div className="relative">
                <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="forum">전체 커뮤니티</TabsTrigger>
          <TabsTrigger value="chat">실시간 채팅</TabsTrigger>
        </TabsList>

        {/* Forum Tab */}
        <TabsContent value="forum" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">커뮤니티 게시판</h2>
            <Button style={{ backgroundColor: '#1C2331' }}>
              새 글 작성
            </Button>
          </div>

          <div className="space-y-4">
            {mockTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {topic.isHot && (
                          <Badge className="bg-red-100 text-red-700">
                            🔥 인기
                          </Badge>
                        )}
                        <Badge variant="outline">{topic.category}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <span>{topic.author}</span>
                          <Badge className={tierColors[topic.authorTier as keyof typeof tierColors] || "bg-gray-100 text-gray-700"}>
                            {topic.authorTier}
                          </Badge>
                        </div>
                        <span>•</span>
                        <span>{topic.createdAt}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{topic.replies}</span>
                        </div>
                        <span>조회 {topic.views}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Chat Tab */}
        <TabsContent value="chat" className="space-y-6">
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                실시간 채팅 (8명 참여중)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {mockChatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.isOwn 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {!msg.isOwn && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold">{msg.author}</span>
                          <Badge className={`text-xs ${tierColors[msg.authorTier as keyof typeof tierColors]}`}>
                            {msg.authorTier}
                          </Badge>
                        </div>
                      )}
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="p-6 border-t">
                <div className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1"
                  />
                  <Button type="submit" style={{ backgroundColor: '#1C2331' }}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
