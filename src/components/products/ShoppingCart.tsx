
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart as CartIcon, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

const ShoppingCart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <CartIcon size={20} />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-petOrange text-white w-5 h-5 flex items-center justify-center p-0 text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <CartIcon size={18} />
            Carrinho de Compras
            {totalItems > 0 && <Badge variant="outline">{totalItems} itens</Badge>}
          </SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <div className="w-16 h-16 bg-petYellow/20 rounded-full flex items-center justify-center mb-4">
              <CartIcon size={24} className="text-petOrange" />
            </div>
            <h3 className="font-medium text-petBrown mb-2">Seu carrinho está vazio</h3>
            <p className="text-sm text-gray-500 mb-4">Adicione produtos ao seu carrinho para continuar.</p>
            <SheetClose asChild>
              <Button 
                className="bg-petOrange hover:bg-petOrange-dark text-white"
              >
                Ir às compras
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map(item => {
                const { product, quantity } = item;
                const displayPrice = product.isPromotion && product.promotionalPrice
                  ? product.promotionalPrice
                  : product.price;
                
                return (
                  <div key={product.id} className="flex gap-3">
                    {/* Product image placeholder */}
                    <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs text-gray-400">Imagem</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium line-clamp-2">{product.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{product.brand}</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm font-medium text-petOrange">
                          R$ {displayPrice.toFixed(2)}
                        </div>
                        
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                          >
                            <Minus size={14} />
                          </Button>
                          
                          <span className="w-8 text-center text-sm">{quantity}</span>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-500 ml-1"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="border-t pt-4">
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm">R$ {totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Entrega</span>
                  <span className="text-sm">Calculado no checkout</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-petOrange">R$ {totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="grid gap-2">
                <SheetClose asChild>
                  <Button 
                    className="bg-petOrange hover:bg-petOrange-dark text-white"
                    onClick={handleCheckout}
                  >
                    Finalizar Compra
                  </Button>
                </SheetClose>
                
                <SheetClose asChild>
                  <Button variant="outline">
                    Continuar Comprando
                  </Button>
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
