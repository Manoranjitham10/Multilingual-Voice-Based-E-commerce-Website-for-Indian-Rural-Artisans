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

interface Order {
  id: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  address: string;
}

export default function OrdersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('all');
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();

  const translations = {
    en: {
      title: 'Orders',
      backToDashboard: 'Back to Dashboard',
      allOrders: 'All Orders',
      pending: 'Pending',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      orderDetails: 'Order Details',
      customer: 'Customer',
      amount: 'Amount',
      status: 'Status',
      orderDate: 'Order Date',
      deliveryDate: 'Delivery Date',
      address: 'Address',
      updateStatus: 'Update Status',
      voiceCommand: 'Voice Command',
      listening: 'Listening...',
      startListening: 'Start Voice Command',
      noOrders: 'No orders found',
      markAsDelivered: 'Mark as Delivered',
      markAsShipped: 'Mark as Shipped',
      startProcessing: 'Start Processing',
      orderUpdated: 'Order status updated successfully!'
    },
    hi: {
      title: 'ऑर्डर',
      backToDashboard: 'डैशबोर्ड पर वापस जाएं',
      allOrders: 'सभी ऑर्डर',
      pending: 'लंबित',
      processing: 'प्रोसेसिंग',
      shipped: 'भेजा गया',
      delivered: 'डिलीवर हो गया',
      cancelled: 'रद्द',
      orderDetails: 'ऑर्डर विवरण',
      customer: 'ग्राहक',
      amount: 'राशि',
      status: 'स्थिति',
      orderDate: 'ऑर्डर दिनांक',
      deliveryDate: 'डिलीवरी दिनांक',
      address: 'पता',
      updateStatus: 'स्थिति अपडेट करें',
      voiceCommand: 'आवाज़ कमांड',
      listening: 'सुन रहा है...',
      startListening: 'आवाज़ कमांड शुरू करें',
      noOrders: 'कोई ऑर्डर नहीं मिला',
      markAsDelivered: 'डिलीवर के रूप में चिह्नित करें',
      markAsShipped: 'भेजा गया के रूप में चिह्नित करें',
      startProcessing: 'प्रोसेसिंग शुरू करें',
      orderUpdated: 'ऑर्डर स्थिति सफलतापूर्वक अपडेट हो गई!'
    },
    ta: {
      title: 'ஆர்டர்கள்',
      backToDashboard: 'டாஷ்போர்டுக்குத் திரும்பு',
      allOrders: 'அனைத்து ஆர்டர்கள்',
      pending: 'நிலுவையில்',
      processing: 'செயலாக்கம்',
      shipped: 'அனுப்பப்பட்டது',
      delivered: 'வழங்கப்பட்டது',
      cancelled: 'ரத்துசெய்யப்பட்டது',
      orderDetails: 'ஆர்டர் விவரங்கள்',
      customer: 'வாடிக்கையாளர்',
      amount: 'தொகை',
      status: 'நிலை',
      orderDate: 'ஆர்டர் தேதி',
      deliveryDate: 'டெலிவரி தேதி',
      address: 'முகவரி',
      updateStatus: 'நிலையை புதுப்பிக்கவும்',
      voiceCommand: 'குரல் கட்டளை',
      listening: 'கேட்கிறது...',
      startListening: 'குரல் கட்டளை தொடங்கு',
      noOrders: 'ஆர்டர்கள் இல்லை',
      markAsDelivered: 'வழங்கப்பட்டது என குறிக்கவும்',
      markAsShipped: 'அனுப்பப்பட்டது என குறிக்கவும்',
      startProcessing: 'செயலாக்கத்தைத் தொடங்கு',
      orderUpdated: 'ஆர்டர் நிலை வெற்றிகரமாக புதுப்பிக்கப்பட்டது!'
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      // Mock orders data
      setOrders([
        {
          id: 'ORD001',
          productName: 'Blue Clay Pot',
          customerName: 'Priya Sharma',
          customerPhone: '9876543210',
          amount: 150,
          status: 'pending',
          orderDate: '2024-12-15',
          address: '123 Main St, New Delhi'
        },
        {
          id: 'ORD002',
          productName: 'Handwoven Basket',
          customerName: 'Rajesh Kumar',
          customerPhone: '9876543211',
          amount: 200,
          status: 'processing',
          orderDate: '2024-12-14',
          address: '456 Park Ave, Mumbai'
        },
        {
          id: 'ORD003',
          productName: 'Wooden Craft',
          customerName: 'Meera Patel',
          customerPhone: '9876543212',
          amount: 300,
          status: 'shipped',
          orderDate: '2024-12-13',
          address: '789 Garden Rd, Bangalore'
        },
        {
          id: 'ORD004',
          productName: 'Silver Bracelet',
          customerName: 'Arjun Singh',
          customerPhone: '9876543213',
          amount: 500,
          status: 'delivered',
          orderDate: '2024-12-12',
          deliveryDate: '2024-12-15',
          address: '321 Lake View, Chennai'
        }
      ]);
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
        
        if (transcript.includes('pending') || transcript.includes('लंबित') || transcript.includes('நிலுவையில்')) {
          setFilter('pending');
        } else if (transcript.includes('delivered') || transcript.includes('डिलीवर') || transcript.includes('வழங்கப்பட்டது')) {
          setFilter('delivered');
        } else if (transcript.includes('shipped') || transcript.includes('भेजा') || transcript.includes('அனுப்பப்பட்டது')) {
          setFilter('shipped');
        } else if (transcript.includes('all') || transcript.includes('सभी') || transcript.includes('அனைத்து')) {
          setFilter('all');
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

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus as any } : order
    ));
    alert(t.orderUpdated);
  };

  const filteredOrders = orders.filter(order => 
    filter === 'all' || order.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                filter === 'all' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t.allOrders}
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                filter === 'pending' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t.pending}
            </button>
            <button
              onClick={() => setFilter('processing')}
              className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                filter === 'processing' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t.processing}
            </button>
            <button
              onClick={() => setFilter('shipped')}
              className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                filter === 'shipped' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t.shipped}
            </button>
            <button
              onClick={() => setFilter('delivered')}
              className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                filter === 'delivered' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t.delivered}
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
              {user.language === 'hi' ? 'कहें: "लंबित", "डिलीवर हो गया", "सभी ऑर्डर"' :
               user.language === 'ta' ? 'சொல்லுங்கள்: "நிலுவையில்", "வழங்கப்பட்டது", "அனைத்து ஆர்டர்கள்"' :
               'Say: "Pending", "Delivered", "All Orders"'}
            </p>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-shopping-cart-line text-gray-400 w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.noOrders}</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{order.productName}</h3>
                    <p className="text-sm text-gray-600">Order #{order.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {t[order.status as keyof typeof t]}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{t.customer}:</span>
                    <span className="text-sm font-medium text-gray-900">{order.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{t.amount}:</span>
                    <span className="text-sm font-bold text-green-600">₹{order.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{t.orderDate}:</span>
                    <span className="text-sm text-gray-900">{order.orderDate}</span>
                  </div>
                  {order.deliveryDate && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t.deliveryDate}:</span>
                      <span className="text-sm text-gray-900">{order.deliveryDate}</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">{t.address}:</p>
                  <p className="text-sm text-gray-900">{order.address}</p>
                </div>

                <div className="flex space-x-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'processing')}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap"
                    >
                      {t.startProcessing}
                    </button>
                  )}
                  {order.status === 'processing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'shipped')}
                      className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm whitespace-nowrap"
                    >
                      {t.markAsShipped}
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm whitespace-nowrap"
                    >
                      {t.markAsDelivered}
                    </button>
                  )}
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm whitespace-nowrap">
                    <i className="ri-phone-line w-4 h-4 flex items-center justify-center"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
