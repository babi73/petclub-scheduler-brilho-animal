
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { ShoppingCart, ArrowLeft, Star, Heart } from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import { toast } from 'sonner';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const { data: product, isLoading } = useProduct(productId || '');
  
  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} ${quantity > 1 ? 'itens adicionados' : 'item adicionado'} ao carrinho!`);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-petBrown mb-4">Carregando produto...</h2>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-petBrown mb-4">Produto não encontrado</h2>
          <Button onClick={() => navigate('/produtos')}>
            Voltar para Produtos
          </Button>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };
  
  const getPetIcon = (type: string) => {
    switch (type) {
      case 'dog': return '🐶';
      case 'cat': return '🐱';
      case 'bird': return '🦜';
      case 'rabbit': return '🐰';
      case 'other': return '🐾';
      default: return '';
    }
  };
  
  const getSizeLabel = (size?: string) => {
    switch (size) {
      case 'pequeno': return 'Pequeno';
      case 'medio': return 'Médio';
      case 'grande': return 'Grande';
      default: return 'Único';
    }
  };
  
  const getCategoryLabel = (category: string) => {
    const categoryLabels: Record<string, string> = {
      'racao': 'Ração',
      'coleira': 'Coleira',
      'brinquedo': 'Brinquedo',
      'cama': 'Cama',
      'acessorio': 'Acessório',
      'higiene': 'Higiene',
      'comedouro': 'Comedouro',
      'arranhador': 'Arranhador',
      'areia': 'Areia',
      'gaiola': 'Gaiola',
      'habitat': 'Habitat'
    };
    
    return categoryLabels[category] || category;
  };
  
  // Generate mock specifications based on product category
  const getProductSpecifications = () => {
    switch (product.category) {
      case 'racao':
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Composição</h3>
            <p>Proteína bruta (mín.): 26%</p>
            <p>Extrato etéreo (mín.): 12%</p>
            <p>Matéria fibrosa (máx.): 3%</p>
            <p>Matéria mineral (máx.): 7,5%</p>
            <p>Cálcio (máx.): 2%</p>
            <p>Fósforo (mín.): 0,8%</p>
            <p>Umidade (máx.): 10%</p>
            
            <h3 className="font-medium text-lg mt-6">Ingredientes</h3>
            <p>Farinha de vísceras de aves, milho integral moído, farinha de carne bovina, farelo de trigo, óleo de vísceras de aves, arroz quebrado, farelo de soja, gordura suína, levedura seca de cervejaria, polpa de beterraba, hidrolisado de fígado de frango e suíno, ácido propiônico, antioxidantes BHA e BHT, ácido cítrico, cloreto de sódio, cloreto de potássio, parede celular de levedura, fosfato bicálcico, vitaminas (A, D3, E, K3, B1, B2, B6, B12, C, biotina, niacina, ácido pantotênico, ácido fólico, cloreto de colina), minerais (sulfato de ferro, sulfato de cobre, óxido de manganês, óxido de zinco, iodato de cálcio, selenito de sódio), extrato de yucca.</p>
            
            <h3 className="font-medium text-lg mt-6">Modo de Uso</h3>
            <p>Administrar a quantidade diária recomendada dividida, preferencialmente, em duas refeições. As quantidades devem ser ajustadas de acordo com as características individuais do animal, condição corporal, nível de atividade e ambiente onde vive.</p>
            
            <table className="w-full mt-4 border-collapse">
              <thead>
                <tr className="bg-petYellow/20">
                  <th className="p-2 text-left">Peso do Animal</th>
                  <th className="p-2 text-left">Quantidade Diária</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">1kg a 5kg</td>
                  <td className="p-2">30g a 100g</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">5kg a 10kg</td>
                  <td className="p-2">100g a 160g</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">10kg a 20kg</td>
                  <td className="p-2">160g a 270g</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">20kg a 40kg</td>
                  <td className="p-2">270g a 440g</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      
      case 'brinquedo':
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Especificações</h3>
            <p><strong>Dimensões:</strong> 10cm x 6cm x 6cm</p>
            <p><strong>Material:</strong> Borracha atóxica</p>
            <p><strong>Peso:</strong> 150g</p>
            <p><strong>Cor:</strong> Diversas (enviadas conforme disponibilidade)</p>
            
            <h3 className="font-medium text-lg mt-6">Características</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Resistente à mordidas</li>
              <li>Flutuante</li>
              <li>Borda texturizada para limpeza dos dentes</li>
              <li>Estimula mastigação saudável</li>
              <li>Ajuda a aliviar o estresse e ansiedade do animal</li>
              <li>Dispenser de petiscos</li>
            </ul>
            
            <h3 className="font-medium text-lg mt-6">Recomendações de Uso</h3>
            <p>Ideal para brincadeiras interativas. Supervisione o uso do brinquedo para evitar que pedaços sejam ingeridos caso o produto seja danificado.</p>
          </div>
        );
      
      case 'cama':
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Especificações</h3>
            <p><strong>Dimensões:</strong> 60cm x 45cm x 15cm</p>
            <p><strong>Material externo:</strong> Poliéster de alta resistência</p>
            <p><strong>Material interno:</strong> Espuma ortopédica de alta densidade</p>
            <p><strong>Cores:</strong> Azul, Cinza, Bege (enviada conforme disponibilidade)</p>
            <p><strong>Peso:</strong> 1,2kg</p>
            
            <h3 className="font-medium text-lg mt-6">Características</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Base antiderrapante</li>
              <li>Capa removível e lavável</li>
              <li>Espuma com memória que não deforma com o uso</li>
              <li>Bordas elevadas para suporte da cabeça e pescoço</li>
              <li>Ideal para pets idosos ou com problemas articulares</li>
              <li>Fácil de limpar</li>
            </ul>
            
            <h3 className="font-medium text-lg mt-6">Instruções de Lavagem</h3>
            <p>Remova a capa externa. Lave à mão ou na máquina em ciclo delicado com água fria. Não usar alvejante. Secar à sombra. Não passar. Não lavar a espuma, apenas limpar com pano úmido quando necessário.</p>
          </div>
        );
      
      case 'comedouro':
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Especificações</h3>
            <p><strong>Capacidade:</strong> 2 litros</p>
            <p><strong>Dimensões:</strong> 20cm x 20cm x 15cm</p>
            <p><strong>Material:</strong> Plástico ABS de grau alimentício</p>
            <p><strong>Voltagem:</strong> Bivolt (110V/220V) ou versão USB</p>
            <p><strong>Potência:</strong> 2W</p>
            <p><strong>Comprimento do cabo:</strong> 1,5m</p>
            
            <h3 className="font-medium text-lg mt-6">Características</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Sistema de filtragem com carvão ativado</li>
              <li>Funcionamento silencioso (menos de 30dB)</li>
              <li>Bomba de água com 3 níveis de fluxo ajustáveis</li>
              <li>Indicador LED de nível de água baixo</li>
              <li>Base antiderrapante</li>
              <li>Fácil de desmontar e limpar</li>
              <li>Estimula o consumo de água</li>
            </ul>
            
            <h3 className="font-medium text-lg mt-6">Manutenção</h3>
            <p>Recomenda-se a limpeza completa semanalmente e a troca do filtro a cada 2-4 semanas, dependendo da qualidade da água e quantidade de animais utilizando o bebedouro.</p>
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Especificações</h3>
            <p><strong>Marca:</strong> {product.brand}</p>
            <p><strong>Categoria:</strong> {getCategoryLabel(product.category)}</p>
            <p><strong>Para:</strong> {product.petType.map(type => getPetIcon(type) + ' ').join(' ')}</p>
            {product.petSize && (
              <p><strong>Tamanho:</strong> {getSizeLabel(product.petSize)}</p>
            )}
            <p><strong>Estoque:</strong> {product.inStock} unidades</p>
            
            <h3 className="font-medium text-lg mt-6">Descrição</h3>
            <p>{product.description}</p>
          </div>
        );
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <Button 
        variant="ghost" 
        className="mb-4 text-petBrown"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} className="mr-2" />
        Voltar
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">Imagem do Produto</span>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-petYellow text-petBrown">Novo</Badge>
            )}
            {product.isPromotion && (
              <Badge className="bg-petOrange text-white">Promoção</Badge>
            )}
          </div>
          
          {/* Favorite button */}
          <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-petOrange">
            <Heart size={20} />
          </button>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 text-sm">{product.brand}</span>
            {product.petType.map(type => (
              <span key={type} className="text-sm">
                {getPetIcon(type)}
              </span>
            ))}
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-petBrown mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-1 mb-4">
            <Star className="text-petYellow fill-petYellow" size={18} />
            <Star className="text-petYellow fill-petYellow" size={18} />
            <Star className="text-petYellow fill-petYellow" size={18} />
            <Star className="text-petYellow fill-petYellow" size={18} />
            <Star className="text-gray-300" size={18} />
            <span className="text-sm text-gray-500 ml-1">(24 avaliações)</span>
          </div>
          
          <div className="mb-6">
            {product.isPromotion && product.promotionalPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-petOrange">
                  R$ {product.promotionalPrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-petOrange">
                R$ {product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Quantity selector and add to cart button */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <Button 
                size="icon"
                variant="outline"
                className="text-petBrown"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                size="icon"
                variant="outline"
                className="text-petBrown"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
              >
                +
              </Button>
            </div>
            
            <Button 
              className="bg-petOrange hover:bg-petOrange-dark text-white flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={20} className="mr-2" />
              Adicionar ao Carrinho
            </Button>
          </div>
          
          {/* Additional info */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Categoria:</span>
              <Badge variant="outline" className="text-xs">
                {getCategoryLabel(product.category)}
              </Badge>
            </div>
            
            {product.petSize && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Tamanho:</span>
                <Badge variant="outline" className="text-xs">
                  {getSizeLabel(product.petSize)}
                </Badge>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Para:</span>
              <div className="flex gap-1">
                {product.petType.map(type => (
                  <Badge key={type} variant="outline" className="text-xs">
                    {getPetIcon(type)}
                    {type === 'dog' && ' Cachorros'}
                    {type === 'cat' && ' Gatos'}
                    {type === 'bird' && ' Pássaros'}
                    {type === 'rabbit' && ' Coelhos'}
                    {type === 'other' && ' Outros'}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Disponibilidade:</span>
              <Badge className={`text-xs ${product.inStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.inStock > 0 ? `Em estoque (${product.inStock})` : 'Esgotado'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product details tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Especificações</TabsTrigger>
            <TabsTrigger value="shipping">Frete e Entrega</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="p-4 border rounded-md">
            {getProductSpecifications()}
          </TabsContent>
          
          <TabsContent value="shipping" className="p-4 border rounded-md">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Opções de Entrega</h3>
              
              <Card className="border-petYellow/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-petYellow/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-petOrange"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="M16.5 9.4 7.55 4.24"/><path d="M3.29 7 12 12l8.71-5"/><path d="M12 22V12"/><circle cx="18.5" cy="15.5" r="2.5"/><path d="M20.27 17.27 22 19"/></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-petBrown">Entrega Padrão</h4>
                      <p className="text-gray-600 text-sm mt-1">Entrega em 3 a 5 dias úteis</p>
                      <p className="text-petOrange font-medium mt-2">R$ 12,90</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-petYellow/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-petYellow/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-petOrange"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M9 9h6"/><path d="M9 15h6"/></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-petBrown">Retirada na Loja</h4>
                      <p className="text-gray-600 text-sm mt-1">Disponível para retirada em 1 dia útil</p>
                      <p className="text-green-600 font-medium mt-2">Grátis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-petYellow/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-petYellow/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-petOrange"><path d="M5 18c0 1 1 2 2 2h10c1 0 2-1 2-2"/><path d="M6 11V6c0-1 1-2 2-2h8c1 0 2 1 2 2v5"/><rect width="16" height="8" x="4" y="11" rx="1"/><path d="M8 11V9"/><path d="M16 11V9"/></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-petBrown">Entrega Expressa</h4>
                      <p className="text-gray-600 text-sm mt-1">Entrega no mesmo dia para pedidos até 12h</p>
                      <p className="text-petOrange font-medium mt-2">R$ 19,90</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <p className="text-sm text-gray-500 mt-4">
                * Frete grátis para compras acima de R$ 149,90.
                <br />
                * Os prazos de entrega são estimados e contados em dias úteis.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="p-4 border rounded-md">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg">Avaliações dos Clientes</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      <Star className="text-petYellow fill-petYellow" size={18} />
                      <Star className="text-petYellow fill-petYellow" size={18} />
                      <Star className="text-petYellow fill-petYellow" size={18} />
                      <Star className="text-petYellow fill-petYellow" size={18} />
                      <Star className="text-gray-300" size={18} />
                    </div>
                    <span className="ml-2 text-sm text-gray-600">4.0 de 5 (24 avaliações)</span>
                  </div>
                </div>
                <Button variant="outline" className="text-petBrown">Avaliar Produto</Button>
              </div>
              
              {/* Mock reviews */}
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <div className="flex">
                          <Star className="text-petYellow fill-petYellow" size={16} />
                          <Star className="text-petYellow fill-petYellow" size={16} />
                          <Star className="text-petYellow fill-petYellow" size={16} />
                          <Star className="text-petYellow fill-petYellow" size={16} />
                          <Star className="text-petYellow fill-petYellow" size={16} />
                        </div>
                        <h4 className="font-medium ml-2">Ana M.</h4>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">12/04/2023</p>
                      <p className="mt-2">Excelente produto! Meu pet adorou e a qualidade é superior à de outras marcas que já comprei.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <div className="flex">
                          <Star className="text-petYellow fill-petYellow" size={16} />
                          <Star className="text-petYellow fill-petYellow" size={16} />
                          <Star className="text-petYellow fill-petYellow" size={16} />
                          <Star className="text-petYellow fill-petYellow" size={16} />
                          <Star className="text-gray-300" size={16} />
                        </div>
                        <h4 className="font-medium ml-2">Carlos R.</h4>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">03/03/2023</p>
                      <p className="mt-2">Muito bom! Chegou rapidamente e meu cachorro adora. Só não dou 5 estrelas porque o preço está um pouco acima da média.</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <div className="flex">
                          <Star className="text-petYellow fill-petYellow" size={16} />
                          <Star className="text-petYellow fill-petYellow" size={16} />
                          <Star className="text-petYellow fill-petYellow" size={16} />
                          <Star className="text-gray-300" size={16} />
                          <Star className="text-gray-300" size={16} />
                        </div>
                        <h4 className="font-medium ml-2">Paulo T.</h4>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">15/02/2023</p>
                      <p className="mt-2">Produto razoável. Esperava mais durabilidade, mas meu pet é bastante ativo e destruiu em pouco tempo.</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full text-petBrown">
                  Ver Mais Avaliações
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related products section */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-petBrown mb-6">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* This would be populated with actual related products based on category, etc. */}
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Produtos relacionados
          </div>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Produtos relacionados
          </div>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Produtos relacionados
          </div>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Produtos relacionados
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
