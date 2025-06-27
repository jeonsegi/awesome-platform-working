import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MessageCircle, Plus, Send, Users } from "lucide-react"
import { Layout } from "@/components/layout/layout"

interface ForumTopic {
  id: number
  title: string
  content: string
  author: string
  authorTier: string
  category: string
  replyCount: number
  lastActivity: string
  isSticky: boolean
}

interface ChatMessage {
  id: number
  author: string
  authorTier: string
  message: string
  timestamp: string
}

const mockTopics: ForumTopic[] = [
  {
    id: 1,
    title: "신상품 슈퍼스노우 항균 스프레이 판매 후기",
    content: "지난 주에 주문한 항균 스프레이 정말 반응이 좋네요. 특히 요즘 같은 시기에...",
    author: "김셀러",
    authorTier: "골드",
    category: "판매후기",
    replyCount: 12,
    lastActivity: "2시간 전",
    isSticky: false
  },
  {
    id: 2,
    title: "비타민 C 세럼 마케팅 전략 공유",
    content: "인스타그램 릴스로 사용법 영상 올렸더니 문의가 급증했어요...",
    author: "박판매자",
    authorTier: "프리미엄",
    category: "마케팅",
    replyCount: 8,
    lastActivity: "4시간 전",
    isSticky: true
  }
]

const mockChatMessages: ChatMessage[] = [
  {
    id: 1,
    author: "이셀러",
    authorTier: "실버",
    message: "오늘 슈퍼스노우 재고 들어온다고 들었는데 맞나요?",
    timestamp: "14:30"
  },
  {
    id: 2,
    author: "관리자",
    authorTier: "관리자",
    message: "네, 오후 3시경 입고 예정입니다!",
    timestamp: "14:32"
  }
]

export default function Community() {
  const [selectedTab, setSelectedTab] = useState("forum")
  const [newTopicTitle, setNewTopicTitle] = useState("")
  const [newTopicContent, setNewTopicContent] = useState("")
  const [newMessage, setNewMessage] = useState("")

  const getTierBadge = (tier: string) => {
    const tierColors = {
      "브론즈": "bg-amber-600",
      "실버": "bg-gray-400", 
      "골드": "bg-yellow-500",
      "프리미엄": "bg-purple-600",
      "관리자": "bg-red-500"
    }
    return tierColors[tier as keyof typeof tierColors] || "bg-gray-400"
  }

  const handleCreateTopic = () => {
    if (!newTopicTitle.trim() || !newTopicContent.trim()) return
    
    // TODO: API call to create topic
    setNewTopicTitle("")
    setNewTopicContent("")
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    // TODO: API call to send message
    setNewMessage("")
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">셀러 커뮤니티</h1>
          <p className="mt-2 text-lg text-gray-600">
            다른 셀러들과 정보를 공유하고 소통하세요
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="forum">전체 커뮤니티</TabsTrigger>
            <TabsTrigger value="chat">실시간 채팅</TabsTrigger>
          </TabsList>

          <TabsContent value="forum" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="text-sm text-gray-600">활성 셀러: 47명</span>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    새 글 작성
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>새 글 작성</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">제목</Label>
                      <Input
                        id="title"
                        value={newTopicTitle}
                        onChange={(e) => setNewTopicTitle(e.target.value)}
                        placeholder="글 제목을 입력하세요"
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">내용</Label>
                      <Textarea
                        id="content"
                        value={newTopicContent}
                        onChange={(e) => setNewTopicContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        rows={4}
                      />
                    </div>
                    <Button className="w-full" onClick={handleCreateTopic}>
                      글 등록
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {mockTopics.map((topic) => (
                <Card key={topic.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            {topic.isSticky && (
                              <Badge variant="destructive" className="text-xs">공지</Badge>
                            )}
                            <h3 className="font-semibold text-lg">{topic.title}</h3>
                          </div>
                          <p className="text-gray-600 line-clamp-2">{topic.content}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span>{topic.author}</span>
                            <Badge className={`${getTierBadge(topic.authorTier)} text-white text-xs`}>
                              {topic.authorTier}
                            </Badge>
                          </div>
                          <Badge variant="outline">{topic.category}</Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{topic.replyCount}</span>
                          </div>
                          <span>{topic.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">실시간 채팅</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 overflow-y-auto space-y-2 p-2 bg-gray-50 rounded">
                  {mockChatMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-2">
                      <Badge className={`${getTierBadge(message.authorTier)} text-white text-xs`}>
                        {message.authorTier}
                      </Badge>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{message.author}</span>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
