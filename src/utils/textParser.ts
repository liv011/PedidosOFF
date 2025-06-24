import { ProductData } from '../types';

// Famous car brands for detection
const CAR_BRANDS = [
  'TOYOTA', 'HONDA', 'FORD', 'CHEVROLET', 'NISSAN', 'HYUNDAI', 'KIA', 'VOLKSWAGEN',
  'BMW', 'MERCEDES', 'AUDI', 'LEXUS', 'MAZDA', 'SUBARU', 'JEEP', 'DODGE',
  'CHRYSLER', 'BUICK', 'CADILLAC', 'INFINITI'
];

export function parseProductText(text: string): ProductData[] {
  const products: ProductData[] = [];
  
  // Split by sections that start with category headers
  const sections = text.split(/(?=(?:Hotel|Ingressos|Casas|Carros)(?:\s|$))/g).filter(s => s.trim());

  // Find the first adult name from all sections to use as global client name
  let globalClientName = '';

  // First pass: find the first adult name
  for (const section of sections) {
    const lines = section.split('\n').map(l => l.trim()).filter(l => l);
    const pessoas: { nome: string; nascimento: string; tipo: string }[] = [];
    
    let currentPerson: { nome: string; nascimento: string; tipo: string } | null = null;
    
    for (const line of lines) {
      if (line.startsWith('Nome:')) {
        // Save previous person if exists
        if (currentPerson && currentPerson.nome) {
          pessoas.push({ ...currentPerson });
        }
        // Start new person
        currentPerson = {
          nome: line.replace('Nome:', '').trim(),
          nascimento: '',
          tipo: ''
        };
      } else if (line.startsWith('Data de nascimento:') && currentPerson) {
        currentPerson.nascimento = line.replace('Data de nascimento:', '').trim();
      } else if ((line.startsWith('Tipo de pessoa:') || line.startsWith('Tipo:')) && currentPerson) {
        currentPerson.tipo = line.replace('Tipo de pessoa:', '').replace('Tipo:', '').trim();
      }
    }
    
    // Don't forget the last person
    if (currentPerson && currentPerson.nome) {
      pessoas.push({ ...currentPerson });
    }
    
    // Find first adult
    const firstAdult = pessoas.find(p => p.tipo === 'Adulto');
    if (firstAdult && !globalClientName) {
      globalClientName = firstAdult.nome;
      break; // Found the first adult, stop searching
    }
  }

  // If no adult found, use the first person found
  if (!globalClientName) {
    for (const section of sections) {
      const lines = section.split('\n').map(l => l.trim()).filter(l => l);
      for (const line of lines) {
        if (line.startsWith('Nome:')) {
          globalClientName = line.replace('Nome:', '').trim();
          break;
        }
      }
      if (globalClientName) break;
    }
  }

  // Second pass: process each section
  sections.forEach((section) => {
    const lines = section.split('\n').map(l => l.trim()).filter(l => l);
    
    let produto = '';
    let categoria = '';
    let dataInicio = '';
    let dataFinal = '';
    let subcategoria = '';
    let margemJT = '';
    let margemAG = '';
    let valorNetAdulto = '';
    let valorNet = ''; // For hotels
    let sectionCategory = ''; // Hotel, Ingressos, etc.
    
    let quantidadeAdulto = 0;
    let quantidadeCrianca = 0;
    let quantidadeTotal = 0;
    let quantidadeQuartos = 0;

    // Detect section category from first line
    const firstLine = lines[0];
    if (firstLine && ['Hotel', 'Ingressos', 'Casas', 'Carros'].includes(firstLine)) {
      sectionCategory = firstLine;
    }

    lines.forEach(line => {
      if (line.startsWith('Produto:')) {
        produto = line.replace('Produto:', '').trim();
      } else if (line.startsWith('De:')) {
        dataInicio = line.replace('De:', '').trim();
      } else if (line.startsWith('Ate:')) {
        dataFinal = line.replace('Ate:', '').trim();
      } else if (line.startsWith('Quantidade adulto:')) {
        quantidadeAdulto = parseInt(line.replace('Quantidade adulto:', '').trim()) || 0;
      } else if (line.startsWith('Quantidade criança:')) {
        quantidadeCrianca = parseInt(line.replace('Quantidade criança:', '').trim()) || 0;
      } else if (line.startsWith('Quantidade total de pessoas:')) {
        quantidadeTotal = parseInt(line.replace('Quantidade total de pessoas:', '').trim()) || 0;
      } else if (line.startsWith('Quantidade de quartos:')) {
        quantidadeQuartos = parseInt(line.replace('Quantidade de quartos:', '').trim()) || 0;
      } else if (line.startsWith('Valor net adulto:')) {
        valorNetAdulto = formatNumber(line.replace('Valor net adulto:', '').replace('R$', '').replace('$', '').trim());
      } else if (line.startsWith('Valor net:')) {
        valorNet = formatNumber(line.replace('Valor net:', '').replace('R$', '').replace('$', '').trim());
      } else if (line.startsWith('Categoria:')) {
        categoria = line.replace('Categoria:', '').trim();
      } else if (line.startsWith('Subcategoria:')) {
        subcategoria = line.replace('Subcategoria:', '').trim();
      } else if (line.startsWith('Margem Atual JT:')) {
        margemJT = formatNumber(line.replace('Margem Atual JT:', '').trim());
      } else if (line.startsWith('Margem Atual Agência:')) {
        margemAG = formatNumber(line.replace('Margem Atual Agência:', '').trim());
      }
    });

    if (!produto) return; // Skip if no product found

    const quantidadeDias = parseInt(subcategoria) || 1;

    // Determine product type and category
    const produtoUpper = produto.toUpperCase();
    const categoriaUpper = categoria.toUpperCase();
    
    // Check if it's a car by brand detection or keywords
    const isCarByBrand = CAR_BRANDS.some(brand => produtoUpper.includes(brand));
    const isCarByKeyword = produtoUpper.includes('CARRO') || produtoUpper.includes('CAR') || 
                          categoriaUpper.includes('CARRO') || categoriaUpper.includes('CAR');
    const isCarro = isCarByBrand || isCarByKeyword;
    
    // Check if it's a hotel
    const isHotel = sectionCategory === 'Hotel' || 
                   produtoUpper.includes('HOTEL') || produtoUpper.includes('RESORT') || 
                   produtoUpper.includes('INN') || produtoUpper.includes('SUITE') ||
                   categoriaUpper.includes('HOTEL');

    // Determine final category for the "categoria" field based on section header
    let finalCategory = '';
    if (sectionCategory === 'Hotel' || isHotel) {
      finalCategory = 'Hotel';
    } else if (sectionCategory === 'Ingressos') {
      finalCategory = 'Ingresso';
    } else if (sectionCategory === 'Carros' || isCarro) {
      finalCategory = 'Carro';
    } else if (sectionCategory === 'Casas') {
      finalCategory = 'Casa';
    } else {
      // Fallback: try to detect from product name
      if (isHotel) {
        finalCategory = 'Hotel';
      } else if (isCarro) {
        finalCategory = 'Carro';
      } else {
        finalCategory = 'Ingresso'; // Default fallback
      }
    }

    if (isHotel) {
      // Hotel: always 1 person, always adult classification
      products.push({
        produto,
        categoriaItem: categoria,
        subcategoria,
        quantidadeDias,
        dataUtilizacaoInicio: formatDate(dataInicio),
        dataUtilizacaoFinal: formatDate(dataFinal),
        nomeCliente: globalClientName,
        margemJT,
        margemAG,
        classificacao: 'Adulto',
        quantidade: 1,
        categoria: finalCategory,
        valorNetAdulto: valorNet || valorNetAdulto
      });
    } else if (isCarro) {
      // Car: product name repeated in category item, total quantity, always adult
      products.push({
        produto,
        categoriaItem: produto, // Product name repeated in category item
        subcategoria,
        quantidadeDias,
        dataUtilizacaoInicio: formatDate(dataInicio),
        dataUtilizacaoFinal: formatDate(dataFinal),
        nomeCliente: globalClientName,
        margemJT,
        margemAG,
        classificacao: 'Adulto',
        quantidade: quantidadeAdulto + quantidadeCrianca || quantidadeTotal || 1,
        categoria: finalCategory,
        valorNetAdulto
      });
    } else {
      // Other products (tickets, houses, etc.): use original logic
      // Create line for adults if there are any
      if (quantidadeAdulto > 0) {
        products.push({
          produto,
          categoriaItem: categoria,
          subcategoria,
          quantidadeDias,
          dataUtilizacaoInicio: formatDate(dataInicio),
          dataUtilizacaoFinal: formatDate(dataFinal),
          nomeCliente: globalClientName,
          margemJT,
          margemAG,
          classificacao: 'Adulto',
          quantidade: quantidadeAdulto,
          categoria: finalCategory,
          valorNetAdulto
        });
      }

      // Create line for children if there are any
      if (quantidadeCrianca > 0) {
        products.push({
          produto,
          categoriaItem: categoria,
          subcategoria,
          quantidadeDias,
          dataUtilizacaoInicio: formatDate(dataInicio),
          dataUtilizacaoFinal: formatDate(dataFinal),
          nomeCliente: globalClientName,
          margemJT,
          margemAG,
          classificacao: 'Criança',
          quantidade: quantidadeCrianca,
          categoria: finalCategory,
          valorNetAdulto: '' // Children don't have net value
        });
      }
    }
  });

  return products;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  
  // Assume formato DD/MM/YYYY
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return `${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[2]}`;
  }
  
  return dateStr;
}

function formatNumber(numberStr: string): string {
  if (!numberStr) return '';
  
  // Remove any currency symbols and extra spaces
  let cleaned = numberStr.replace(/[R$\s]/g, '');
  
  // Replace dots with commas for decimal numbers (Brazilian format)
  // Only replace the last dot if it's followed by exactly 2 digits (decimal separator)
  const lastDotIndex = cleaned.lastIndexOf('.');
  if (lastDotIndex !== -1 && cleaned.length - lastDotIndex === 3) {
    // This is likely a decimal separator
    cleaned = cleaned.substring(0, lastDotIndex) + ',' + cleaned.substring(lastDotIndex + 1);
  }
  
  return cleaned;
}

export function getAgencyGroup(agency: string): string {
  const agencyUpper = agency.toUpperCase().trim();
  
  // G1 Agencies
  const g1Agencies = [
    'ONLI TRAVEL',
    'PLANEJE ORLANDO',
    'PARQUES DE ORLANDO',
    'RECEPTIVO EM ORLANDO',
    'ORLANDO NA MALA',
    'ESTAVAM PELO MUNDO',
    'SUNRISE',
    '3,2,1 GO! TIO DAN',
    'JORNADA FANTASTICA',
    'TURISMO NA FLORIDA',
    'ORLANDO COM CRIANÇAS'
  ];
  
  // G2 Agencies
  const g2Agencies = [
    'ORLANDO FAST PASS',
    'PDP TRIPS',
    '3C TRAVEL AGÊNCIA',
    'ORLANDO DO MEU JEITO',
    'DISNEY GUIA',
    'VIAJANDO C JÚ FLORES',
    'ORLANDO A DOIS',
    'MAGICAL TURISMO',
    'ORLANDICAS',
    'LÁ EM ORLANDO',
    '3,2,1 GO! TIO DAN',
    'ANDREZA DICA E INDICA',
    'DÓLAR NA BAGAGEM',
    'SONHO NA DISNEY',
    'ORLANDO DICAS',
    'NOVA MAGIA'
  ];
  
  // G4 Agencies
  const g4Agencies = [
    'ORLANDO ECONOMICO',
    'VIAJANDO BARATO PARA ORLANDO',
    'MAGIC TRAVEL'
  ];
  
  // Check exact matches first
  if (g1Agencies.includes(agencyUpper)) return 'G1';
  if (g2Agencies.includes(agencyUpper)) return 'G2';
  if (g4Agencies.includes(agencyUpper)) return 'G4';
  
  // Check partial matches for flexibility
  if (g1Agencies.some(a => agencyUpper.includes(a) || a.includes(agencyUpper))) return 'G1';
  if (g2Agencies.some(a => agencyUpper.includes(a) || a.includes(agencyUpper))) return 'G2';
  if (g4Agencies.some(a => agencyUpper.includes(a) || a.includes(agencyUpper))) return 'G4';
  
  // Default to G3 for any agency not found in other groups
  return 'G3';
}