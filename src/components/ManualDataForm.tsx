import React from 'react';
import { ManualData } from '../types';
import { getAgencyGroup } from '../utils/textParser';

interface Props {
  data: ManualData;
  onChange: (data: ManualData) => void;
}

export default function ManualDataForm({ data, onChange }: Props) {
  const handleChange = (field: keyof ManualData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-slate-50 rounded-xl shadow-lg p-6 mb-6 border border-blue-200">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
        Dados Manuais do Pedido
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Nº do Pedido
          </label>
          <input
            type="text"
            value={data.numeroPedido}
            onChange={(e) => handleChange('numeroPedido', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            placeholder="Digite aqui..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Agência
          </label>
          <input
            type="text"
            value={data.agencia}
            onChange={(e) => handleChange('agencia', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            placeholder="Nome da agência"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Moeda
          </label>
          <select
            value={data.moeda}
            onChange={(e) => handleChange('moeda', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Selecione...</option>
            <option value="BRL">BRL</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Data da Venda
          </label>
          <input
            type="date"
            value={data.dataVenda}
            onChange={(e) => handleChange('dataVenda', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            placeholder="dd/mm/aaaa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Data de Aprovação
          </label>
          <input
            type="date"
            value={data.dataAprovacao}
            onChange={(e) => handleChange('dataAprovacao', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            placeholder="dd/mm/aaaa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Valor da Venda
          </label>
          <input
            type="number"
            step="0.01"
            value={data.valorVenda}
            onChange={(e) => handleChange('valorVenda', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Provedor do Gateway
          </label>
          <input
            type="text"
            value={data.provedorGateway}
            onChange={(e) => handleChange('provedorGateway', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            placeholder="Digite aqui..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Tipo de Pagamento
          </label>
          <select
            value={data.tipoPagamento}
            onChange={(e) => handleChange('tipoPagamento', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Selecione...</option>
            <option value="Cartão">Cartão</option>
            <option value="Boleto">Boleto</option>
            <option value="Pix">Pix</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Número de Parcelas
          </label>
          <input
            type="number"
            value={data.numeroParcelas}
            onChange={(e) => handleChange('numeroParcelas', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            placeholder="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Taxa de Pagamento (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={data.taxaPagamento}
            onChange={(e) => handleChange('taxaPagamento', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Dólar do Site
          </label>
          <input
            type="number"
            step="0.0001"
            value={data.dolarSite}
            onChange={(e) => handleChange('dolarSite', e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            placeholder="0.0000"
          />
        </div>
      </div>
    </div>
  );
}