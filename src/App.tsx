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
    if (title.toLowerCase().includes('cropped')) {
      return '👗 Renove seu guarda-roupa com estilo e economia!';
    } else if (title.toLowerCase().includes('kit') && title.toLowerCase().includes('corporal')) {
      return '🛁 Cuide da sua pele com produtos especiais!';
    } else if (title.toLowerCase().includes('kit')) {
      return '✨ Aproveite este kit incrível por um preço especial!';
    }
    return '🌟 Aproveite esta oferta especial!';
  };

  const formatText = (text: string) => {
    try {
      // Extract product information using regex
      const priceRegex = /R\$\s*(\d+[.,]\d{2})\s*-\s*R\$\s*(\d+[.,]\d{2})/;
      const linkRegex = /(https:\/\/[^\s]+)/;
      const titleRegex = /em\s+(.*?)\s+por\s+R\$/;

      const priceMatch = text.match(priceRegex);
      const linkMatch = text.match(linkRegex);
      const titleMatch = text.match(titleRegex);

      if (!priceMatch || !linkMatch || !titleMatch) {
        return 'Formato de texto inválido. Certifique-se de incluir título, preços e link.';
      }

      const lowerPrice = priceMatch[1];
      const originalPrice = priceMatch[2];
      const cleanedLink = cleanShopeeLink(linkMatch[0]);
      const title = titleMatch[1].trim();
      const description = generateDescription(title);

      const formattedMessage = `🛍️ ${title}

${description}

❌ De R$ ${originalPrice}
✅ Por apenas R$ ${lowerPrice}

Compre aqui:
${cleanedLink}

❗Essa oferta pode acabar a qualquer momento`;

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
      </div>
    </div>
  );
}

export default App;