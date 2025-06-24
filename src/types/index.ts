export interface ManualData {
  numeroPedido: string;
  agencia: string;
  moeda: string;
  dataVenda: string;
  dataAprovacao: string;
  valorVenda: string;
  provedorGateway: string;
  tipoPagamento: string;
  numeroParcelas: string;
  taxaPagamento: string;
  dolarSite: string;
}

export interface ProductData {
  produto: string;
  categoriaItem: string;
  subcategoria: string;
  quantidadeDias: number;
  dataUtilizacaoInicio: string;
  dataUtilizacaoFinal: string;
  nomeCliente: string;
  margemJT: string;
  margemAG: string;
  classificacao: string;
  quantidade: number;
  categoria: string;
  valorNetAdulto: string;
}

export interface ProcessedRow {
  numeroPedido: string;
  origemPedido: string;
  tipoPedido: string;
  agencia: string;
  agenciaMae: string;
  moeda: string;
  dataVenda: string;
  dataAprovacao: string;
  nomeCompletoCliente: string;
  valorVenda: string;
  valorConferencia: string;
  margemAG: string;
  comissao: string;
  gateway: string;
  provedorGateway: string;
  tipoPagamento: string;
  numeroParcelas: string;
  contrato: string;
  taxaPagamento: string;
  netUS: string;
  comissaoFornecedor: string;
  totalNetUS: string;
  dolarSite: string;
  margemJT: string;
  produto: string;
  categoriaItem: string;
  quantidadeDias: number;
  dataUtilizacaoInicio: string;
  dataUtilizacaoFinal: string;
  classificacao: string;
  quantidade: number;
  categoria: string;
}