
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const translations = {
    en: {
      title: 'Chotti Ecommerce',
      subtitle: 'Login for Rural Artisans',
      mobile: 'Mobile Number',
      password: 'Password',
      login: 'Login',
      register: 'Register New Account',
      forgotPassword: 'Forgot Password?',
      voiceHelp: 'Voice Help',
      language: 'Language',
      mobilePlaceholder: 'Enter your mobile number',
      passwordPlaceholder: 'Enter your password',
      loginSuccess: 'Login successful!',
      loginError: 'Invalid mobile number or password'
    },
    hi: {
      title: 'छोटी ई-कॉमर्स',
      subtitle: 'ग्रामीण कारीगरों के लिए लॉगिन',
      mobile: 'मोबाइल नंबर',
      password: 'पासवर्ड',
      login: 'लॉगिन',
      register: 'नया खाता बनाएं',
      forgotPassword: 'पासवर्ड भूल गए?',
      voiceHelp: 'आवाज़ से मदद',
      language: 'भाषा',
      mobilePlaceholder: 'अपना मोबाइल नंबर डालें',
      passwordPlaceholder: 'अपना पासवर्ड डालें',
      loginSuccess: 'लॉगिन सफल!',
      loginError: 'गलत मोबाइल नंबर या पासवर्ड'
    },
    ta: {
      title: 'சிறு வணிகம்',
      subtitle: 'கிராமப்புற கைவினைஞர்களுக்கான உள்நுழைவு',
      mobile: 'மொபைல் எண்',
      password: 'கடவுச்சொல்',
      login: 'உள்நுழைவு',
      register: 'புதிய கணக்கு உருவாக்கு',
      forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
      voiceHelp: 'குரல் உதவி',
      language: 'மொழி',
      mobilePlaceholder: 'உங்கள் மொபைல் எண்ணை உள்ளிடவும்',
      passwordPlaceholder: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
      loginSuccess: 'உள்நுழைவு வெற்றிகரம்!',
      loginError: 'தவறான மொபைல் எண் அல்லது கடவுச்சொல்'
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Basic validation
      if (mobile.length !== 10 || !/^[0-9]+$/.test(mobile)) {
        throw new Error(t.loginError);
      }
      
      if (password.length < 4) {
        throw new Error(t.loginError);
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        mobile,
        language,
        isLoggedIn: true
      }));

      router.push('/dashboard');
    } catch (err) {
      setError(t.loginError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceHelp = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        language === 'hi' ? 'अपना मोबाइल नंबर और पासवर्ड डालकर लॉगिन करें' :
        language === 'ta' ? 'உங்கள் மொபைல் எண் மற்றும் கடவுச்சொல்லை உள்ளிட்டு உள்நுழைக' :
        'Enter your mobile number and password to login'
      );
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-2" style={{ fontFamily: 'Pacifico' }}>
            {t.title}
          </h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.language}
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-8"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.mobile}
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder={t.mobilePlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.replace(/\D/g, '').slice(0, 8))}
                placeholder={t.passwordPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg whitespace-nowrap"
            >
              {isLoading ? '...' : t.login}
            </button>
          </form>

          <div className="mt-6 space-y-4">
            <button
              onClick={handleVoiceHelp}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i className="ri-mic-line w-5 h-5 flex items-center justify-center"></i>
              {t.voiceHelp}
            </button>

            <div className="text-center space-y-2">
              <Link href="/register" className="block text-orange-600 hover:text-orange-700 font-medium">
                {t.register}
              </Link>
              <Link href="/forgot-password" className="block text-gray-600 hover:text-gray-700">
                {t.forgotPassword}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
