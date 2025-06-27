import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, Star, ShoppingCart, Package, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "슈퍼스노우 비타민C 세럼",
    brand: "슈퍼스노우",
    category: "스킨케어",
    wholesalePrice: 15000,
    retailPrice: 25000,
    margin: 40,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 1247,
    tags: ["베스트셀러", "비타민C"],
    inStock: true,
    description: "순도 99% 비타민C로 제작된 프리미엄 세럼"
  },
  {
    id: 2,
    name: "슈퍼스노우 히알루론산 토너",
    brand: "슈퍼스노우",
    category: "스킨케어",
    wholesalePrice: 12000,
    retailPrice: 20000,
    margin: 40,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 856,
    tags: ["히알루론산", "보습"],
    inStock: true,
    description: "3중 히알루론산 복합체로 깊은 보습 제공"
  },
  {
    id: 3,
    name: "슈퍼스노우 레티놀 크림",
    brand: "슈퍼스노우",
    category: "스킨케어",
    wholesalePrice: 18000,
    retailPrice: 30000,
    margin: 40,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 234,
    tags: ["레티놀", "안티에이징"],
    inStock: true,
    description: "순한 레티놀 성분으로 피부 재생 케어"
  }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [orderForm, setOrderForm] = useState({
    quantity: 1,
    buyerName: "",
    buyerPhone: "",
    buyerAddress: "",
    buyerDetailAddress: "",
    buyerZipCode: "",
    sellerMessage: ""
  });
  const { toast } = useToast();
  const { user } = useAuth();

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const orderData = {
      ...orderForm,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      unitPrice: selectedProduct.wholesalePrice,
      totalPrice: selectedProduct.wholesalePrice * orderForm.quantity
    };

    // Mock order creation
    setTimeout(() => {
      toast({
        title: "주문 등록 완료",
        description: `${selectedProduct.name} ${orderForm.quantity}개 주문이 등록되었습니다.`
      });
      setSelectedProduct(null);
      setOrderForm({
        quantity: 1,
        buyerName: "",
        buyerPhone: "",
        buyerAddress: "",
        buyerDetailAddress: "",
        buyerZipCode: "",
        sellerMessage: ""
      });
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2" style={{ color: 'hsl(0, 0%, 15%)' }}>
          제품 카탈로그
        </h1>
        <p className="text-gray-600">
          검증된 브랜드 제품을 도매가로 주문하세요
        </p>
      </div>

      {/* Price Policy Warning */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">필수 준수사항</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>• 브랜드 권장소비자가격 유지 의무 (가격 할인 판매 절대 금지)</p>
              <p>• 위반 시 즉시 계정 정지 및 손해배상 청구</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="제품명 또는 브랜드로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 카테고리</SelectItem>
            <SelectItem value="스킨케어">스킨케어</SelectItem>
            <SelectItem value="메이크업">메이크업</SelectItem>
            <SelectItem value="바디케어">바디케어</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1" style={{ color: 'hsl(0, 0%, 15%)' }}>
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-yellow-600">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{product.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">공급가</span>
                  <span className="font-semibold text-lg" style={{ color: 'hsl(0, 0%, 15%)' }}>
                    ₩{product.wholesalePrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">권장판매가</span>
                  <span className="text-sm text-gray-500 line-through">
                    ₩{product.retailPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-green-600">마진율</span>
                  <span className="font-bold text-green-600">{product.margin}%</span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full" 
                    style={{ backgroundColor: '#1C2331' }}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    주문하기
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>제품 주문</DialogTitle>
                  </DialogHeader>
                  {selectedProduct && (
                    <form onSubmit={handleOrder} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <img
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
                          <p className="text-gray-600">{selectedProduct.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>공급가</span>
                              <span className="font-semibold">₩{selectedProduct.wholesalePrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>마진율</span>
                              <span className="text-green-600 font-semibold">{selectedProduct.margin}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="quantity">주문 수량</Label>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            value={orderForm.quantity}
                            onChange={(e) => setOrderForm({...orderForm, quantity: parseInt(e.target.value) || 1})}
                          />
                        </div>
                        <div>
                          <Label>총 주문금액</Label>
                          <div className="text-2xl font-bold text-green-600 mt-2">
                            ₩{(selectedProduct.wholesalePrice * orderForm.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">구매자 배송 정보</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="buyerName">구매자 이름 *</Label>
                            <Input
                              id="buyerName"
                              value={orderForm.buyerName}
                              onChange={(e) => setOrderForm({...orderForm, buyerName: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="buyerPhone">구매자 전화번호 *</Label>
                            <Input
                              id="buyerPhone"
                              value={orderForm.buyerPhone}
                              onChange={(e) => setOrderForm({...orderForm, buyerPhone: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="buyerAddress">배송지 주소 *</Label>
                          <Input
                            id="buyerAddress"
                            value={orderForm.buyerAddress}
                            onChange={(e) => setOrderForm({...orderForm, buyerAddress: e.target.value})}
                            placeholder="기본 주소"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="buyerDetailAddress">상세 주소</Label>
                          <Input
                            id="buyerDetailAddress"
                            value={orderForm.buyerDetailAddress}
                            onChange={(e) => setOrderForm({...orderForm, buyerDetailAddress: e.target.value})}
                            placeholder="상세 주소"
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full" style={{ backgroundColor: '#1C2331' }}>
                        주문 등록하기
                      </Button>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
