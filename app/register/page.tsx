'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    language: 'en',
    location: '',
    craft: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const router = useRouter();

  const translations = {
    en: {
      title: 'Register New Account',
      subtitle: 'Join Chotti Ecommerce Community',
      name: 'Full Name',
      mobile: 'Mobile Number',
      password: 'Password (Numbers Only)',
      confirmPassword: 'Confirm Password',
      location: 'Location/Village',
      craft: 'Your Craft/Skill',
      language: 'Preferred Language',
      register: 'Register',
      login: 'Already have account? Login',
      voiceInput: 'Voice Input',
      listening: 'Listening...',
      startVoiceInput: 'Start Voice Input',
      namePlaceholder: 'Enter your full name',
      mobilePlaceholder: 'Enter 10-digit mobile number',
      passwordPlaceholder: 'Enter 4-8 digit password',
      confirmPasswordPlaceholder: 'Confirm your password',
      locationPlaceholder: 'Enter your village/city',
      craftPlaceholder: 'e.g., Pottery, Weaving, Handicrafts',
      registerSuccess: 'Registration successful!',
      passwordMismatch: 'Passwords do not match',
      invalidData: 'Please fill all fields correctly',
      handsFreeTip: 'Use voice input for hands-free registration! Only mobile and password need typing for security.'
    },
    hi: {
      title: 'नया खाता बनाएं',
      subtitle: 'छोटी ई-कॉमर्स समुदाय में शामिल हों',
      name: 'पूरा नाम',
      mobile: 'मोबाइल नंबर',
      password: 'पासवर्ड (केवल अंक)',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      location: 'स्थान/गाँव',
      craft: 'आपका शिल्प/कौशल',
      language: 'पसंदीदा भाषा',
      register: 'रजिस्टर करें',
      login: 'पहले से खाता है? लॉगिन करें',
      voiceInput: 'आवाज़ इनपुट',
      listening: 'सुन रहा है...',
      startVoiceInput: 'आवाज़ इनपुट शुरू करें',
      namePlaceholder: 'अपना पूरा नाम डालें',
      mobilePlaceholder: '10 अंकों का मोबाइल नंबर डालें',
      passwordPlaceholder: '4-8 अंकों का पासवर्ड डालें',
      confirmPasswordPlaceholder: 'अपने पासवर्ड की पुष्टि करें',
      locationPlaceholder: 'अपना गाँव/शहर डालें',
      craftPlaceholder: 'जैसे: मिट्टी का काम, बुनाई, हस्तशिल्प',
      registerSuccess: 'रजिस्ट्रेशन सफल!',
      passwordMismatch: 'पासवर्ड मेल नहीं खाते',
      invalidData: 'कृपया सभी फील्ड सही तरीके से भरें',
      handsFreeTip: 'हैंड्स-फ्री रजिस्ट्रेशन के लिए आवाज़ इनपुट का उपयोग करें! सुरक्षा के लिए केवल मोबाइल और पासवर्ड टाइप करना आवश्यक है।'
    },
    ta: {
      title: 'புதிய கணக்கு உருவாக்கு',
      subtitle: 'சிறு வணிக சமூகத்தில் சேருங்கள்',
      name: 'முழு பெயர்',
      mobile: 'மொபைல் எண்',
      password: 'கடவுச்சொல் (எண்கள் மட்டும்)',
      confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
      location: 'இடம்/கிராமம்',
      craft: 'உங்கள் கைவினை/திறமை',
      language: 'விருப்பமான மொழி',
      register: 'பதிவு செய்',
      login: 'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக',
      voiceInput: 'குரல் உள்ளீடு',
      listening: 'கேட்கிறது...',
      startVoiceInput: 'குரல் உள்ளீடு தொடங்கு',
      namePlaceholder: 'உங்கள் முழு பெயரை உள்ளிடவும்',
      mobilePlaceholder: '10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
      passwordPlaceholder: '4-8 இலக்க கடவுச்சொல்லை உள்ளிடவும்',
      confirmPasswordPlaceholder: 'உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்',
      locationPlaceholder: 'உங்கள் கிராமம்/நகரத்தை உள்ளிடவும்',
      craftPlaceholder: 'எ.கா: மண்பாண்டம், நெசவு, கைவினை',
      registerSuccess: 'பதிவு வெற்றிகரம்!',
      passwordMismatch: 'கடவுச்சொற்கள் பொருந்தவில்லை',
      invalidData: 'அனைத்து புலங்களையும் சரியாக நிரப்பவும்',
      handsFreeTip: 'கைகள் இல்லாமல் பதிவு செய்ய குரல் உள்ளீட்டைப் பயன்படுத்துங்கள்! பாதுகாப்பிற்காக மொபைல் மற்றும் கடவுச்சொல் மட்டுமே தட்டச்சு செய்ய வேண்டும்।'
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
        
        // Optional: Voice confirmation (commented out to prevent feedback loop)
        /*
        setTimeout(() => {
          if ('speechSynthesis' in window) {
            const confirmText = formData.language === 'hi' ? 
              `आपने कहा: ${transcript}` :
              formData.language === 'ta' ? 
              `நீங்கள் சொன்னது: ${transcript}` :
              `You said: ${transcript}`;
            
            const utterance = new SpeechSynthesisUtterance(confirmText);
            utterance.lang = formData.language === 'hi' ? 'hi-IN' : formData.language === 'ta' ? 'ta-IN' : 'en-US';
            speechSynthesis.speak(utterance);
          }
        }, 2000);
        */
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

      if (formData.password.length < 4 || formData.password.length > 8) {
        throw new Error(t.invalidData);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store user data
      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        mobile: formData.mobile,
        language: formData.language,
        location: formData.location,
        craft: formData.craft,
        isLoggedIn: true
      }));

      // Voice confirmation
      if ('speechSynthesis' in window) {
        const successText = formData.language === 'hi' ? 
          'रजिस्ट्रेशन सफल! आपका खाता बन गया है।' :
          formData.language === 'ta' ? 
          'பதிவு வெற்றி! உங்கள் கணக்கு உருவாக்கப்பட்டுள்ளது.' :
          'Registration successful! Your account has been created.';
        
        const utterance = new SpeechSynthesisUtterance(successText);
        utterance.lang = formData.language === 'hi' ? 'hi-IN' : formData.language === 'ta' ? 'ta-IN' : 'en-US';
        speechSynthesis.speak(utterance);
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-2" style={{ fontFamily: 'Pacifico' }}>
            {t.title}
          </h1>
          <p className="text-gray-600 text-lg mb-4">{t.subtitle}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <i className="ri-mic-line text-blue-600 w-5 h-5 flex items-center justify-center"></i>
              <p className="text-blue-700 font-medium">Hands-Free Registration</p>
            </div>
            <p className="text-blue-600 text-sm">{t.handsFreeTip}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.language}
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-8"
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
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">🔒 Type for security</p>
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
                  onChange={(e) => setFormData({...formData, password: e.target.value.replace(/\D/g, '').slice(0, 8)})}
                  placeholder={t.passwordPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">🔒 Type for security</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.confirmPassword}
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value.replace(/\D/g, '').slice(0, 8)})}
                  placeholder={t.confirmPasswordPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">🔒 Type for security</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.location}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder={t.locationPlaceholder}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleVoiceInput('location')}
                    disabled={isListening && currentField === 'location'}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      isListening && currentField === 'location'
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
                  {t.craft}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.craft}
                    onChange={(e) => setFormData({...formData, craft: e.target.value})}
                    placeholder={t.craftPlaceholder}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleVoiceInput('craft')}
                    disabled={isListening && currentField === 'craft'}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      isListening && currentField === 'craft'
                        ? 'bg-red-600 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <i className="ri-mic-line w-5 h-5 flex items-center justify-center"></i>
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            {isListening && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2">
                  <i className="ri-mic-line text-blue-600 w-5 h-5 flex items-center justify-center animate-pulse"></i>
                  <p className="text-blue-700 font-medium">
                    {t.listening} - {currentField}
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap"
            >
              {isLoading ? '...' : t.register}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
              {t.login}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
