
import React from 'react';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addToCart } = useCart();
  
  const displayPrice = product.isPromotion && product.promotionalPrice
    ? (
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-petOrange">
          R$ {product.promotionalPrice.toFixed(2)}
        </span>
        <span className="text-sm text-gray-500 line-through">
          R$ {product.price.toFixed(2)}
        </span>
      </div>
    )
    : (
      <span className="text-lg font-bold text-petOrange">
        R$ {product.price.toFixed(2)}
      </span>
    );

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg border-petYellow/30", className)}>
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {/* Placeholder for product image */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-gray-400">Imagem do Produto</span>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-petYellow text-petBrown">Novo</Badge>
          )}
          {product.isPromotion && (
            <Badge className="bg-petOrange text-white">Promoção</Badge>
          )}
        </div>
        
        {/* Favorite button */}
        <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white text-petOrange">
          <Heart size={18} />
        </button>
      </div>
      
      <CardContent className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
        <h3 className="font-medium text-petBrown line-clamp-2 h-12">{product.name}</h3>
        <div className="mt-2 text-xs text-gray-500">
          {product.petType.map(type => (
            <span key={type} className="mr-2">
              {type === 'dog' && '🐶'}
              {type === 'cat' && '🐱'}
              {type === 'bird' && '🦜'}
              {type === 'rabbit' && '🐰'}
              {type === 'other' && '🐾'}
            </span>
          ))}
          {product.petSize && (
            <span className="bg-petYellow/20 text-petBrown px-2 py-0.5 rounded-full text-xs ml-2">
              {product.petSize === 'pequeno' && 'P'}
              {product.petSize === 'medio' && 'M'}
              {product.petSize === 'grande' && 'G'}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {displayPrice}
        <Button 
          size="sm" 
          className="bg-petOrange hover:bg-petOrange-dark text-white"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart size={16} className="mr-1" />
          <span className="sr-only md:not-sr-only md:inline">Adicionar</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
