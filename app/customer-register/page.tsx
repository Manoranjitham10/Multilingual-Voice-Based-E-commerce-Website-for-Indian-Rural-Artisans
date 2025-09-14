'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CustomerRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    language: 'en',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const router = useRouter();

  const translations = {
    en: {
      title: 'Customer Registration',
      subtitle: 'Join Chotti Ecommerce Community',
      name: 'Full Name',
      mobile: 'Mobile Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      address: 'Delivery Address',
      language: 'Preferred Language',
      register: 'Register',
      login: 'Already have account? Login',
      voiceInput: 'Voice Input',
      listening: 'Listening...',
      startVoiceInput: 'Start Voice Input',
      namePlaceholder: 'Enter your full name',
      mobilePlaceholder: 'Enter 10-digit mobile number',
      passwordPlaceholder: 'Enter password',
      confirmPasswordPlaceholder: 'Confirm your password',
      addressPlaceholder: 'Enter your delivery address',
      registerSuccess: 'Registration successful!',
      passwordMismatch: 'Passwords do not match',
      invalidData: 'Please fill all fields correctly',
      backToHome: 'Back to Home'
    },
    hi: {
      title: 'ग्राहक पंजीकरण',
      subtitle: 'छोटी ई-कॉमर्स समुदाय में शामिल हों',
      name: 'पूरा नाम',
      mobile: 'मोबाइल नंबर',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      address: 'डिलीवरी पता',
      language: 'पसंदीदा भाषा',
      register: 'रजिस्टर करें',
      login: 'पहले से खाता है? लॉगिन करें',
      voiceInput: 'आवाज़ इनपुट',
      listening: 'सुन रहा है...',
      startVoiceInput: 'आवाज़ इनपुट शुरू करें',
      namePlaceholder: 'अपना पूरा नाम डालें',
      mobilePlaceholder: '10 अंकों का मोबाइल नंबर डालें',
      passwordPlaceholder: 'पासवर्ड डालें',
      confirmPasswordPlaceholder: 'अपने पासवर्ड की पुष्टि करें',
      addressPlaceholder: 'अपना डिलीवरी पता डालें',
      registerSuccess: 'रजिस्ट्रेशन सफल!',
      passwordMismatch: 'पासवर्ड मेल नहीं खाते',
      invalidData: 'कृपया सभी फील्ड सही तरीके से भरें',
      backToHome: 'होम पर वापस जाएं'
    },
    ta: {
      title: 'வாடிக்கையாளர் பதிவு',
      subtitle: 'சிறு வணிக சமூகத்தில் சேருங்கள்',
      name: 'முழு பெயர்',
      mobile: 'மொபைல் எண்',
      password: 'கடவுச்சொல்',
      confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
      address: 'டெலிவரி முகவரி',
      language: 'விருப்பமான மொழி',
      register: 'பதிவு செய்',
      login: 'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக',
      voiceInput: 'குரல் உள்ளீடு',
      listening: 'கேட்கிறது...',
      startVoiceInput: 'குரல் உள்ளீடு தொடங்கு',
      namePlaceholder: 'உங்கள் முழு பெயரை உள்ளிடவும்',
      mobilePlaceholder: '10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
      passwordPlaceholder: 'கடவுச்சொல்லை உள்ளிடவும்',
      confirmPasswordPlaceholder: 'உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்',
      addressPlaceholder: 'உங்கள் டெலிவரி முகவரியை உள்ளிடவும்',
      registerSuccess: 'பதிவு வெற்றிகரம்!',
      passwordMismatch: 'கடவுச்சொற்கள் பொருந்தவில்லை',
      invalidData: 'அனைத்து புலங்களையும் சரியாக நிரப்பவும்',
      backToHome: 'முகப்புக்குத் திரும்பு'
    }
  };

  const t = translations[formData.language as keyof typeof translations];

  const handleVoiceInput = (field: string) => {
    // Don't allow voice input for sensitive fields
    if (field === 'mobile' || field === 'password' || field === 'confirmPassword') {
      return;
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = formData.language === 'hi' ? 'hi-IN' : formData.language === 'ta' ? 'ta-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setCurrentField(field);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setFormData(prev => ({
          ...prev,
          [field]: transcript
        }));
        
        // Stop listening immediately to prevent feedback loop
        recognition.stop();
      };

      recognition.onerror = () => {
        setIsListening(false);
        setCurrentField('');
      };

      recognition.onend = () => {
        setIsListening(false);
        setCurrentField('');
      };

      recognition.start();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validation
      if (formData.mobile.length !== 10 || !/^[0-9]+$/.test(formData.mobile)) {
        throw new Error(t.invalidData);
      }
      
      if (formData.password !== formData.confirmPassword) {
        throw new Error(t.passwordMismatch);
      }

      if (formData.password.length < 4) {
        throw new Error(t.invalidData);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store customer data
      localStorage.setItem('customer', JSON.stringify({
        name: formData.name,
        mobile: formData.mobile,
        language: formData.language,
        address: formData.address,
        isLoggedIn: true,
        type: 'customer'
      }));

      router.push('/shop');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4 text-blue-600 hover:text-blue-700 font-medium">
            ← {t.backToHome}
          </Link>
          <h1 className="text-4xl font-bold text-blue-600 mb-2" style={{ fontFamily: 'Pacifico' }}>
            {t.title}
          </h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.language}
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.name}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder={t.namePlaceholder}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleVoiceInput('name')}
                    disabled={isListening && currentField === 'name'}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      isListening && currentField === 'name'
                        ? 'bg-red-600 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <i className="ri-mic-line w-5 h-5 flex items-center justify-center"></i>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.mobile}
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                  placeholder={t.mobilePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.password}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder={t.passwordPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.confirmPassword}
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder={t.confirmPasswordPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.address}
              </label>
              <div className="flex space-x-2">
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder={t.addressPlaceholder}
                  rows={3}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleVoiceInput('address')}
                  disabled={isListening && currentField === 'address'}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    isListening && currentField === 'address'
                      ? 'bg-red-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <i className="ri-mic-line w-5 h-5 flex items-center justify-center"></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg whitespace-nowrap"
            >
              {isLoading ? '...' : t.register}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/customer-login" className="text-blue-600 hover:text-blue-700 font-medium">
              {t.login}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
