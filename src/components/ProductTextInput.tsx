import React from 'react';
import { FileText, Lightbulb } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onProcess: () => void;
  isProcessing: boolean;
}

export default function ProductTextInput({ value, onChange, onProcess, isProcessing }: Props) {
  const exampleText = `Ingressos

Dados do produto  
Produto: Roma: City Cart at Night Tour  
De: 23/09/2025  
Ate: 23/09/2025  
Quantidade adulto: 2  
Quantidade criança: 0  
Valor net adulto: R$ 160.00  
Valor net criança: R$ 0.00

Dados do Emissão  
Nome: Ana Carolina Friziera da Cruz  
Data de nascimento: 30/04/1982  
Ingresso: Roma: City Cart at Night Tour  
Categoria: Ingresso  
Subcategoria: 01  
Tipo de pessoa: Adulto

Margem Atual JT: 10  
Margem Atual Agência: 15`;

  const handleExampleClick = () => {
    onChange(exampleText);
  };

  return (
    <div className="bg-slate-50 rounded-xl shadow-lg p-6 mb-6 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-900 flex items-center">
          <FileText className="w-6 h-6 mr-3 text-blue-600" />
          Texto Informativo do Produto
        </h2>
        <button
          onClick={handleExampleClick}
          className="flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          Usar Exemplo
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-blue-700 mb-2">
          Cole aqui o texto com as informações do produto
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-64 px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none font-mono text-sm bg-white"
          placeholder="Cole o texto informativo aqui..."
        />
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-blue-600">
          {value.length} caracteres
        </p>
        <button
          onClick={onProcess}
          disabled={!value.trim() || isProcessing}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processando...
            </>
          ) : (
            'Processar Dados'
          )}
        </button>
      </div>
    </div>
  );
}