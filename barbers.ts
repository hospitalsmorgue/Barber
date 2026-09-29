export type Barber = {
  slug: string;
  name: string;
  neighborhood: string;
  city: string;
  address: string;
  rating: number;
  reviews: number;
  price: number;
  distance: number;
  specialties: string[];
  cover: string;
  avatar: string;
  verified: boolean;
  description: string;
  hours: string;
  phone: string;
};

export const barbers: Barber[] = [
  { slug: "casa-otavio", name: "Casa Otávio", neighborhood: "Pinheiros", city: "São Paulo", address: "Rua dos Pinheiros, 487", rating: 9.8, reviews: 248, price: 65, distance: 1.2, specialties: ["Fade", "Barba", "Degradê"], cover: "photo-1503951914875-452162b0f3f1", avatar: "photo-1585747860715-2ba37e788b70", verified: true, description: "Um espaço de cuidado e estilo no coração de Pinheiros. Técnica afiada, conversa boa e café passado na hora.", hours: "Ter a sáb · 09h às 20h", phone: "+5511998765432" },
  { slug: "barbearia-navalha", name: "Navalha & Cia.", neighborhood: "Vila Madalena", city: "São Paulo", address: "Rua Harmonia, 122", rating: 9.7, reviews: 186, price: 55, distance: 2.4, specialties: ["Barba completa", "Clássico", "Sobrancelha"], cover: "photo-1621605815971-fbc98d665033", avatar: "photo-1622287162716-f311baa1a2b8", verified: true, description: "Barbearia de bairro com alma, precisão e respeito à tradição. Seu ritual, do seu jeito.", hours: "Seg a sáb · 10h às 21h", phone: "+5511987654321" },
  { slug: "estudio-sete", name: "Estúdio Sete", neighborhood: "Jardins", city: "São Paulo", address: "Alameda Franca, 707", rating: 9.9, reviews: 92, price: 90, distance: 3.8, specialties: ["Degradê", "Design", "Corte autoral"], cover: "photo-1599351431202-1e0f0137899a", avatar: "photo-1503951914875-452162b0f3f1", verified: true, description: "Estética contemporânea e atendimento com hora marcada para quem leva o próprio estilo a sério.", hours: "Seg a sex · 09h às 19h", phone: "+5511976543210" },
  { slug: "barba-brava", name: "Barba Brava", neighborhood: "Moema", city: "São Paulo", address: "Av. Pavão, 362", rating: 9.6, reviews: 157, price: 70, distance: 5.1, specialties: ["Barba", "Fade", "Infantil"], cover: "photo-1512690459411-b9245aed614b", avatar: "photo-1621605815971-fbc98d665033", verified: true, description: "Corte bem feito, cerveja gelada e um time que entende que estilo é coisa pessoal.", hours: "Ter a dom · 10h às 20h", phone: "+5511965432109" },
  { slug: "dom-rafael", name: "Dom Rafael", neighborhood: "Leblon", city: "Rio de Janeiro", address: "Rua Dias Ferreira, 211", rating: 9.8, reviews: 203, price: 85, distance: 0.9, specialties: ["Clássico", "Barba completa", "Navalha"], cover: "photo-1621605815971-fbc98d665033", avatar: "photo-1512690459411-b9245aed614b", verified: true, description: "A barbearia carioca onde a elegância encontra o jeito leve de viver o Rio.", hours: "Seg a sáb · 09h às 20h", phone: "+5521998765432" },
  { slug: "corte-carioca", name: "Corte Carioca", neighborhood: "Botafogo", city: "Rio de Janeiro", address: "Rua Voluntários da Pátria, 190", rating: 9.7, reviews: 118, price: 60, distance: 2.6, specialties: ["Degradê", "Corte infantil", "Design"], cover: "photo-1620331311520-246422fd82f9", avatar: "photo-1622287162716-f311baa1a2b8", verified: false, description: "Cultura de rua, atendimento próximo e muito capricho em cada acabamento.", hours: "Seg a sáb · 10h às 19h", phone: "+5521987654321" },
  { slug: "senhor-barbado", name: "Senhor Barbado", neighborhood: "Savassi", city: "Belo Horizonte", address: "Rua Pernambuco, 845", rating: 9.6, reviews: 74, price: 58, distance: 1.8, specialties: ["Barba", "Fade", "Sobrancelha"], cover: "photo-1621605815971-fbc98d665033", avatar: "photo-1585747860715-2ba37e788b70", verified: true, description: "Um lugar para desacelerar, renovar o visual e sair se sentindo em casa.", hours: "Ter a sáb · 09h às 19h", phone: "+5531998765432" },
  { slug: "o-cavalheiro", name: "O Cavalheiro", neighborhood: "Batel", city: "Curitiba", address: "Al. Dr. Carlos de Carvalho, 810", rating: 9.5, reviews: 67, price: 75, distance: 3.3, specialties: ["Clássico", "Navalha", "Barba"], cover: "photo-1503951914875-452162b0f3f1", avatar: "photo-1599351431202-1e0f0137899a", verified: true, description: "Tradição curitibana, serviço impecável e atenção a cada detalhe.", hours: "Seg a sáb · 09h às 20h", phone: "+5541998765432" },
  { slug: "linha-fina", name: "Linha Fina", neighborhood: "Moinhos de Vento", city: "Porto Alegre", address: "Rua Padre Chagas, 310", rating: 9.4, reviews: 53, price: 68, distance: 2.1, specialties: ["Fade", "Design", "Barba"], cover: "photo-1621605815971-fbc98d665033", avatar: "photo-1621605815971-fbc98d665033", verified: false, description: "Precisão nos traços e personalidade em cada corte. Vem como você é.", hours: "Seg a sáb · 10h às 20h", phone: "+5551998765432" },
  { slug: "black-anchor", name: "Black Anchor", neighborhood: "Batel", city: "Curitiba", address: "Rua Bispo Dom José, 2211", rating: 9.3, reviews: 41, price: 80, distance: 4.2, specialties: ["Barba completa", "Clássico", "Fade"], cover: "photo-1512690459411-b9245aed614b", avatar: "photo-1585747860715-2ba37e788b70", verified: true, description: "Uma experiência premium sem cerimônia, feita por quem domina a navalha.", hours: "Ter a sáb · 10h às 21h", phone: "+5541987654321" },
  { slug: "bigode-club", name: "Bigode Club", neighborhood: "Funcionários", city: "Belo Horizonte", address: "Rua Alagoas, 1540", rating: 9.2, reviews: 38, price: 45, distance: 1.4, specialties: ["Corte infantil", "Fade", "Sobrancelha"], cover: "photo-1620331311520-246422fd82f9", avatar: "photo-1512690459411-b9245aed614b", verified: false, description: "Cortes atuais, preço honesto e aquele papo que melhora qualquer tarde.", hours: "Seg a sáb · 09h às 18h", phone: "+5531987654321" },
  { slug: "santo-corte", name: "Santo Corte", neighborhood: "Pinheiros", city: "São Paulo", address: "Rua Fradique Coutinho, 912", rating: 9.1, reviews: 29, price: 50, distance: 1.7, specialties: ["Degradê", "Corte autoral", "Barba"], cover: "photo-1599351431202-1e0f0137899a", avatar: "photo-1622287162716-f311baa1a2b8", verified: true, description: "Liberdade para testar, profissionais atentos e resultado sem deixar na sorte.", hours: "Ter a sáb · 10h às 20h", phone: "+5511954321098" }
];

export const hasBadge = (barber: Barber) => barber.rating >= 9.5 && barber.reviews >= 15;
export const imageUrl = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
