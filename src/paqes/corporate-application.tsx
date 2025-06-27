import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building, Users, Star, Gift, Instagram, Youtube, Globe } from "lucide-react"
import { Layout } from "@/components/layout/layout"
import { useToast } from "@/hooks/use-toast"

export default function CorporateApplication() {
  const { toast } = useToast()
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    businessNumber: "",
    representative: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    businessType: "",
    establishedYear: "",
    employees: "",
    description: "",
    products: "",
    targetMarket: "",
    expectedVolume: "",
    paymentTerms: "",
    specialRequests: ""
  })

  const [eventData, setEventData] = useState({
    sellerName: "",
    sellerId: "",
    registeredEmail: "",
    instagramUrl: "",
    instagramFollowers: "",
    youtubeUrl: "",
    youtubeFollowers: "",
    tiktokUrl: "",
    tiktokFollowers: "",
    contentCommitment: "",
    shippingAddress: "",
    shippingPhone: "",
    applicationReason: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "신청이 접수되었습니다",
      description: "검토 후 3-5일 내에 연락드리겠습니다.",
    })
  }

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 팔로워 수 검증
    const instagramFollowers = parseInt(eventData.instagramFollowers) || 0
    const youtubeFollowers = parseInt(eventData.youtubeFollowers) || 0
    const tiktokFollowers = parseInt(eventData.tiktokFollowers) || 0
    
    if (instagramFollowers < 5000 && youtubeFollowers < 5000 && tiktokFollowers < 5000) {
      toast({
        title: "신청 조건 미달",
        description: "최소 5,000명 이상의 팔로워가 필요합니다.",
        variant: "destructive"
      })
      return
    }

    if (!eventData.contentCommitment.includes("영상") && 
        !eventData.contentCommitment.includes("리뷰") && 
        !eventData.contentCommitment.includes("콘텐츠") &&
        !eventData.contentCommitment.includes("홍보")) {
      toast({
        title: "콘텐츠 제작 약속 필요",
        description: "영상/리뷰/콘텐츠/홍보 관련 키워드가 포함되어야 합니다.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "이벤트 신청 완료",
      description: "검토 후 선정되신 분들께 개별 연락드리겠습니다.",
    })
    setIsEventDialogOpen(false)
  }

  const getAccountId = (url: string, platform: string) => {
    if (!url) return ""
    
    try {
      if (platform === "instagram") {
        const match = url.match(/instagram\.com\/([^/?]+)/)
        return match ? `@${match[1]}` : ""
      } else if (platform === "youtube") {
        const match = url.match(/youtube\.com\/[@c]\/([^/?]+)/) || url.match(/youtube\.com\/channel\/([^/?]+)/)
        return match ? `@${match[1]}` : ""
      } else if (platform === "tiktok") {
        const match = url.match(/tiktok\.com\/@([^/?]+)/)
        return match ? `@${match[1]}` : ""
      }
    } catch (e) {
      return ""
    }
    return ""
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </Button>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">기업 등록 신청</h1>
          <p className="text-xl text-gray-600">
            어썸커뮤니케이션즈와 함께 성장할 기업 파트너를 찾습니다
          </p>
          
          {/* 이벤트 배너 */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-yellow-500 text-black">런칭 기념</Badge>
                  <Badge className="bg-red-500">첫 파트너 30명</Badge>
                  <Badge className="bg-green-500">선착순 혜택</Badge>
                </div>
                <h2 className="text-2xl font-bold mb-2">어썸의 첫 파트너 30명 선착순 혜택</h2>
                <p className="text-lg">무료 샘플 + 즉시 프리미엄 티어 승급 + 전용 마케팅 지원</p>
              </div>
              <div className="text-right">
                <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                      <Gift className="h-5 w-5 mr-2" />
                      이벤트 신청
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl">첫 파트너 30명 이벤트 신청</DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleEventSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="sellerName">셀러명</Label>
                          <Input
                            id="sellerName"
                            value={eventData.sellerName}
                            onChange={(e) => setEventData({...eventData, sellerName: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="sellerId">기존 셀러 ID (있는 경우)</Label>
                          <Input
                            id="sellerId"
                            value={eventData.sellerId}
                            onChange={(e) => setEventData({...eventData, sellerId: e.target.value})}
                            placeholder="기존 가입자만 입력"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="registeredEmail">등록된 이메일 (기존 가입자)</Label>
                        <Input
                          id="registeredEmail"
                          type="email"
                          value={eventData.registeredEmail}
                          onChange={(e) => setEventData({...eventData, registeredEmail: e.target.value})}
                          placeholder="기존 가입자만 입력"
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold">SNS 계정 인증 (최소 5,000명 이상 필요)</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="instagramUrl">Instagram URL</Label>
                            <div className="flex items-center space-x-2">
                              <Instagram className="h-4 w-4 text-pink-500" />
                              <Input
                                id="instagramUrl"
                                value={eventData.instagramUrl}
                                onChange={(e) => setEventData({...eventData, instagramUrl: e.target.value})}
                                placeholder="https://instagram.com/username"
                              />
                            </div>
                            {eventData.instagramUrl && (
                              <p className="text-sm text-gray-600 mt-1">
                                계정: {getAccountId(eventData.instagramUrl, "instagram")}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="instagramFollowers">Instagram 팔로워 수</Label>
                            <Input
                              id="instagramFollowers"
                              type="number"
                              value={eventData.instagramFollowers}
                              onChange={(e) => setEventData({...eventData, instagramFollowers: e.target.value})}
                              placeholder="예: 10000"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="youtubeUrl">YouTube URL</Label>
                            <div className="flex items-center space-x-2">
                              <Youtube className="h-4 w-4 text-red-500" />
                              <Input
                                id="youtubeUrl"
                                value={eventData.youtubeUrl}
                                onChange={(e) => setEventData({...eventData, youtubeUrl: e.target.value})}
                                placeholder="https://youtube.com/@username"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="youtubeFollowers">YouTube 구독자 수</Label>
                            <Input
                              id="youtubeFollowers"
                              type="number"
                              value={eventData.youtubeFollowers}
                              onChange={(e) => setEventData({...eventData, youtubeFollowers: e.target.value})}
                              placeholder="예: 8000"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="tiktokUrl">TikTok URL</Label>
                            <Input
                              id="tiktokUrl"
                              value={eventData.tiktokUrl}
                              onChange={(e) => setEventData({...eventData, tiktokUrl: e.target.value})}
                              placeholder="https://tiktok.com/@username"
                            />
                          </div>
                          <div>
                            <Label htmlFor="tiktokFollowers">TikTok 팔로워 수</Label>
                            <Input
                              id="tiktokFollowers"
                              type="number"
                              value={eventData.tiktokFollowers}
                              onChange={(e) => setEventData({...eventData, tiktokFollowers: e.target.value})}
                              placeholder="예: 15000"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="contentCommitment">콘텐츠 제작 약속</Label>
                        <Textarea
                          id="contentCommitment"
                          value={eventData.contentCommitment}
                          onChange={(e) => setEventData({...eventData, contentCommitment: e.target.value})}
                          placeholder="샘플 수령 후 30일 내 영상/리뷰 콘텐츠 제작 및 업로드 약속 (필수 키워드: 영상, 리뷰, 콘텐츠, 홍보 중 하나 이상 포함)"
                          rows={3}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="shippingAddress">샘플 수령 주소</Label>
                        <Textarea
                          id="shippingAddress"
                          value={eventData.shippingAddress}
                          onChange={(e) => setEventData({...eventData, shippingAddress: e.target.value})}
                          placeholder="우편번호, 주소, 상세주소"
                          rows={2}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="shippingPhone">수령인 연락처</Label>
                        <Input
                          id="shippingPhone"
                          value={eventData.shippingPhone}
                          onChange={(e) => setEventData({...eventData, shippingPhone: e.target.value})}
                          placeholder="010-1234-5678"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="applicationReason">신청 사유</Label>
                        <Textarea
                          id="applicationReason"
                          value={eventData.applicationReason}
                          onChange={(e) => setEventData({...eventData, applicationReason: e.target.value})}
                          placeholder="어썸커뮤니케이션즈와 함께하고 싶은 이유를 간단히 작성해주세요"
                          rows={3}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        이벤트 신청하기
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-6 w-6" />
              <span>기업 정보</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">회사명 *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="businessNumber">사업자등록번호 *</Label>
                  <Input
                    id="businessNumber"
                    value={formData.businessNumber}
                    onChange={(e) => setFormData({...formData, businessNumber: e.target.value})}
                    placeholder="000-00-00000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="representative">대표자명 *</Label>
                  <Input
                    id="representative"
                    value={formData.representative}
                    onChange={(e) => setFormData({...formData, representative: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactPerson">담당자명 *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">이메일 *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">연락처 *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="02-1234-5678"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">회사 주소 *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="우편번호, 주소, 상세주소"
                  rows={2}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">회사 웹사이트</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    placeholder="https://company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="businessType">업종 *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="업종 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">제조업</SelectItem>
                      <SelectItem value="distribution">유통업</SelectItem>
                      <SelectItem value="retail">소매업</SelectItem>
                      <SelectItem value="service">서비스업</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="establishedYear">설립년도</Label>
                  <Input
                    id="establishedYear"
                    value={formData.establishedYear}
                    onChange={(e) => setFormData({...formData, establishedYear: e.target.value})}
                    placeholder="2020"
                  />
                </div>
                <div>
                  <Label htmlFor="employees">직원 수</Label>
                  <Select value={formData.employees} onValueChange={(value) => setFormData({...formData, employees: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="직원 수 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10명</SelectItem>
                      <SelectItem value="11-50">11-50명</SelectItem>
                      <SelectItem value="51-100">51-100명</SelectItem>
                      <SelectItem value="100+">100명 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">회사 소개 *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="회사의 주요 사업 분야와 특징을 간단히 설명해주세요"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="products">주요 제품/서비스 *</Label>
                <Textarea
                  id="products"
                  value={formData.products}
                  onChange={(e) => setFormData({...formData, products: e.target.value})}
                  placeholder="공급 가능한 주요 제품이나 서비스를 설명해주세요"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="expectedVolume">예상 월 공급량</Label>
                <Select value={formData.expectedVolume} onValueChange={(value) => setFormData({...formData, expectedVolume: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="예상 공급량 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100-500">100-500개</SelectItem>
                    <SelectItem value="500-1000">500-1,000개</SelectItem>
                    <SelectItem value="1000-5000">1,000-5,000개</SelectItem>
                    <SelectItem value="5000+">5,000개 이상</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="paymentTerms">희망 결제 조건</Label>
                <Select value={formData.paymentTerms} onValueChange={(value) => setFormData({...formData, paymentTerms: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="결제 조건 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net-30">NET 30일</SelectItem>
                    <SelectItem value="net-60">NET 60일</SelectItem>
                    <SelectItem value="installment">할부 결제</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specialRequests">특별 요청사항</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  placeholder="기타 요청사항이나 문의사항을 작성해주세요"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                신청서 제출
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
