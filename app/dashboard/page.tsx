
'use client';

import { useEffect, useState } from 'react';
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

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();

  const translations = {
    en: {
      dashboard: 'Dashboard',
      welcome: 'Welcome',
      yourStats: 'Your Stats',
      totalSales: 'Total Sales',
      orders: 'Orders',
      products: 'Products',
      quickActions: 'Quick Actions',
      addProduct: 'Add Product',
      viewOrders: 'View Orders',
      salesReport: 'Sales Report',
      voiceCommand: 'Voice Command',
      listening: 'Listening...',
      startListening: 'Start Voice Command',
      recentOrders: 'Recent Orders',
      noOrders: 'No orders yet',
      logout: 'Logout',
      profile: 'Profile',
      loading: 'Loading...'
    },
    hi: {
      dashboard: 'डैशबोर्ड',
      welcome: 'स्वागत',
      yourStats: 'आपके आंकड़े',
      totalSales: 'कुल बिक्री',
      orders: 'ऑर्डर',
      products: 'उत्पाद',
      quickActions: 'त्वरित कार्य',
      addProduct: 'उत्पाद जोड़ें',
      viewOrders: 'ऑर्डर देखें',
      salesReport: 'बिक्री रिपोर्ट',
      voiceCommand: 'आवाज़ कमांड',
      listening: 'सुन रहा है...',
      startListening: 'आवाज़ कमांड शुरू करें',
      recentOrders: 'हाल के ऑर्डर',
      noOrders: 'अभी तक कोई ऑर्डर नहीं',
      logout: 'लॉगआउट',
      profile: 'प्रोफाइल',
      loading: 'लोड हो रहा है...'
    },
    ta: {
      dashboard: 'டாஷ்போர்டு',
      welcome: 'வரவேற்பு',
      yourStats: 'உங்கள் புள்ளிவிவரங்கள்',
      totalSales: 'மொத்த விற்பனை',
      orders: 'ஆர்டர்கள்',
      products: 'தயாரிப்புகள்',
      quickActions: 'விரைவு செயல்கள்',
      addProduct: 'தயாரிப்பு சேர்',
      viewOrders: 'ஆர்டர்களைப் பார்',
      salesReport: 'விற்பனை அறிக்கை',
      voiceCommand: 'குரல் கட்டளை',
      listening: 'கேட்கிறது...',
      startListening: 'குரல் கட்டளை தொடங்கு',
      recentOrders: 'சமீபத்திய ஆர்டர்கள்',
      noOrders: 'இன்னும் ஆர்டர்கள் இல்லை',
      logout: 'வெளியேறு',
      profile: 'சுயவிவரம்',
      loading: 'ஏற்றுகிறது...'
    }
  };

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
        
        // Voice command routing
        if (transcript.includes('product') || transcript.includes('उत्पाद') || transcript.includes('தயாரிப்பு')) {
          router.push('/add-product');
        } else if (transcript.includes('order') || transcript.includes('ऑर्डर') || transcript.includes('ஆர்டர்')) {
          router.push('/orders');
        } else if (transcript.includes('sales') || transcript.includes('बिक्री') || transcript.includes('விற்பனை')) {
          router.push('/sales');
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'Pacifico' }}>
              Chotti Ecommerce
            </h1>
            <div className="flex items-center space-x-4">
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                {t.profile}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                {t.logout}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.dashboard}</h2>
          <p className="text-gray-600 text-lg">
            {t.welcome}, {user.name}! ({user.craft} - {user.location})
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.totalSales}</p>
                <p className="text-2xl font-bold text-green-600">₹2,560</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-rupee-circle-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.orders}</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-shopping-cart-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.products}</p>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-box-3-line text-purple-600 w-6 h-6 flex items-center justify-center"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t.quickActions}</h3>
            <div className="space-y-3">
              <Link 
                href="/add-product"
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center gap-3 whitespace-nowrap"
              >
                <i className="ri-add-circle-line w-5 h-5 flex items-center justify-center"></i>
                {t.addProduct}
              </Link>
              <Link 
                href="/orders"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-3 whitespace-nowrap"
              >
                <i className="ri-list-check-line w-5 h-5 flex items-center justify-center"></i>
                {t.viewOrders}
              </Link>
              <Link 
                href="/sales"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-3 whitespace-nowrap"
              >
                <i className="ri-bar-chart-line w-5 h-5 flex items-center justify-center"></i>
                {t.salesReport}
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t.voiceCommand}</h3>
            <button
              onClick={handleVoiceCommand}
              disabled={isListening}
              className="w-full bg-red-600 text-white py-4 px-6 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-3 whitespace-nowrap"
            >
              <i className="ri-mic-line w-6 h-6 flex items-center justify-center"></i>
              {isListening ? t.listening : t.startListening}
            </button>
            <p className="text-sm text-gray-600 mt-3 text-center">
              {user.language === 'hi' ? 'कहें: "उत्पाद जोड़ें", "ऑर्डर देखें", "बिक्री रिपोर्ट"' :
               user.language === 'ta' ? 'சொல்லுங்கள்: "தயாரிப்பு சேர்", "ஆர்டர்கள் பார்", "விற்பனை அறிக்கை"' :
               'Say: "Add Product", "View Orders", "Sales Report"'}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t.recentOrders}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Blue Clay Pot</p>
                <p className="text-sm text-gray-600">Order #001 - ₹150</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Delivered
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Handwoven Basket</p>
                <p className="text-sm text-gray-600">Order #002 - ₹200</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                Pending
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Wooden Craft</p>
                <p className="text-sm text-gray-600">Order #003 - ₹300</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Processing
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
