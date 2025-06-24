import * as XLSX from 'xlsx';
import { ProcessedRow } from '../types';

export function exportToExcel(data: ProcessedRow[], filename: string = 'pedidos_off') {
  const headers = [
    'N Pedido',
    'Origem Pedido',
    'Tipo Pedido',
    'Agencia',
    'Agencia mae',
    'Moeda',
    'Data Venda',
    'Data Aprovacao Venda',
    'Nome completo do cliente',
    'Valor',
    'Conferencia',
    'Margem AG',
    'Comissao',
    'Gateway',
    'Provedor Gateway',
    'Tipo Pagto',
    'Parcelas',
    'Contrato',
    'Taxa de Pagamento',
    'NET US',
    'Comissao Fornecedor',
    'Total NET US',
    'Dolar Site',
    'Margem JT',
    'Produto',
    'Categoria Item',
    'Qtde de dias',
    'Dt Utilizacao Início',
    'Dt Utilizacao Final',
    'Classificacao',
    'Qtde',
    'Categoria'
  ];

  const worksheetData = [
    headers,
    ...data.map(row => [
      row.numeroPedido,
      row.origemPedido,
      row.tipoPedido,
      row.agencia,
      row.agenciaMae,
      row.moeda,
      row.dataVenda,
      row.dataAprovacao,
      row.nomeCompletoCliente,
      row.valorVenda,
      row.valorConferencia,
      row.margemAG,
      row.comissao,
      row.gateway,
      row.provedorGateway,
      row.tipoPagamento,
      row.numeroParcelas,
      row.contrato,
      row.taxaPagamento,
      row.netUS,
      row.comissaoFornecedor,
      row.totalNetUS,
      row.dolarSite,
      row.margemJT,
      row.produto,
      row.categoriaItem,
      row.quantidadeDias,
      row.dataUtilizacaoInicio,
      row.dataUtilizacaoFinal,
      row.classificacao,
      row.quantidade,
      row.categoria
    ])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedidos Off');

  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

export function exportToCSV(data: ProcessedRow[], filename: string = 'pedidos_off') {
  const headers = [
    'N Pedido',
    'Origem Pedido',
    'Tipo Pedido',
    'Agencia',
    'Agencia mae',
    'Moeda',
    'Data Venda',
    'Data Aprovacao Venda',
    'Nome completo do cliente',
    'Valor',
    'Conferencia',
    'Margem AG',
    'Comissao',
    'Gateway',
    'Provedor Gateway',
    'Tipo Pagto',
    'Parcelas',
    'Contrato',
    'Taxa de Pagamento',
    'NET US',
    'Comissao Fornecedor',
    'Total NET US',
    'Dolar Site',
    'Margem JT',
    'Produto',
    'Categoria Item',
    'Qtde de dias',
    'Dt Utilizacao Início',
    'Dt Utilizacao Final',
    'Classificacao',
    'Qtde',
    'Categoria'
  ];

  const csvData = [
    headers,
    ...data.map(row => [
      row.numeroPedido,
      row.origemPedido,
      row.tipoPedido,
      row.agencia,
      row.agenciaMae,
      row.moeda,
      row.dataVenda,
      row.dataAprovacao,
      row.nomeCompletoCliente,
      row.valorVenda,
      row.valorConferencia,
      row.margemAG,
      row.comissao,
      row.gateway,
      row.provedorGateway,
      row.tipoPagamento,
      row.numeroParcelas,
      row.contrato,
      row.taxaPagamento,
      row.netUS,
      row.comissaoFornecedor,
      row.totalNetUS,
      row.dolarSite,
      row.margemJT,
      row.produto,
      row.categoriaItem,
      row.quantidadeDias,
      row.dataUtilizacaoInicio,
      row.dataUtilizacaoFinal,
      row.classificacao,
      row.quantidade,
      row.categoria
    ])
  ];

  const csvContent = csvData.map(row => 
    row.map(cell => `"${cell}"`).join(',')
  ).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
}