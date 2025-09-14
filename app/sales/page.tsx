'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  name: string;
  mobile: string;
  language: string;
  location: string;
  craft: string;
  isLoggedIn: boolean;
}

export default function SalesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();

  const translations = {
    en: {
      title: 'Sales Report',
      backToDashboard: 'Back to Dashboard',
      week: 'This Week',
      month: 'This Month',
      year: 'This Year',
      totalSales: 'Total Sales',
      totalOrders: 'Total Orders',
      avgOrderValue: 'Average Order Value',
      topProducts: 'Top Products',
      salesTrend: 'Sales Trend',
      voiceCommand: 'Voice Command',
      listening: 'Listening...',
      startListening: 'Start Voice Command',
      salesSummary: 'Sales Summary',
      productPerformance: 'Product Performance',
      recentTransactions: 'Recent Transactions'
    },
    hi: {
      title: 'बिक्री रिपोर्ट',
      backToDashboard: 'डैशबोर्ड पर वापस जाएं',
      week: 'इस सप्ताह',
      month: 'इस महीने',
      year: 'इस वर्ष',
      totalSales: 'कुल बिक्री',
      totalOrders: 'कुल ऑर्डर',
      avgOrderValue: 'औसत ऑर्डर मूल्य',
      topProducts: 'टॉप उत्पाद',
      salesTrend: 'बिक्री ट्रेंड',
      voiceCommand: 'आवाज़ कमांड',
      listening: 'सुन रहा है...',
      startListening: 'आवाज़ कमांड शुरू करें',
      salesSummary: 'बिक्री सारांश',
      productPerformance: 'उत्पाद प्रदर्शन',
      recentTransactions: 'हाल की लेनदेन'
    },
    ta: {
      title: 'விற்பனை அறிக்கை',
      backToDashboard: 'டாஷ்போர்டுக்குத் திரும்பு',
      week: 'இந்த வாரம்',
      month: 'இந்த மாதம்',
      year: 'இந்த வருடம்',
      totalSales: 'மொத்த விற்பனை',
      totalOrders: 'மொத்த ஆர்டர்கள்',
      avgOrderValue: 'சராசரி ஆர்டர் மதிப்பு',
      topProducts: 'டாப் தயாரிப்புகள்',
      salesTrend: 'விற்பனை போக்கு',
      voiceCommand: 'குரல் கட்டளை',
      listening: 'கேட்கிறது...',
      startListening: 'குரல் கட்டளை தொடங்கு',
      salesSummary: 'விற்பனை சுருக்கம்',
      productPerformance: 'தயாரிப்பு செயல்திறன்',
      recentTransactions: 'சமீபத்திய பரிவர்த்தனைகள்'
    }
  };

  const salesData = {
    week: {
      totalSales: 2560,
      totalOrders: 12,
      avgOrderValue: 213
    },
    month: {
      totalSales: 12800,
      totalOrders: 45,
      avgOrderValue: 284
    },
    year: {
      totalSales: 89600,
      totalOrders: 287,
      avgOrderValue: 312
    }
  };

  const topProducts = [
    { name: 'Blue Clay Pot', sales: 8, revenue: 1200 },
    { name: 'Handwoven Basket', sales: 6, revenue: 1200 },
    { name: 'Wooden Craft', sales: 4, revenue: 1200 },
    { name: 'Silver Bracelet', sales: 3, revenue: 1500 },
    { name: 'Ceramic Vase', sales: 2, revenue: 800 }
  ];

  const recentTransactions = [
    { id: 'TXN001', product: 'Blue Clay Pot', amount: 150, date: '2024-12-15' },
    { id: 'TXN002', product: 'Handwoven Basket', amount: 200, date: '2024-12-14' },
    { id: 'TXN003', product: 'Wooden Craft', amount: 300, date: '2024-12-13' },
    { id: 'TXN004', product: 'Silver Bracelet', amount: 500, date: '2024-12-12' },
    { id: 'TXN005', product: 'Ceramic Vase', amount: 250, date: '2024-12-11' }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const t = translations[user.language as keyof typeof translations];
  const currentData = salesData[selectedPeriod as keyof typeof salesData];

  const handleVoiceCommand = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = user.language === 'hi' ? 'hi-IN' : user.language === 'ta' ? 'ta-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        
        if (transcript.includes('week') || transcript.includes('सप्ताह') || transcript.includes('வாரம்')) {
          setSelectedPeriod('week');
        } else if (transcript.includes('month') || transcript.includes('महीना') || transcript.includes('மாதம்')) {
          setSelectedPeriod('month');
        } else if (transcript.includes('year') || transcript.includes('वर्ष') || transcript.includes('வருடம்')) {
          setSelectedPeriod('year');
        }

        // Voice feedback
        if ('speechSynthesis' in window) {
          const salesAmount = currentData.totalSales;
          const ordersCount = currentData.totalOrders;
          
          const feedbackText = user.language === 'hi' ? 
            `इस ${selectedPeriod === 'week' ? 'सप्ताह' : selectedPeriod === 'month' ? 'महीने' : 'वर्ष'} आपकी बिक्री ${salesAmount} रुपये है और ${ordersCount} ऑर्डर पूरे हुए हैं।` :
            user.language === 'ta' ? 
            `இந்த ${selectedPeriod === 'week' ? 'வாரம்' : selectedPeriod === 'month' ? 'மாதம்' : 'வருடம்'} உங்கள் விற்பனை ${salesAmount} ரூபாய் மற்றும் ${ordersCount} ஆர்டர்கள் நிறைவேறியுள்ளன.` :
            `This ${selectedPeriod} your sales are ₹${salesAmount} with ${ordersCount} orders completed.`;
          
          const utterance = new SpeechSynthesisUtterance(feedbackText);
          utterance.lang = user.language === 'hi' ? 'hi-IN' : user.language === 'ta' ? 'ta-IN' : 'en-US';
          speechSynthesis.speak(utterance);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
              ← {t.backToDashboard}
            </Link>
            <h1 className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'Pacifico' }}>
              {t.title}
            </h1>
            <div></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                selectedPeriod === 'week' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t.week}
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                selectedPeriod === 'month' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t.month}
            </button>
            <button
              onClick={() => setSelectedPeriod('year')}
              className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                selectedPeriod === 'year' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t.year}
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t.voiceCommand}</h3>
            <button
              onClick={handleVoiceCommand}
              disabled={isListening}
              className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-3 whitespace-nowrap"
            >
              <i className="ri-mic-line w-5 h-5 flex items-center justify-center"></i>
              {isListening ? t.listening : t.startListening}
            </button>
            <p className="text-sm text-gray-600 mt-2">
              {user.language === 'hi' ? 'कहें: "इस सप्ताह", "इस महीने", "इस वर्ष"' :
               user.language === 'ta' ? 'சொல்லுங்கள்: "இந்த வாரம்", "இந்த மாதம்", "இந்த வருடம்"' :
               'Say: "This week", "This month", "This year"'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.totalSales}</p>
                <p className="text-3xl font-bold text-green-600">₹{currentData.totalSales.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-rupee-circle-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.totalOrders}</p>
                <p className="text-3xl font-bold text-blue-600">{currentData.totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-shopping-cart-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.avgOrderValue}</p>
                <p className="text-3xl font-bold text-purple-600">₹{currentData.avgOrderValue}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-bar-chart-line text-purple-600 w-6 h-6 flex items-center justify-center"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t.topProducts}</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t.recentTransactions}</h3>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{transaction.product}</p>
                    <p className="text-sm text-gray-600">{transaction.id} - {transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{transaction.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
