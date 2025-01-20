import React, { useState } from 'react';
import { Megaphone, Wand2 } from 'lucide-react';

function App() {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');

  const cleanShopeeLink = (url: string) => {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      const baseUrl = urlObj.origin;
      return baseUrl + path;
    } catch (e) {
      return url;
    }
  };

  const generateDescription = (title: string): string => {
    const titleLower = title.toLowerCase();
    
    // Limpeza e Casa
    if (titleLower.includes('escova') && titleLower.includes('limpeza')) {
      return '🧹 ✨ Limpeza prática e eficiente para sua casa! 🏠 💫';
    } else if (titleLower.includes('aspirador')) {
      return '🧹 ✨ Mantenha sua casa sempre limpa! 🏠 ⚡';
    } else if (titleLower.includes('limpador') || titleLower.includes('multiuso')) {
      return '🧹 ✨ Praticidade na limpeza do seu dia a dia! 🏠 💫';
    }
    
    // Roupas
    else if (titleLower.includes('cropped')) {
      return '👗 👚 Renove seu guarda-roupa com estilo e economia! ✨ 💃';
    } else if (titleLower.includes('vestido')) {
      return '👗 ✨ Look perfeito para arrasar em qualquer ocasião! 💫 💃';
    } else if (titleLower.includes('calça') || titleLower.includes('calca')) {
      return '👖 ✨ Conforto e estilo em uma peça só! 🔝 💯';
    } else if (titleLower.includes('conjunto')) {
      return '👚 👖 Look completo por um preço incrível! ✨ 💯';
    }
    
    // Cosméticos e Cuidados
    else if (titleLower.includes('kit') && titleLower.includes('corporal')) {
      return '🛁 ✨ Cuide da sua pele com produtos especiais! 💆‍♀️ 🧴';
    } else if (titleLower.includes('perfume')) {
      return '🌸 ✨ Fragrância irresistível para seu dia! 💫 💝';
    } else if (titleLower.includes('maquiagem')) {
      return '💄 ✨ Realce sua beleza natural! 💋 ⭐';
    }
    
    // Acessórios
    else if (titleLower.includes('bolsa')) {
      return '👜 ✨ Estilo e praticidade em um só produto! 💫 🎀';
    } else if (titleLower.includes('colar') || titleLower.includes('brinco')) {
      return '💎 ✨ Brilhe com esse acessório incrível! 💫 💝';
    } else if (titleLower.includes('relógio') || titleLower.includes('relogio')) {
      return '⌚ ✨ Pontualidade com estilo! 💫 🔝';
    }
    
    // Eletrônicos
    else if (titleLower.includes('celular') || titleLower.includes('smartphone')) {
      return '📱 ✨ Tecnologia de ponta em suas mãos! 🔝 💫';
    } else if (titleLower.includes('fone')) {
      return '🎧 ✨ Qualidade sonora excepcional! 🎵 💯';
    }
    
    // Kits e Conjuntos Gerais
    else if (titleLower.includes('kit')) {
      return '✨ 🎁 Aproveite este kit incrível por um preço especial! 💫 💝';
    }
    
    // Casa e Decoração
    else if (titleLower.includes('casa') || titleLower.includes('decoração') || titleLower.includes('decoracao')) {
      return '🏠 ✨ Deixe sua casa ainda mais linda! 🎀 💝';
    }
    
    // Padrão para outros produtos
    return '🌟 ✨ Aproveite esta oferta especial! 💫 🔝';
  };

  const formatText = (text: string) => {
    try {
      // Novo padrão de regex para capturar diferentes formatos
      const priceRegex1 = /R\$\s*(\d+[.,]\d{2})\s*-\s*R\$\s*(\d+[.,]\d{2})/;
      const priceRegex2 = /por\s*R\$\s*(\d+[.,]\d{2})/i;
      const linkRegex = /(https:\/\/[^\s]+)/;
      const titleRegex1 = /em\s+(.*?)\s+por\s+R\$/;
      const titleRegex2 = /Dê uma olhada em\s+(.*?)\s+por\s+R\$/;

      const linkMatch = text.match(linkRegex);
      let title = '';
      let lowerPrice = '';
      let originalPrice = '';

      // Tenta encontrar o título usando os diferentes padrões
      const titleMatch1 = text.match(titleRegex1);
      const titleMatch2 = text.match(titleRegex2);
      if (titleMatch1) {
        title = titleMatch1[1].trim();
      } else if (titleMatch2) {
        title = titleMatch2[1].trim();
      }

      // Tenta encontrar os preços usando os diferentes padrões
      const priceMatch1 = text.match(priceRegex1);
      const priceMatch2 = text.match(priceRegex2);
      if (priceMatch1) {
        lowerPrice = priceMatch1[1];
        originalPrice = priceMatch1[2];
      } else if (priceMatch2) {
        lowerPrice = priceMatch2[1];
        // Se não houver preço original, aumentamos em 30% para criar um desconto
        const price = parseFloat(lowerPrice.replace(',', '.'));
        originalPrice = (price * 1.3).toFixed(2).replace('.', ',');
      }

      if (!title || !lowerPrice || !linkMatch) {
        return 'Formato de texto inválido. Certifique-se de incluir título, preço e link.';
      }

      const cleanedLink = cleanShopeeLink(linkMatch[0]);
      const description = generateDescription(title);

      const formattedMessage = `🛍️ ${title}

${description}

❌ De R$ ${originalPrice}
✅ Por apenas R$ ${lowerPrice}

Compre aqui:
${cleanedLink}

❗Essa oferta pode acabar a qualquer momento ⚡`;

      return formattedMessage;
    } catch (error) {
      return 'Erro ao formatar o texto. Verifique se o formato está correto.';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = formatText(inputText);
    setFormattedText(formatted);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Megaphone className="h-16 w-16 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Editor de Propaganda
          </h1>
          <p className="text-lg text-gray-600">
            Transforme seus links em anúncios atrativos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Texto Original
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-48 p-4 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Cole o texto original aqui..."
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  <Wand2 className="h-5 w-5" />
                  <span>Formatar Texto</span>
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Texto Formatado
              </label>
              <textarea
                value={formattedText}
                readOnly
                className="w-full h-48 p-4 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg resize-none"
              />
            </div>

            <div>
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <span>Copiar Texto</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            Versão BETA 1.0.0
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;