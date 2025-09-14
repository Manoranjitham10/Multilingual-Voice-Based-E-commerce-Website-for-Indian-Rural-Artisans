'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string | null;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      title: 'Shopping Cart',
      emptyCart: 'Your cart is empty',
      continueShopping: 'Continue Shopping',
      total: 'Total',
      checkout: 'Checkout',
      remove: 'Remove',
      quantity: 'Quantity',
      backToShop: 'Back to Shop'
    },
    hi: {
      title: 'शॉपिंग कार्ट',
      emptyCart: 'आपकी कार्ट खाली है',
      continueShopping: 'खरीदारी जारी रखें',
      total: 'कुल',
      checkout: 'चेकआउट',
      remove: 'हटाएं',
      quantity: 'मात्रा',
      backToShop: 'दुकान पर वापस जाएं'
    },
    ta: {
      title: 'ஷாப்பிங் கார்ட்',
      emptyCart: 'உங்கள் கார்ட் காலியாக உள்ளது',
      continueShopping: 'கடைப்பிடித்தல் தொடர்க',
      total: 'மொத்தம்',
      checkout: 'செக் அவுட்',
      remove: 'அகற்று',
      quantity: 'அளவு',
      backToShop: 'கடைக்குத் திரும்பு'
    }
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    // Check if customer is logged in
    const customerData = localStorage.getItem('customer');
    if (customerData) {
      const customer = JSON.parse(customerData);
      setLanguage(customer.language || 'en');
    }
  }, []);

  const t = translations[language as keyof typeof translations];

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/shop" className="text-blue-600 hover:text-blue-700 font-medium">
                ← {t.backToShop}
              </Link>
              <h1 className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'Pacifico' }}>
                {t.title}
              </h1>
              <div></div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-shopping-cart-line text-gray-400 w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.emptyCart}</h2>
            <Link 
              href="/shop"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              {t.continueShopping}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/shop" className="text-blue-600 hover:text-blue-700 font-medium">
              ← {t.backToShop}
            </Link>
            <h1 className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'Pacifico' }}>
              {t.title}
            </h1>
            <div></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">{t.title}</h2>
              </div>
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <i className="ri-image-line text-gray-400 w-8 h-8 flex items-center justify-center"></i>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-orange-600 font-medium">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        <i className="ri-subtract-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        <i className="ri-add-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <i className="ri-delete-bin-line w-5 h-5 flex items-center justify-center"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.total}</h3>
              <div className="space-y-2 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>{t.total}</span>
                  <span>₹{getTotal()}</span>
                </div>
              </div>
              <button className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors font-medium mt-6">
                {t.checkout}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
