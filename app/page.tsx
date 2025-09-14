'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const router = useRouter();

  const translations = {
    en: {
      title: 'Chotti Ecommerce',
      subtitle: 'Voice-first e-commerce platform for rural artisans',
      description: 'Empowering rural artisans with technology. Buy authentic handcrafted products or sell your creations with voice commands.',
      customerLogin: 'Customer Login',
      artisanLogin: 'Artisan Login',
      shopNow: 'Shop Now',
      registerArtisan: 'Register as Artisan',
      customerDesc: 'Browse and buy authentic handcrafted products from rural artisans',
      artisanDesc: 'Sell your handcrafted products with voice commands in your language',
      features: 'Features',
      voiceFirst: 'Voice-First Interface',
      voiceFirstDesc: 'Use voice commands in Hindi, Tamil, and English',
      multiLanguage: 'Multi-Language Support',
      multiLanguageDesc: 'Complete support for 3 languages',
      authentic: 'Authentic Products',
      authenticDesc: 'Direct from rural artisans across India',
      easyToUse: 'Easy to Use',
      easyToUseDesc: 'Designed for users with limited tech experience',
      language: 'Language'
    },
    hi: {
      title: 'छोटी ई-कॉमर्स',
      subtitle: 'ग्रामीण कारीगरों के लिए आवाज़-पहले ई-कॉमर्स प्लेटफॉर्म',
      description: 'ग्रामीण कारीगरों को तकनीक से सशक्त बनाना। प्रामाणिक हस्तशिल्प उत्पाद खरीदें या आवाज़ कमांड से अपनी रचनाएं बेचें।',
      customerLogin: 'ग्राहक लॉगिन',
      artisanLogin: 'कारीगर लॉगिन',
      shopNow: 'अभी खरीदारी करें',
      registerArtisan: 'कारीगर के रूप में पंजीकरण करें',
      customerDesc: 'ग्रामीण कारीगरों से प्रामाणिक हस्तशिल्प उत्पाद ब्राउज़ करें और खरीदें',
      artisanDesc: 'अपनी भाषा में आवाज़ कमांड से अपने हस्तशिल्प उत्पाद बेचें',
      features: 'विशेषताएं',
      voiceFirst: 'आवाज़-पहले इंटरफ़ेस',
      voiceFirstDesc: 'हिंदी, तमिल और अंग्रेजी में आवाज़ कमांड का उपयोग करें',
      multiLanguage: 'बहु-भाषा समर्थन',
      multiLanguageDesc: '3 भाषाओं के लिए पूर्ण समर्थन',
      authentic: 'प्रामाणिक उत्पाद',
      authenticDesc: 'सीधे भारत भर के ग्रामीण कारीगरों से',
      easyToUse: 'उपयोग में आसान',
      easyToUseDesc: 'सीमित तकनीकी अनुभव वाले उपयोगकर्ताओं के लिए डिज़ाइन किया गया',
      language: 'भाषा'
    },
    ta: {
      title: 'சிறு வணிகம்',
      subtitle: 'கிராமப்புற கைவினைஞர்களுக்கான குரல்-முதல் ஈ-காமர்ஸ் தளம்',
      description: 'கிராமப்புற கைவினைஞர்களை தொழில்நுட்பத்துடன் மேம்படுத்துதல். உண்மையான கைவினை பொருட்களை வாங்குங்கள் அல்லது குரல் கட்டளைகளால் உங்கள் படைப்புகளை விற்பனை செய்யுங்கள்.',
      customerLogin: 'வாடிக்கையாளர் உள்நுழைவு',
      artisanLogin: 'கைவினைஞர் உள்நுழைவு',
      shopNow: 'இப்போது வாங்கு',
      registerArtisan: 'கைவினைஞராக பதிவு செய்யுங்கள்',
      customerDesc: 'கிராமப்புற கைவினைஞர்களிடமிருந்து உண்மையான கைவினை பொருட்களை உலாவுங்கள் மற்றும் வாங்குங்கள்',
      artisanDesc: 'உங்கள் மொழியில் குரல் கட்டளைகளால் உங்கள் கைவினை பொருட்களை விற்பனை செய்யுங்கள்',
      features: 'அம்சங்கள்',
      voiceFirst: 'குரல்-முதல் இடைமுகம்',
      voiceFirstDesc: 'இந்தி, தமிழ் மற்றும் ஆங்கிலத்தில் குரல் கட்டளைகளைப் பயன்படுத்துங்கள்',
      multiLanguage: 'பல மொழி ஆதரவு',
      multiLanguageDesc: '3 மொழிகளுக்கு முழுமையான ஆதரவு',
      authentic: 'உண்மையான பொருட்கள்',
      authenticDesc: 'இந்தியா முழுவதும் உள்ள கிராமப்புற கைவினைஞர்களிடமிருந்து நேரடியாக',
      easyToUse: 'பயன்படுத்த எளிதானது',
      easyToUseDesc: 'மட்டுப்படுத்தப்பட்ட தொழில்நுட்ப அனுபவம் உள்ள பயனர்களுக்காக வடிவமைக்கப்பட்டது',
      language: 'மொழி'
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      router.push('/dashboard');
    }
  }, [router]);

  const t = translations[selectedLanguage as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'Pacifico' }}>
                {t.title}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-8"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ta">தமிழ்</option>
              </select>
              <Link
                href="/shop"
                className="text-orange-600 hover:text-orange-700 font-medium whitespace-nowrap"
              >
                {t.shopNow}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20Indian%20rural%20artisan%20working%20on%20traditional%20handicrafts%20in%20a%20vibrant%20workshop%20with%20clay%20pots%2C%20wooden%20crafts%2C%20and%20textiles%2C%20warm%20lighting%2C%20authentic%20cultural%20atmosphere%2C%20skilled%20hands%20creating%20beautiful%20handmade%20products%2C%20colorful%20traditional%20Indian%20art%20background&width=1200&height=800&seq=hero-main&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-5xl font-bold mb-6 leading-tight">{t.title}</h2>
              <p className="text-xl mb-4 text-orange-100">{t.subtitle}</p>
              <p className="text-lg mb-8 text-orange-50">{t.description}</p>
              
              <div className="flex items-center space-x-2 mb-8">
                <div className="flex items-center">
                  <i className="ri-mic-line text-orange-300 w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-orange-200 ml-2">Voice Commands</span>
                </div>
                <div className="w-1 h-1 bg-orange-300 rounded-full"></div>
                <div className="flex items-center">
                  <i className="ri-global-line text-orange-300 w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-orange-200 ml-2">3 Languages</span>
                </div>
                <div className="w-1 h-1 bg-orange-300 rounded-full"></div>
                <div className="flex items-center">
                  <i className="ri-hand-heart-line text-orange-300 w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-orange-200 ml-2">Authentic Crafts</span>
                </div>
              </div>
            </div>
            
            <div className="lg:ml-8">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Path</h3>
                
                <div className="space-y-6">
                  {/* Customer Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="ri-shopping-cart-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">Customer</h4>
                        <p className="text-sm text-gray-600">{t.customerDesc}</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        href="/shop"
                        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center whitespace-nowrap"
                      >
                        {t.shopNow}
                      </Link>
                      <Link
                        href="/customer-login"
                        className="flex-1 bg-white text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium text-center border border-blue-200 whitespace-nowrap"
                      >
                        {t.customerLogin}
                      </Link>
                    </div>
                  </div>

                  {/* Artisan Section */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <i className="ri-palette-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">Artisan</h4>
                        <p className="text-sm text-gray-600">{t.artisanDesc}</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        href="/login"
                        className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-center whitespace-nowrap"
                      >
                        {t.artisanLogin}
                      </Link>
                      <Link
                        href="/register"
                        className="flex-1 bg-white text-green-600 py-3 px-4 rounded-lg hover:bg-green-50 transition-colors font-medium text-center border border-green-200 whitespace-nowrap"
                      >
                        {t.registerArtisan}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.features}</h2>
            <p className="text-xl text-gray-600">Why choose Chotti Ecommerce?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-pink-50 border border-red-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-mic-line text-red-600 w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.voiceFirst}</h3>
              <p className="text-gray-600">{t.voiceFirstDesc}</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-global-line text-purple-600 w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.multiLanguage}</h3>
              <p className="text-gray-600">{t.multiLanguageDesc}</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-100">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-hand-heart-line text-orange-600 w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.authentic}</h3>
              <p className="text-gray-600">{t.authenticDesc}</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-smile-line text-green-600 w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.easyToUse}</h3>
              <p className="text-gray-600">{t.easyToUseDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start?</h2>
          <p className="text-xl text-orange-100 mb-8">Join thousands of artisans and customers already using our platform</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-white text-orange-600 py-4 px-8 rounded-lg hover:bg-orange-50 transition-colors font-bold text-lg whitespace-nowrap"
            >
              <i className="ri-shopping-cart-line w-5 h-5 flex items-center justify-center inline mr-2"></i>
              Shop Authentic Crafts
            </Link>
            <Link
              href="/register"
              className="bg-orange-600 text-white py-4 px-8 rounded-lg hover:bg-orange-700 transition-colors font-bold text-lg border-2 border-white whitespace-nowrap"
            >
              <i className="ri-palette-line w-5 h-5 flex items-center justify-center inline mr-2"></i>
              Start Selling Today
            </Link>
          </div>
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
              <p className="text-gray-400">Empowering rural artisans through technology</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/shop" className="hover:text-white">Browse Products</Link></li>
                <li><Link href="/customer-login" className="hover:text-white">
                  {selectedLanguage === 'hi' ? 'ग्राहक लॉगिन' : 
                   selectedLanguage === 'ta' ? 'வாடிக்கையாளர் உள்நுழைவு' : 
                   'Customer Login'}
                </Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Artisans</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white">
                  {selectedLanguage === 'hi' ? 'कारीगर लॉगिन' : 
                   selectedLanguage === 'ta' ? 'கைவினைஞர் உள்நுழைவு' : 
                   'Artisan Login'}
                </Link></li>
                <li><Link href="/register" className="hover:text-white">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><span>Voice Help Available</span></li>
                <li><span>Multi-Language Support</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Chotti Ecommerce. Made with ❤️ for rural artisans.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}