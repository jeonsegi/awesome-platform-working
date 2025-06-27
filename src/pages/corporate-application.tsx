import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Crown, Gift, Star, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function CorporateApplication() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    applicantName: "",
    email: "",
    phone: "",
    businessName: "",
    
    // SNS Accounts (3 platforms)
    snsAccounts: [
      { platform: "", url: "", followers: "" },
      { platform: "", url: "", followers: "" },
      { platform: "", url: "", followers: "" }
    ],
    
    // Experience & Motivation
    businessExperience: "",
    motivation: "",
    contentCommitment: "",
    
    // Shipping Info
    recipientName: "",
    shippingPhone: "",
    address: "",
    detailAddress: "",
    zipCode: "",
    
    // Existing Seller Info
    existingSellerId: "",
    existingSellerEmail: "",
    
    // Sample Selection
    selectedSamples: [] as string[]
  });

  const sampleProducts = [
    "슈퍼스노우 비타민C 세럼",
    "슈퍼스노우 히알루론산 토너", 
    "슈퍼스노우 레티놀 크림",
    "슈퍼스노우 나이아신아마이드 에센스"
  ];

  const platformOptions = ["Instagram", "YouTube", "TikTok", "블로그", "기타"];

  const handleSnsAccountChange = (index: number, field: string, value: string) => {
    const newAccounts = [...formData.snsAccounts];
    newAccounts[index] = { ...newAccounts[index], [field]: value };
    setFormData({ ...formData, snsAccounts: newAccounts });
  };

  const handleSampleSelection = (sample: string) => {
    const newSamples = formData.selectedSamples.includes(sample)
      ? formData.selectedSamples.filter(s => s !== sample)
      : formData.selectedSamples.length < 2 
        ? [...formData.selectedSamples, sample]
        : formData.selectedSamples;
    
    setFormData({ ...formData, selectedSamples: newSamples });
  };

  const validateForm = () => {
    if (!formData.applicantName || !formData.email || !formData.phone) {
      toast({ title: "필수 정보 누락", description: "기본 정보를 모두 입력해주세요.", variant: "destructive" });
      return false;
    }

    const validSnsAccounts = formData.snsAccounts.filter(acc => acc.platform && acc.url && acc.followers);
    if (validSnsAccounts.length === 0) {
      toast({ title: "SNS 계정 필수", description: "최소 1개의 SNS 계정 정보를 입력해주세요.", variant: "destructive" });
      return false;
    }

    const totalFollowers = validSnsAccounts.reduce((sum, acc) => sum + parseInt(acc.followers.replace(/,/g, '') || '0'), 0);
    if (totalFollowers < 5000) {
      toast({ title: "팔로워 수 부족", description: "전체 플랫폼 합산 5,000명 이상의 팔로워가 필요합니다.", variant: "destructive" });
      return false;
    }

    if (!formData.contentCommitment.includes('영상') && !formData.contentCommitment.includes('리뷰') && 
        !formData.contentCommitment.includes('콘텐츠') && !formData.contentCommitment.includes('홍보')) {
      toast({ title: "콘텐츠 제작 의무", description: "영상/리뷰/콘텐츠/홍보 관련 키워드를 포함해서 작성해주세요.", variant: "destructive" });
      return false;
    }

    if (formData.selectedSamples.length !== 2) {
      toast({ title: "샘플 선택", description: "정확히 2개의 샘플 제품을 선택해주세요.", variant: "destructive" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Mock submission
    setTimeout(() => {
      toast({
        title: "신청 완료",
        description: "30명 선착순 이벤트 신청이 완료되었습니다. 검토 후 24시간 내에 연락드리겠습니다."
      });
      setIsSubmitting(false);
      setLocation("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="max-w-4xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-6 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          홈으로 돌아가기
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" 
               style={{ backgroundColor: 'hsl(0, 0%, 75%)', color: 'hsl(0, 0%, 15%)' }}>
            <Crown className="h-4 w-4" />
            <span className="text-sm font-medium">셀러 전용 프리미엄 이벤트</span>
          </div>
          
          <h1 className="text-4xl font-bold font-heading mb-4" style={{ color: 'hsl(0, 0%, 15%)' }}>
            어썸의 첫 파트너 30명 선착순 혜택
          </h1>
          
          <div className="flex justify-center gap-3 mb-6">
            <Badge className="bg-yellow-400 text-black font-bold px-4 py-2">🎉 런칭 기념</Badge>
            <Badge className="bg-red-600 text-white font-bold px-4 py-2">첫 파트너 30명</Badge>
            <Badge className="bg-green-600 text-white font-bold px-4 py-2">선착순 혜택</Badge>
          </div>
        </div>

        {/* Benefits Overview */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6">이벤트 혜택</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Gift className="h-12 w-12 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold mb-1">제품 샘플 2개</h3>
                <p className="text-sm text-gray-600">무료 체험</p>
              </div>
              <div className="text-center">
                <Star className="h-12 w-12 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold mb-1">마케팅 콘텐츠</h3>
                <p className="text-sm text-gray-600">무료 제공</p>
              </div>
              <div className="text-center">
                <Crown className="h-12 w-12 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold mb-1">프리미엄 등급</h3>
                <p className="text-sm text-gray-600">즉시 승급</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mx-auto mb-3">40%</div>
                <h3 className="font-semibold mb-1">최대 마진</h3>
                <p className="text-sm text-gray-600">혜택</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicantName">신청자 이름 *</Label>
                  <Input
                    id="applicantName"
                    value={formData.applicantName}
                    onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
                    required
                  />
                </div>
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
                  <Label htmlFor="phone">전화번호 *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="businessName">사업체명</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SNS Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>SNS 계정 정보 (전체 합산 5,000명 이상 필수)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.snsAccounts.map((account, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label>플랫폼 {index + 1}</Label>
                    <Select 
                      value={account.platform} 
                      onValueChange={(value) => handleSnsAccountChange(index, 'platform', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="플랫폼 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {platformOptions.map(platform => (
                          <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>계정 URL 또는 ID</Label>
                    <Input
                      value={account.url}
                      onChange={(e) => handleSnsAccountChange(index, 'url', e.target.value)}
                      placeholder="@username 또는 URL"
                    />
                  </div>
                  <div>
                    <Label>팔로워 수</Label>
                    <Input
                      value={account.followers}
                      onChange={(e) => handleSnsAccountChange(index, 'followers', e.target.value)}
                      placeholder="예: 10,000"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Content Commitment */}
          <Card>
            <CardHeader>
              <CardTitle>콘텐츠 제작 의무사항</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-sm text-amber-700">
                  <strong>필수:</strong> 샘플 제품 수령 후 30일 내 영상/리뷰/콘텐츠/홍보 중 1개 이상 제작 필수
                </p>
              </div>
              <div>
                <Label htmlFor="contentCommitment">콘텐츠 제작 계획 *</Label>
                <Textarea
                  id="contentCommitment"
                  value={formData.contentCommitment}
                  onChange={(e) => setFormData({...formData, contentCommitment: e.target.value})}
                  placeholder="샘플 제품으로 제작할 콘텐츠 계획을 상세히 작성해주세요. (영상/리뷰/콘텐츠/홍보 키워드 포함 필수)"
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Sample Selection */}
          <Card>
            <CardHeader>
              <CardTitle>샘플 제품 선택 (2개 선택)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleProducts.map((product) => (
                  <div
                    key={product}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.selectedSamples.includes(product)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => handleSampleSelection(product)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{product}</span>
                      {formData.selectedSamples.includes(product) && (
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                선택된 샘플: {formData.selectedSamples.length}/2
              </p>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>샘플 수령 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recipientName">수령인 이름 *</Label>
                  <Input
                    id="recipientName"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="shippingPhone">수령인 전화번호 *</Label>
                  <Input
                    id="shippingPhone"
                    value={formData.shippingPhone}
                    onChange={(e) => setFormData({...formData, shippingPhone: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">주소 *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="기본 주소"
                  required
                />
              </div>
              <div>
                <Label htmlFor="detailAddress">상세 주소</Label>
                <Input
                  id="detailAddress"
                  value={formData.detailAddress}
                  onChange={(e) => setFormData({...formData, detailAddress: e.target.value})}
                  placeholder="상세 주소"
                />
              </div>
            </CardContent>
          </Card>

          {/* Existing Seller Info */}
          <Card>
            <CardHeader>
              <CardTitle>기존 셀러 계정 정보 (선택사항)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>기존 셀러:</strong> 승인 시 프리미엄 등급으로 즉시 업그레이드됩니다
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="existingSellerId">기존 셀러 ID</Label>
                  <Input
                    id="existingSellerId"
                    value={formData.existingSellerId}
                    onChange={(e) => setFormData({...formData, existingSellerId: e.target.value})}
                    placeholder="기존 셀러 계정이 있다면 입력"
                  />
                </div>
                <div>
                  <Label htmlFor="existingSellerEmail">기존 등록 이메일</Label>
                  <Input
                    id="existingSellerEmail"
                    value={formData.existingSellerEmail}
                    onChange={(e) => setFormData({...formData, existingSellerEmail: e.target.value})}
                    placeholder="기존 등록 이메일"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="px-12 py-4 text-lg font-semibold"
              style={{ backgroundColor: '#1C2331' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "신청 중..." : "30명 선착순 이벤트 신청하기"}
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              신청 완료 후 24시간 내에 검토 결과를 이메일로 안내드립니다
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
