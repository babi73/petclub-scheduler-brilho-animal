
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '@/components/products/ProductCard';
import ProductsFilter from '@/components/products/ProductsFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductFilter, PetType, ProductCategory } from '@/types';
import { filterProducts, getProductsByPetType } from '@/data/products';
import { Dog, Cat, Bird, Rabbit, PawPrint } from 'lucide-react';

interface CategoryOption {
  id: ProductCategory;
  name: string;
}

// Define product categories by pet type
const categoriesByPetType: Record<PetType, CategoryOption[]> = {
  dog: [
    { id: 'racao', name: 'Rações' },
    { id: 'coleira', name: 'Coleiras e Guias' },
    { id: 'brinquedo', name: 'Brinquedos' },
    { id: 'cama', name: 'Camas e Cobertores' },
    { id: 'acessorio', name: 'Acessórios' },
    { id: 'higiene', name: 'Higiene e Cuidados' },
    { id: 'comedouro', name: 'Comedouros e Bebedouros' },
  ],
  cat: [
    { id: 'racao', name: 'Rações' },
    { id: 'arranhador', name: 'Arranhadores' },
    { id: 'brinquedo', name: 'Brinquedos Interativos' },
    { id: 'areia', name: 'Areia e Higiene' },
    { id: 'acessorio', name: 'Acessórios' },
    { id: 'comedouro', name: 'Comedouros e Bebedouros' },
  ],
  bird: [
    { id: 'racao', name: 'Alimentação' },
    { id: 'gaiola', name: 'Gaiolas e Poleiros' },
    { id: 'brinquedo', name: 'Brinquedos' },
    { id: 'comedouro', name: 'Bebedouros' },
  ],
  rabbit: [
    { id: 'racao', name: 'Rações' },
    { id: 'acessorio', name: 'Acessórios' },
    { id: 'brinquedo', name: 'Brinquedos' },
    { id: 'habitat', name: 'Habitat' },
  ],
  other: [
    { id: 'racao', name: 'Alimentação' },
    { id: 'habitat', name: 'Habitat' },
    { id: 'brinquedo', name: 'Brinquedos' },
    { id: 'acessorio', name: 'Acessórios' },
  ]
};

// Get all categories
const allCategories: CategoryOption[] = Array.from(
  new Set(
    Object.values(categoriesByPetType)
      .flat()
      .map(cat => JSON.stringify(cat))
  )
).map(str => JSON.parse(str));

const Products: React.FC = () => {
  const { petType } = useParams<{ petType?: string }>();
  const validPetType = (petType as PetType) || 'dog';
  
  const [filters, setFilters] = useState<ProductFilter>({ 
    petType: validPetType as PetType 
  });
  const [filteredProducts, setFilteredProducts] = useState(getProductsByPetType(validPetType as PetType));
  
  // Update filtered products when filters change
  useEffect(() => {
    setFilteredProducts(filterProducts(filters));
  }, [filters]);
  
  // Update pet type filter when URL param changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, petType: validPetType as PetType }));
  }, [validPetType]);
  
  const getPetIcon = (type: PetType) => {
    switch (type) {
      case 'dog': return <Dog size={20} />;
      case 'cat': return <Cat size={20} />;
      case 'bird': return <Bird size={20} />;
      case 'rabbit': return <Rabbit size={20} />;
      case 'other': return <PawPrint size={20} />;
    }
  };
  
  const getPetName = (type: PetType) => {
    switch (type) {
      case 'dog': return 'Cachorros';
      case 'cat': return 'Gatos';
      case 'bird': return 'Pássaros';
      case 'rabbit': return 'Coelhos';
      case 'other': return 'Outros Pets';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Pet Type Tabs */}
      <Tabs defaultValue={validPetType} className="mb-6">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger 
            value="dog" 
            className="flex items-center gap-2 data-[state=active]:bg-petYellow/30" 
            asChild
          >
            <Link to="/produtos/dog" className="w-full flex items-center justify-center gap-2">
              <Dog size={16} />
              <span className="hidden md:inline">Cachorros</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger 
            value="cat" 
            className="flex items-center gap-2 data-[state=active]:bg-petYellow/30"
            asChild
          >
            <Link to="/produtos/cat" className="w-full flex items-center justify-center gap-2">
              <Cat size={16} />
              <span className="hidden md:inline">Gatos</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger 
            value="bird" 
            className="flex items-center gap-2 data-[state=active]:bg-petYellow/30"
            asChild
          >
            <Link to="/produtos/bird" className="w-full flex items-center justify-center gap-2">
              <Bird size={16} />
              <span className="hidden md:inline">Pássaros</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger 
            value="rabbit" 
            className="flex items-center gap-2 data-[state=active]:bg-petYellow/30"
            asChild
          >
            <Link to="/produtos/rabbit" className="w-full flex items-center justify-center gap-2">
              <Rabbit size={16} />
              <span className="hidden md:inline">Coelhos</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger 
            value="other" 
            className="flex items-center gap-2 data-[state=active]:bg-petYellow/30"
            asChild
          >
            <Link to="/produtos/other" className="w-full flex items-center justify-center gap-2">
              <PawPrint size={16} />
              <span className="hidden md:inline">Outros</span>
            </Link>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={validPetType} className="mt-0">
          <div className="flex items-center gap-2 mb-6">
            {getPetIcon(validPetType as PetType)}
            <h1 className="text-2xl font-bold text-petBrown">
              Produtos para {getPetName(validPetType as PetType)}
            </h1>
          </div>
          
          <ProductsFilter 
            filters={filters}
            onFiltersChange={setFilters}
            petType={validPetType as PetType}
            availableCategories={categoriesByPetType[validPetType as PetType]}
          />
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-petBrown mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-500 mb-4">
                Tente ajustar seus filtros ou buscar por outra categoria.
              </p>
              <Button 
                onClick={() => setFilters({ petType: validPetType as PetType })}
                className="bg-petOrange hover:bg-petOrange-dark text-white"
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Products;
