
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Filter as FilterIcon, Check, X } from 'lucide-react';
import { ProductFilter, PetType, ProductCategory } from '@/types';
import { getAllBrands, getPriceRange } from '@/data/products';

interface ProductsFilterProps {
  filters: ProductFilter;
  onFiltersChange: (filters: ProductFilter) => void;
  petType?: PetType;
  availableCategories: { id: ProductCategory; name: string }[];
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({ 
  filters, 
  onFiltersChange, 
  petType,
  availableCategories
}) => {
  const brands = getAllBrands();
  const { min: minAvailablePrice, max: maxAvailablePrice } = getPriceRange();
  
  // Local state for price range
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || minAvailablePrice,
    filters.maxPrice || maxAvailablePrice
  ]);
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const handleApplyPriceRange = () => {
    onFiltersChange({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    });
  };
  
  const handleCategoryChange = (category: ProductCategory) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : category
    });
  };
  
  const handleBrandChange = (brand: string) => {
    onFiltersChange({
      ...filters,
      brand: filters.brand === brand ? undefined : brand
    });
  };
  
  const handleSizeChange = (size: 'pequeno' | 'medio' | 'grande') => {
    onFiltersChange({
      ...filters,
      petSize: filters.petSize === size ? undefined : size
    });
  };
  
  const handlePromotionChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      inPromotion: checked || undefined
    });
  };
  
  const handleClearFilters = () => {
    onFiltersChange({
      petType
    });
    setPriceRange([minAvailablePrice, maxAvailablePrice]);
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-petBrown text-lg">Produtos</h2>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FilterIcon size={16} />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <div className="flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-petOrange">
                  Limpar filtros
                </Button>
                <SheetClose asChild>
                  <Button size="sm" className="bg-petOrange hover:bg-petOrange-dark text-white">
                    <Check size={16} className="mr-1" /> Aplicar
                  </Button>
                </SheetClose>
              </div>
            </SheetHeader>
            
            <div className="py-4 space-y-6">
              {/* Price Range */}
              <div className="space-y-4">
                <h3 className="font-medium text-petBrown">Faixa de Preço</h3>
                <Slider
                  min={minAvailablePrice}
                  max={maxAvailablePrice}
                  step={5}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  onValueCommit={handleApplyPriceRange}
                  className="py-4"
                />
                <div className="flex justify-between text-sm">
                  <span>R$ {priceRange[0].toFixed(2)}</span>
                  <span>R$ {priceRange[1].toFixed(2)}</span>
                </div>
              </div>
              
              {/* Categories */}
              {availableCategories.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-petBrown">Categorias</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {availableCategories.map(category => (
                      <div 
                        key={category.id} 
                        className={`p-2 border rounded-md cursor-pointer transition-all ${
                          filters.category === category.id 
                            ? 'bg-petYellow/20 border-petYellow' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        <span className="text-sm">{category.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Brands */}
              <div className="space-y-2">
                <h3 className="font-medium text-petBrown">Marcas</h3>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`brand-${brand}`} 
                        checked={filters.brand === brand}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <Label 
                        htmlFor={`brand-${brand}`}
                        className="text-sm cursor-pointer"
                      >
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pet Size */}
              <div className="space-y-2">
                <h3 className="font-medium text-petBrown">Tamanho do Pet</h3>
                <div className="flex items-center space-x-2">
                  {(['pequeno', 'medio', 'grande'] as const).map(size => (
                    <button
                      key={size}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.petSize === size
                          ? 'bg-petOrange text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size === 'pequeno' && 'P'}
                      {size === 'medio' && 'M'}
                      {size === 'grande' && 'G'}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Promotions */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="promotions"
                  checked={filters.inPromotion === true}
                  onCheckedChange={(checked) => handlePromotionChange(checked as boolean)}
                />
                <Label 
                  htmlFor="promotions"
                  className="text-sm cursor-pointer"
                >
                  Em promoção
                </Label>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Active filters display */}
      {(filters.category || filters.brand || filters.petSize || filters.inPromotion || 
        filters.minPrice !== minAvailablePrice || filters.maxPrice !== maxAvailablePrice) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.category && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 bg-petYellow/10"
            >
              {availableCategories.find(c => c.id === filters.category)?.name}
              <X 
                size={14} 
                className="cursor-pointer" 
                onClick={() => handleCategoryChange(filters.category!)}
              />
            </Badge>
          )}
          
          {filters.brand && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 bg-petYellow/10"
            >
              {filters.brand}
              <X 
                size={14} 
                className="cursor-pointer" 
                onClick={() => handleBrandChange(filters.brand!)}
              />
            </Badge>
          )}
          
          {filters.petSize && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 bg-petYellow/10"
            >
              Tamanho: {
                filters.petSize === 'pequeno' ? 'P' : 
                filters.petSize === 'medio' ? 'M' : 'G'
              }
              <X 
                size={14} 
                className="cursor-pointer" 
                onClick={() => handleSizeChange(filters.petSize!)}
              />
            </Badge>
          )}
          
          {filters.inPromotion && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 bg-petYellow/10"
            >
              Em promoção
              <X 
                size={14} 
                className="cursor-pointer" 
                onClick={() => handlePromotionChange(false)}
              />
            </Badge>
          )}
          
          {(filters.minPrice !== minAvailablePrice || filters.maxPrice !== maxAvailablePrice) && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 bg-petYellow/10"
            >
              R$ {filters.minPrice?.toFixed(2)} - R$ {filters.maxPrice?.toFixed(2)}
              <X 
                size={14} 
                className="cursor-pointer" 
                onClick={() => {
                  onFiltersChange({
                    ...filters,
                    minPrice: minAvailablePrice,
                    maxPrice: maxAvailablePrice
                  });
                  setPriceRange([minAvailablePrice, maxAvailablePrice]);
                }}
              />
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-petOrange h-6 px-2"
            onClick={handleClearFilters}
          >
            Limpar todos
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsFilter;
