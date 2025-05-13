
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { PaymentMethod, DeliveryMethod } from '@/types';
import { 
  Card, 
  CardContent,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs,
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "@/components/ui/use-toast";
import { 
  CreditCard, 
  QrCode, 
  FileText, 
  Store,
  Truck, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState<'cart' | 'delivery' | 'payment' | 'confirmation'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cartao');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('entrega');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCustomerInfo(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setCustomerInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleNextStep = () => {
    if (currentStep === 'cart') {
      setCurrentStep('delivery');
    } else if (currentStep === 'delivery') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      handlePlaceOrder();
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep === 'delivery') {
      setCurrentStep('cart');
    } else if (currentStep === 'payment') {
      setCurrentStep('delivery');
    } else if (currentStep === 'confirmation') {
      navigate('/produtos');
    }
  };
  
  const handlePlaceOrder = () => {
    // In a real app, this would send the order to the backend
    // For this example, we'll just show a success toast and clear the cart
    
    toast({
      title: "Pedido realizado com sucesso!",
      description: "Seu pedido foi recebido e está sendo processado.",
    });
    
    clearCart();
    setCurrentStep('confirmation');
  };
  
  const isFormValid = () => {
    if (currentStep === 'cart') {
      return items.length > 0;
    } else if (currentStep === 'delivery') {
      if (deliveryMethod === 'entrega') {
        return (
          customerInfo.name && 
          customerInfo.email && 
          customerInfo.phone && 
          customerInfo.address.street &&
          customerInfo.address.number &&
          customerInfo.address.neighborhood &&
          customerInfo.address.city &&
          customerInfo.address.state &&
          customerInfo.address.zipCode
        );
      } else {
        return customerInfo.name && customerInfo.email && customerInfo.phone;
      }
    } else if (currentStep === 'payment') {
      return true; // In a real app, would validate payment information
    }
    
    return true;
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'cart':
        return (
          <div className="space-y-4">
            {items.length > 0 ? (
              <>
                {items.map(item => {
                  const { product, quantity } = item;
                  const displayPrice = product.isPromotion && product.promotionalPrice
                    ? product.promotionalPrice
                    : product.price;
                  
                  return (
                    <div key={product.id} className="flex gap-3 py-3 border-b">
                      {/* Product image placeholder */}
                      <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                        <span className="text-xs text-gray-400">Imagem</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{product.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{product.brand}</div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-sm">
                            <span className="text-gray-500">Qtd: </span>
                            <span>{quantity}</span>
                          </div>
                          <div className="text-sm font-medium text-petOrange">
                            R$ {(displayPrice * quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Entrega</span>
                    <span>A calcular</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span className="text-petOrange">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-medium mb-2">Seu carrinho está vazio</h3>
                <p className="text-gray-500 mb-4">Adicione produtos ao seu carrinho para continuar.</p>
                <Button 
                  onClick={() => navigate('/produtos')}
                  className="bg-petOrange hover:bg-petOrange-dark text-white"
                >
                  Ver Produtos
                </Button>
              </div>
            )}
          </div>
        );
      
      case 'delivery':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            
            <Tabs 
              value={deliveryMethod} 
              onValueChange={(v) => setDeliveryMethod(v as DeliveryMethod)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="entrega" className="flex items-center gap-2">
                  <Truck size={16} />
                  Entrega
                </TabsTrigger>
                <TabsTrigger value="retirada" className="flex items-center gap-2">
                  <Store size={16} />
                  Retirada na Loja
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="entrega" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <Label htmlFor="address.zipCode">CEP</Label>
                      <Input
                        id="address.zipCode"
                        name="address.zipCode"
                        value={customerInfo.address.zipCode}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address.street">Rua</Label>
                    <Input
                      id="address.street"
                      name="address.street"
                      value={customerInfo.address.street}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address.number">Número</Label>
                      <Input
                        id="address.number"
                        name="address.number"
                        value={customerInfo.address.number}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address.complement">Complemento</Label>
                      <Input
                        id="address.complement"
                        name="address.complement"
                        value={customerInfo.address.complement}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address.neighborhood">Bairro</Label>
                    <Input
                      id="address.neighborhood"
                      name="address.neighborhood"
                      value={customerInfo.address.neighborhood}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address.city">Cidade</Label>
                      <Input
                        id="address.city"
                        name="address.city"
                        value={customerInfo.address.city}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address.state">Estado</Label>
                      <Input
                        id="address.state"
                        name="address.state"
                        value={customerInfo.address.state}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="retirada" className="mt-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Loja PetClub</h3>
                  <p className="text-sm text-gray-500">Av. Principal, 1234 - Centro</p>
                  <p className="text-sm text-gray-500">São Paulo, SP - 01234-567</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Horário de funcionamento: 09:00 às 18:00 (Seg. a Sáb.)
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
      
      case 'payment':
        return (
          <div className="space-y-6">
            <Tabs 
              value={paymentMethod} 
              onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="cartao" className="flex items-center gap-2">
                  <CreditCard size={16} />
                  <span className="hidden md:inline">Cartão</span>
                </TabsTrigger>
                <TabsTrigger value="pix" className="flex items-center gap-2">
                  <QrCode size={16} />
                  <span className="hidden md:inline">Pix</span>
                </TabsTrigger>
                <TabsTrigger value="boleto" className="flex items-center gap-2">
                  <FileText size={16} />
                  <span className="hidden md:inline">Boleto</span>
                </TabsTrigger>
                <TabsTrigger value="loja" className="flex items-center gap-2">
                  <Store size={16} />
                  <span className="hidden md:inline">Na loja</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="cartao" className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Número do cartão</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardExpiry">Validade</Label>
                    <Input
                      id="cardExpiry"
                      placeholder="MM/AA"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardCvc">CVC</Label>
                    <Input
                      id="cardCvc"
                      placeholder="123"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cardName">Nome no cartão</Label>
                  <Input
                    id="cardName"
                    placeholder="Nome como aparece no cartão"
                    className="mt-1"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="pix" className="mt-4">
                <div className="text-center p-6 border rounded-md space-y-4">
                  <div className="h-48 w-48 mx-auto bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">QR Code do PIX</span>
                  </div>
                  <p className="text-sm">Escaneie o QR code acima para pagar com PIX</p>
                  <p className="text-xs text-gray-500">
                    O pagamento será confirmado automaticamente após ser processado
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="boleto" className="mt-4">
                <div className="text-center p-6 border rounded-md space-y-4">
                  <FileText size={48} className="mx-auto text-gray-400" />
                  <p className="text-sm">Clique no botão abaixo para gerar o boleto</p>
                  <Button className="w-full">Gerar Boleto</Button>
                  <p className="text-xs text-gray-500">
                    O pedido será processado após a confirmação do pagamento
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="loja" className="mt-4">
                <div className="text-center p-6 border rounded-md space-y-4">
                  <Store size={48} className="mx-auto text-gray-400" />
                  <p className="text-sm">Você poderá pagar diretamente na loja no momento da retirada</p>
                  <p className="text-xs text-gray-500">
                    Aceitamos dinheiro, cartão de débito, crédito e PIX
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="pt-4 space-y-2 border-t">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              
              {deliveryMethod === 'entrega' && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Frete</span>
                  <span>R$ 15,00</span>
                </div>
              )}
              
              <div className="flex justify-between font-medium pt-2">
                <span>Total</span>
                <span className="text-petOrange">
                  R$ {(totalPrice + (deliveryMethod === 'entrega' ? 15 : 0)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        );
      
      case 'confirmation':
        return (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto bg-petYellow/20 rounded-full flex items-center justify-center">
              <ShoppingBag size={24} className="text-petOrange" />
            </div>
            
            <h3 className="text-xl font-medium">Pedido realizado com sucesso!</h3>
            
            <p className="text-gray-500">
              Seu pedido foi recebido e está sendo processado.
              {deliveryMethod === 'entrega' 
                ? ' Você receberá atualizações sobre o envio por e-mail.' 
                : ' Você pode retirá-lo na loja assim que receber nossa confirmação.'}
            </p>
            
            <div className="pt-4">
              <Button 
                onClick={() => navigate('/produtos')}
                className="bg-petOrange hover:bg-petOrange-dark text-white"
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        );
    }
  };
  
  const getStepTitle = () => {
    switch (currentStep) {
      case 'cart': return 'Carrinho de Compras';
      case 'delivery': return 'Informações de Entrega';
      case 'payment': return 'Pagamento';
      case 'confirmation': return 'Confirmação do Pedido';
    }
  };
  
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      {currentStep !== 'confirmation' && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div 
                className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  currentStep === 'cart' || currentStep === 'delivery' || currentStep === 'payment'
                    ? 'bg-petYellow text-petBrown'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                1
              </div>
              <div className={`h-1 w-12 mx-1 ${
                currentStep === 'delivery' || currentStep === 'payment'
                  ? 'bg-petYellow'
                  : 'bg-gray-200'
              }`} />
              <div 
                className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  currentStep === 'delivery' || currentStep === 'payment'
                    ? 'bg-petYellow text-petBrown'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                2
              </div>
              <div className={`h-1 w-12 mx-1 ${
                currentStep === 'payment'
                  ? 'bg-petYellow'
                  : 'bg-gray-200'
              }`} />
              <div 
                className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  currentStep === 'payment'
                    ? 'bg-petYellow text-petBrown'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                3
              </div>
            </div>
          </div>
          
          <div className="flex text-sm mb-2">
            <span className={`flex-1 text-center ${
              currentStep === 'cart' ? 'text-petBrown font-medium' : 'text-gray-500'
            }`}>
              Carrinho
            </span>
            <span className={`flex-1 text-center ${
              currentStep === 'delivery' ? 'text-petBrown font-medium' : 'text-gray-500'
            }`}>
              Entrega
            </span>
            <span className={`flex-1 text-center ${
              currentStep === 'payment' ? 'text-petBrown font-medium' : 'text-gray-500'
            }`}>
              Pagamento
            </span>
          </div>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>{getStepTitle()}</CardTitle>
        </CardHeader>
        
        <CardContent>
          {renderStepContent()}
        </CardContent>
        
        {currentStep !== 'confirmation' && (
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
            >
              {currentStep === 'cart' ? 'Voltar às compras' : 'Voltar'}
            </Button>
            
            <Button
              className="bg-petOrange hover:bg-petOrange-dark text-white"
              onClick={handleNextStep}
              disabled={!isFormValid()}
            >
              {currentStep === 'payment' ? 'Finalizar Pedido' : 'Continuar'}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Checkout;
