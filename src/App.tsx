import React, { useState } from 'react';
import { ShoppingBag, Settings } from 'lucide-react';
import ManualDataForm from './components/ManualDataForm';
import ProductTextInput from './components/ProductTextInput';
import ProcessedDataPreview from './components/ProcessedDataPreview';
import { ManualData, ProductData, ProcessedRow } from './types';
import { parseProductText, getAgencyGroup } from './utils/textParser';

const initialManualData: ManualData = {
  numeroPedido: '',
  agencia: '',
  moeda: '',
  dataVenda: '',
  dataAprovacao: '',
  valorVenda: '',
  provedorGateway: '',
  tipoPagamento: '',
  numeroParcelas: '',
  taxaPagamento: '',
  dolarSite: ''
};

export default function App() {
  const [manualData, setManualData] = useState<ManualData>(initialManualData);
  const [productText, setProductText] = useState('');
  const [processedData, setProcessedData] = useState<ProcessedRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatDateForDisplay = (dateStr: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const processData = async () => {
    if (!productText.trim()) return;

    setIsProcessing(true);
    
    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const products = parseProductText(productText);
      const agencyGroup = getAgencyGroup(manualData.agencia);
      
      const processed: ProcessedRow[] = products.map(product => ({
        numeroPedido: manualData.numeroPedido,
        origemPedido: 'Off', // Fixed value
        tipoPedido: 'Venda', // Fixed value
        agencia: manualData.agencia,
        agenciaMae: '', // Left blank for database formula
        moeda: manualData.moeda,
        dataVenda: formatDateForDisplay(manualData.dataVenda),
        dataAprovacao: formatDateForDisplay(manualData.dataAprovacao),
        nomeCompletoCliente: product.nomeCliente,
        valorVenda: manualData.valorVenda,
        valorConferencia: '', // Left blank for database formula
        margemAG: product.margemAG, // Extracted from text
        comissao: '', // Left blank for database formula
        gateway: 'Plug', // Fixed value
        provedorGateway: manualData.provedorGateway,
        tipoPagamento: manualData.tipoPagamento,
        numeroParcelas: manualData.numeroParcelas,
        contrato: agencyGroup, // Auto-filled with agency group
        taxaPagamento: manualData.taxaPagamento,
        netUS: product.valorNetAdulto, // From text (valor net adulto)
        comissaoFornecedor: '', // Left blank
        totalNetUS: '', // Left blank for database formula
        dolarSite: manualData.dolarSite,
        margemJT: product.margemJT,
        produto: product.produto,
        categoriaItem: product.categoriaItem,
        quantidadeDias: product.quantidadeDias,
        dataUtilizacaoInicio: product.dataUtilizacaoInicio,
        dataUtilizacaoFinal: product.dataUtilizacaoFinal,
        classificacao: product.classificacao,
        quantidade: product.quantidade,
        categoria: product.categoria
      }));

      setProcessedData(processed);
    } catch (error) {
      console.error('Erro ao processar dados:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearProcessedData = () => {
    setProcessedData([]);
    setProductText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
      {/* Header */}
      <header className="bg-slate-50 shadow-lg border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-blue-900">Pedidos Off</h1>
                <p className="text-blue-600">Sistema de Processamento de Pedidos</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                <span className="text-blue-700 font-medium">
                  {processedData.length} linha{processedData.length !== 1 ? 's' : ''} processada{processedData.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Manual Data Form */}
          <ManualDataForm 
            data={manualData} 
            onChange={setManualData} 
          />

          {/* Product Text Input */}
          <ProductTextInput
            value={productText}
            onChange={setProductText}
            onProcess={processData}
            isProcessing={isProcessing}
          />

          {/* Processed Data Preview */}
          <ProcessedDataPreview
            data={processedData}
            onClear={clearProcessedData}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-blue-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center text-blue-600">
            <Settings className="w-4 h-4 mr-2" />
            <span className="text-sm">Sistema desenvolvido para processamento automatizado de pedidos</span>
          </div>
        </div>
      </footer>
    </div>
  );
}