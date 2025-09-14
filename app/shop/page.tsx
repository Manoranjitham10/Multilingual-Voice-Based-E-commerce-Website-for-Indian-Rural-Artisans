'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  image: File | null;
  userId: string;
  createdAt: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);

  const translations = {
    en: {
      title: 'Chotti Ecommerce',
      subtitle: 'Handcrafted by Rural Artisans',
      search: 'Search products...',
      allProducts: 'All Products',
      categories: {
        all: 'All Categories',
        pottery: 'Pottery',
        textiles: 'Textiles & Weaving',
        woodwork: 'Woodwork',
        metalwork: 'Metalwork',
        jewelry: 'Jewelry',
        others: 'Others'
      },
      voiceSearch: 'Voice Search',
      listening: 'Listening...',
      noProducts: 'No products found',
      addToCart: 'Add to Cart',
      viewDetails: 'View Details',
      artisan: 'Artisan',
      price: 'Price'
    },
    hi: {
      title: 'छोटी ई-कॉमर्स',
      subtitle: 'ग्रामीण कारीगरों द्वारा हस्तनिर्मित',
      search: 'उत्पाद खोजें...',
      allProducts: 'सभी उत्पाद',
      categories: {
        all: 'सभी श्रेणियाँ',
        pottery: 'मिट्टी का काम',
        textiles: 'कपड़ा और बुनाई',
        woodwork: 'लकड़ी का काम',
        metalwork: 'धातु का काम',
        jewelry: 'आभूषण',
        others: 'अन्य'
      },
      voiceSearch: 'आवाज़ से खोजें',
      listening: 'सुन रहा है...',
      noProducts: 'कोई उत्पाद नहीं मिला',
      addToCart: 'कार्ट में जोड़ें',
      viewDetails: 'विवरण देखें',
      artisan: 'कारीगर',
      price: 'कीमत'
    },
    ta: {
      title: 'சிறு வணிகம்',
      subtitle: 'கிராமப்புற கைவினைஞர்களால் கையால் செய்யப்பட்ட',
      search: 'தயாரிப்புகளைத் தேடு...',
      allProducts: 'அனைத்து தயாரிப்புகள்',
      categories: {
        all: 'அனைத்து வகைகள்',
        pottery: 'மண்பாண்டம்',
        textiles: 'ஜவுளி & நெசவு',
        woodwork: 'மரவேலை',
        metalwork: 'உலோக வேலை',
        jewelry: 'நகைகள்',
        others: 'மற்றவை'
      },
      voiceSearch: 'குரல் தேடல்',
      listening: 'கேட்கிறது...',
      noProducts: 'தயாரிப்புகள் இல்லை',
      addToCart: 'கார்ட்டில் சேர்',
      viewDetails: 'விவரங்களைப் பார்',
      artisan: 'கைவினைஞர்',
      price: 'விலை'
    }
  };

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    
    // Check if customer is logged in
    const customerData = localStorage.getItem('customer');
    if (customerData) {
      const customer = JSON.parse(customerData);
      setLanguage(customer.language || 'en');
    }
  }, []);

  const t = translations[language as keyof typeof translations];

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
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

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-orange-600 mr-8" style={{ fontFamily: 'Pacifico' }}>
                {t.title}
              </h1>
              <nav className="hidden md:flex space-x-8">
                <Link href="/shop" className="text-gray-900 hover:text-orange-600 font-medium">
                  {t.allProducts}
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-orange-600">
                  About
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-orange-600">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-8"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ta">தமிழ்</option>
              </select>
              {localStorage.getItem('customer') ? (
                <div className="flex items-center space-x-3">
                  <Link href="/cart" className="text-gray-600 hover:text-orange-600">
                    <i className="ri-shopping-cart-line w-6 h-6 flex items-center justify-center"></i>
                  </Link>
                  <Link href="/customer-profile" className="text-gray-600 hover:text-orange-600">
                    <i className="ri-user-line w-6 h-6 flex items-center justify-center"></i>
                  </Link>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('customer');
                      window.location.reload();
                    }}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <i className="ri-logout-box-r-line w-6 h-6 flex items-center justify-center"></i>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/customer-login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                    {language === 'hi' ? 'ग्राहक लॉगिन' : 
                     language === 'ta' ? 'வாடிக்கையாளர் உள்நுழைவு' : 
                     'Customer Login'}
                  </Link>
                  <Link href="/login" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap">
                    {language === 'hi' ? 'कारीगर लॉगिन' : 
                     language === 'ta' ? 'கைவினைஞர் உள்நுழைவு' : 
                     'Artisan Login'}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">{t.subtitle}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === 'hi' ? 'भारत के गाँवों से आपके घर तक - प्रामाणिक हस्तशिल्प' :
             language === 'ta' ? 'இந்தியாவின் கிராமங்களில் இருந்து உங்கள் வீடு வரை - தூய கைவினைப் பொருட்கள்' :
             'From India\'s villages to your home - Authentic handcrafted treasures'}
          </p>
          <div className="flex justify-center">
            <div className="relative max-w-md w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.search}
                className="w-full px-4 py-3 pl-12 pr-16 text-gray-900 rounded-lg focus:ring-2 focus:ring-white focus:border-white"
              />
              <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
              <button
                onClick={handleVoiceSearch}
                disabled={isListening}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-md hover:bg-orange-700 disabled:opacity-50 whitespace-nowrap"
              >
                <i className="ri-mic-line w-4 h-4 flex items-center justify-center"></i>
              </button>
            </div>
          </div>
          {isListening && (
            <p className="mt-4 text-orange-100">{t.listening}</p>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(t.categories).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === key
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-search-line text-gray-400 w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.noProducts}</h3>
              <p className="text-gray-600">
                {language === 'hi' ? 'कृपया अपनी खोज बदलें या किसी अन्य श्रेणी का चयन करें' :
                 language === 'ta' ? 'தயவுசெய்து உங்கள் தேடலை மாற்றவும் அல்லது வேறு வகையைத் தேர்ந்தெடுக்கவும்' :
                 'Please try a different search or select another category'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-shadow">
                  <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-t-2xl overflow-hidden">
                    <img
                      src={`https://readdy.ai/api/search-image?query=beautiful%20handcrafted%20$%7Bproduct.name%7D%20$%7Bproduct.category%7D%20artisan%20made%20product%20on%20simple%20clean%20background%2C%20traditional%20craftsmanship%2C%20high%20quality%20detailed%20shot%2C%20warm%20lighting%2C%20rustic%20aesthetic%2C%20authentic%20handmade%20texture&width=400&height=300&seq=${product.id}&orientation=landscape`}
                      alt={product.name}
                      className="w-full h-48 object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                      <span className="text-sm text-gray-500">{t.artisan}: {product.userId}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium whitespace-nowrap">
                        {t.addToCart}
                      </button>
                      <Link 
                        href={`/product/${product.id}`}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center whitespace-nowrap"
                      >
                        {t.viewDetails}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Pacifico' }}>
                {t.title}
              </h3>
              <p className="text-gray-400">
                {language === 'hi' ? 'ग्रामीण कारीगरों के लिए आवाज़-आधारित ई-कॉमर्स प्लेटफॉर्म' :
                 language === 'ta' ? 'கிராமப்புற கைவினைஞர்களுக்கான குரல் சார்ந்த ई-காமர்ஸ் தளம்' :
                 'Voice-first e-commerce platform for rural artisans'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/shop" className="hover:text-white">Shop</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/login" className="hover:text-white">
                  {language === 'hi' ? 'कारीगर लॉगिन' : 
                   language === 'ta' ? 'கைவினைஞர் உள்நுழைவு' : 
                   'Artisan Login'}
                </Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/shop?category=pottery" className="hover:text-white">Pottery</Link></li>
                <li><Link href="/shop?category=textiles" className="hover:text-white">Textiles</Link></li>
                <li><Link href="/shop?category=woodwork" className="hover:text-white">Woodwork</Link></li>
                <li><Link href="/shop?category=jewelry" className="hover:text-white">Jewelry</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>Email: support@chotti.com</p>
                <p>Phone: +91 8888888888</p>
                <p>Address: New Delhi, India</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Chotti Ecommerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
