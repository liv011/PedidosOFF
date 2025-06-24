import React from 'react';
import { Eye, Download, FileSpreadsheet } from 'lucide-react';
import { ProcessedRow } from '../types';
import { exportToExcel, exportToCSV } from '../utils/excelExport';

interface Props {
  data: ProcessedRow[];
  onClear: () => void;
}

export default function ProcessedDataPreview({ data, onClear }: Props) {
  const handleExportExcel = () => {
    exportToExcel(data, `pedidos_off_${new Date().toISOString().split('T')[0]}`);
  };

  const handleExportCSV = () => {
    exportToCSV(data, `pedidos_off_${new Date().toISOString().split('T')[0]}`);
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-50 rounded-xl shadow-lg p-6 border border-blue-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-900 flex items-center">
          <Eye className="w-6 h-6 mr-3 text-blue-600" />
          Dados Processados
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={handleExportExcel}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Excel
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            CSV
          </button>
          <button
            onClick={onClear}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>

      <div className="mb-4 p-4 bg-blue-100 rounded-lg">
        <p className="text-blue-800 font-medium">
          {data.length} linha{data.length !== 1 ? 's' : ''} processada{data.length !== 1 ? 's' : ''}
        </p>
        <p className="text-blue-600 text-sm mt-1">
          Produtos únicos: {new Set(data.map(row => row.produto)).size}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded-lg">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-3 py-2 text-left text-blue-800 font-medium">Nº Pedido</th>
              <th className="px-3 py-2 text-left text-blue-800 font-medium">Produto</th>
              <th className="px-3 py-2 text-left text-blue-800 font-medium">Cliente</th>
              <th className="px-3 py-2 text-left text-blue-800 font-medium">Classificação</th>
              <th className="px-3 py-2 text-left text-blue-800 font-medium">Quantidade</th>
              <th className="px-3 py-2 text-left text-blue-800 font-medium">Data Início</th>
              <th className="px-3 py-2 text-left text-blue-800 font-medium">Data Final</th>
              <th className="px-3 py-2 text-left text-blue-800 font-medium">Categoria</th>
              <th className="px-3 py-2 text-left text-blue-800 font-medium">NET US</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-3 py-2 border-b border-gray-200">{row.numeroPedido}</td>
                <td className="px-3 py-2 border-b border-gray-200 max-w-xs truncate" title={row.produto}>
                  {row.produto}
                </td>
                <td className="px-3 py-2 border-b border-gray-200 max-w-xs truncate" title={row.nomeCompletoCliente}>
                  {row.nomeCompletoCliente}
                </td>
                <td className="px-3 py-2 border-b border-gray-200">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.classificacao === 'Adulto' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {row.classificacao}
                  </span>
                </td>
                <td className="px-3 py-2 border-b border-gray-200 text-center font-medium">
                  {row.quantidade}
                </td>
                <td className="px-3 py-2 border-b border-gray-200">{row.dataUtilizacaoInicio}</td>
                <td className="px-3 py-2 border-b border-gray-200">{row.dataUtilizacaoFinal}</td>
                <td className="px-3 py-2 border-b border-gray-200">{row.categoria}</td>
                <td className="px-3 py-2 border-b border-gray-200 font-medium text-green-700">
                  {row.netUS}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}